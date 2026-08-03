package com.choreapp.chorest.config;

import com.choreapp.chorest.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.core.Ordered;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF (only do this for testing)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/health", "/error").permitAll() // Allow health check endpoint
                        .requestMatchers(HttpMethod.POST, "/api/auth/register", "/api/auth/login").permitAll() // Allow auth endpoints
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow preflight
                        .anyRequest().authenticated() // Require authentication for everything else
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless because we're using JWT
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Apply CORS configuration
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration frontendCors = new CorsConfiguration();
        frontendCors.setAllowedOriginPatterns(List.of(
            "https://chorest.shop",
            "https://www.chorest.shop",
            "https://api.chorest.shop"
        )); 
        frontendCors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        frontendCors.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cookie")); 
        frontendCors.setAllowCredentials(true); 
        frontendCors.setExposedHeaders(List.of("Set-Cookie")); 

        CorsConfiguration healthCors = new CorsConfiguration();
        healthCors.setAllowedOriginPatterns(List.of("*"));
        healthCors.setAllowedMethods(List.of("GET", "OPTIONS"));
        healthCors.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/health", healthCors); // health check path
        source.registerCorsConfiguration("/**", frontendCors); // all other API paths

        return source;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(corsConfigurationSource()));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    
}


