package com.choreapp.chorest.services;

import com.choreapp.chorest.dto.mappers.UserDTO;
import com.choreapp.chorest.exceptions.EmailAlreadyExistsException;
import com.choreapp.chorest.exceptions.UserNotFoundException;
import com.choreapp.chorest.models.User;
import com.choreapp.chorest.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.*;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}