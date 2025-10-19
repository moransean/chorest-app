package com.choreapp.chorest.services;

import com.choreapp.chorest.dto.requests.LoginRequest;
import com.choreapp.chorest.dto.requests.RegisterRequest;
import com.choreapp.chorest.dto.responses.UserResponse;
import com.choreapp.chorest.exceptions.UserNotFoundException;
import com.choreapp.chorest.models.User;
import com.choreapp.chorest.repositories.UserRepository;
import com.choreapp.chorest.security.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public UserResponse register(RegisterRequest request, HttpServletResponse response) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());

        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtService.generateToken(userDetails);

        // Store token in an HTTP-only, Secure cookie
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)      // Prevent access from JavaScript (XSS protection)
                .secure(true)        // Send only over HTTPS
                .path("/")           // Available on all routes
                .maxAge(Duration.ofDays(7))  // Set expiration
                .sameSite("Strict")  // Prevent CSRF attacks
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        System.out.println("Generated token: " + token);  // Add this line
        return UserResponse.fromUser(user);
    }

    public UserResponse login(LoginRequest request, HttpServletResponse response) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtService.generateToken(userDetails);

        // Store token in an HTTP-only, Secure cookie
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)      // Prevent access from JavaScript (XSS protection)
                .secure(true)        // Send only over HTTPS
                .path("/")           // Available on all routes
                .maxAge(Duration.ofDays(7))  // Set expiration
                .sameSite("Strict")  // Prevent CSRF attacks
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return UserResponse.fromUser(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
