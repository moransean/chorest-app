package com.choreapp.chorest.controllers;

import com.choreapp.chorest.dto.requests.LoginRequest;
import com.choreapp.chorest.dto.requests.RegisterRequest;
import com.choreapp.chorest.dto.responses.UserResponse;
import com.choreapp.chorest.models.User;
import com.choreapp.chorest.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authService.register(request, response));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(request, response));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        User user = authService.getUserByUsername(authentication.getName());
        return ResponseEntity.ok(UserResponse.fromUser(user));
    }
}
