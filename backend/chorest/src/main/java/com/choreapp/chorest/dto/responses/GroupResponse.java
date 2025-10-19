package com.choreapp.chorest.dto.responses;

import com.choreapp.chorest.models.Group;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter @Setter
public class GroupResponse {
    private Long id;
    private String name;
    private LocalDateTime createdAt;
    private Set<UserResponse> members;
    private List<TaskResponse> tasks;

    public static GroupResponse fromGroup(Group group) {
        GroupResponse response = new GroupResponse();
        response.setId(group.getId());
        response.setName(group.getName());
        response.setCreatedAt(group.getCreatedAt());
        response.setMembers(group.getMembers().stream()
                .map(UserResponse::fromUser)
                .collect(Collectors.toSet()));
        response.setTasks(group.getTasks().stream()
                .map(TaskResponse::fromTask)
                .collect(Collectors.toList()));
        return response;
    }
}
