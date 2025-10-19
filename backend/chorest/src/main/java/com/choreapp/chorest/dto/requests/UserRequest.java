package com.choreapp.chorest.dto.requests;

import com.choreapp.chorest.dto.mappers.UserDTO;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    public UserDTO toDTO() {
        UserDTO dto = new UserDTO();
        dto.setUsername(username);
        dto.setEmail(email);
        dto.setPassword(password);
        return dto;
    }
}
