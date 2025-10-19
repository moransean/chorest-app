package com.choreapp.chorest.controllers;

import com.choreapp.chorest.dto.requests.UserRequest;
import com.choreapp.chorest.dto.responses.UserResponse;
import com.choreapp.chorest.models.Group;
import com.choreapp.chorest.models.User;
import com.choreapp.chorest.services.UserService;
import jakarta.validation.*;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        return ResponseEntity.ok(UserResponse.fromUser(user));
    }
}
