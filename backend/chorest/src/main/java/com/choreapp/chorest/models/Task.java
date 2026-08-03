package com.choreapp.chorest.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter @Setter
@NoArgsConstructor
public class Task extends BaseEntity {
    @Column(nullable = false)
    private String title;
    private String description;

    @Column(nullable = false)
    private Integer pointValue;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private LocalDateTime dueDate;

    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    public enum TaskStatus {
        PENDING,
        INCOMPLETED,
        COMPLETED;
    }
}
