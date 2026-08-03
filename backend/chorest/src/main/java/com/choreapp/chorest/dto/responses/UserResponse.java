package com.choreapp.chorest.dto.responses;

import com.choreapp.chorest.models.Group;
import com.choreapp.chorest.models.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<Long> groupIds;

    public static com.choreapp.chorest.dto.responses.UserResponse fromUser(User user) {
        com.choreapp.chorest.dto.responses.UserResponse response = new com.choreapp.chorest.dto.responses.UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setGroupIds(user.getGroups().stream()
                .map(Group::getId)
                .collect(Collectors.toSet()));
        return response;
    }
}

