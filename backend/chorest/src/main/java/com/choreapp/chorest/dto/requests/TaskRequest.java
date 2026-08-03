package com.choreapp.chorest.dto.requests;

import com.choreapp.chorest.dto.mappers.TaskDTO;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Getter @Setter
public class TaskRequest {
    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    @NotNull(message = "Point value is required")
    @Min(value = 0, message = "Point value must be positive")
    private Integer pointValue;

    @NotNull(message = "Group ID is required")
    private Long groupId; // Add this field

    private LocalDateTime dueDate;

    public TaskDTO toDTO() {
        TaskDTO dto = new TaskDTO();
        dto.setTitle(title);
        dto.setDescription(description);
        dto.setPointValue(pointValue);
        dto.setGroupId(groupId);
        dto.setDueDate(dueDate);
        return dto;
    }
}
