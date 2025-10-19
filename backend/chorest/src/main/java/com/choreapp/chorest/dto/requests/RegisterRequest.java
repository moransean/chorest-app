package com.choreapp.chorest.dto.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank
    private String username;
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    @Email(message = "Must be a valid email")
    private String email;
}
