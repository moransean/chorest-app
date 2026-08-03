package com.choreapp.chorest.dto.responses;

import com.choreapp.chorest.models.Points;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PointsResponse {
    private Long id;
    private Long userId;
    private String username;
    private Long groupId;
    private Integer totalPoints;
    private Integer weeklyPoints;
    private Integer monthlyPoints;

    public static PointsResponse fromPoints(Points points) {
        PointsResponse response = new PointsResponse();
        response.setId(points.getId());
        response.setUserId(points.getUser().getId());
        response.setUsername(points.getUser().getUsername());
        response.setGroupId(points.getGroup().getId());
        response.setTotalPoints(points.getTotalPoints());
        response.setWeeklyPoints(points.getWeeklyPoints());
        response.setMonthlyPoints(points.getMonthlyPoints());
        return response;
    }
}
