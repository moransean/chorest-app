package com.choreapp.chorest.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "points")
@Getter @Setter
@NoArgsConstructor
public class Points extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    private Integer totalPoints = 0;
    private Integer weeklyPoints = 0;
    private Integer monthlyPoints = 0;
    private LocalDateTime monthlyReset;
    private LocalDateTime weeklyReset;


}
