package com.choreapp.chorest.dto.requests;

import com.choreapp.chorest.dto.mappers.PointsDTO;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter @Setter
public class PointsRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Group ID is required")
    private Long groupId;

    @NotNull(message = "Points value is required")
    @Min(value = 0, message = "Points must be positive")
    private Integer points;

    public PointsDTO toDTO() {
        PointsDTO dto = new PointsDTO();
        dto.setUserId(userId);
        dto.setGroupId(groupId);
        dto.setPoints(points);
        return dto;
    }
}