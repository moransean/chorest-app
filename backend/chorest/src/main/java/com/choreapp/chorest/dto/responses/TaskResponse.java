package com.choreapp.chorest.dto.responses;

import com.choreapp.chorest.models.Task;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter @Setter
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private Integer pointValue;
    private Task.TaskStatus status;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private Long groupId;
    private UserResponse assignee;

    public static TaskResponse fromTask(Task task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setPointValue(task.getPointValue());
        response.setStatus(task.getStatus());
        response.setDueDate(task.getDueDate());
        response.setCompletedAt(task.getCompletedAt());
        response.setGroupId(task.getGroup().getId());
        if (task.getAssignee() != null) {
            response.setAssignee(UserResponse.fromUser(task.getAssignee()));
        }
        return response;
    }
}
