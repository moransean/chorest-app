package com.choreapp.chorest.dto.mappers;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter @Setter
public class TaskDTO {
    private String title;
    private String description;
    private Integer pointValue;
    private LocalDateTime dueDate;

    public void setGroupId(Long groupId) {
    }
}