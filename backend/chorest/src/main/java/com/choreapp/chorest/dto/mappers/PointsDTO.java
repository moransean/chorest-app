package com.choreapp.chorest.dto.mappers;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PointsDTO {
    private Long userId;
    private Long groupId;
    private Integer points;
}
