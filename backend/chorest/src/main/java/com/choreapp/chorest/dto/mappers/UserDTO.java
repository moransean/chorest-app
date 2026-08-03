package com.choreapp.chorest.dto.mappers;

import com.choreapp.chorest.models.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Getter @Setter
public class UserDTO {
    private String username;
    private String email;
    private String password;
}
