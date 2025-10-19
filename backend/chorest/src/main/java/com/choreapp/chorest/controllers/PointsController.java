package com.choreapp.chorest.controllers;

import com.choreapp.chorest.dto.requests.PointsRequest;
import com.choreapp.chorest.dto.responses.PointsResponse;
import com.choreapp.chorest.models.Points;
import com.choreapp.chorest.services.PointsService;
import jakarta.validation.*;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/points")
@RequiredArgsConstructor
public class PointsController {
    private final PointsService pointsService;
    @GetMapping("/leaderboard/{groupId}")
    public ResponseEntity<List<PointsResponse>> getGroupLeaderboard(
            @PathVariable Long groupId) {
        List<Points> points = pointsService.getGroupLeaderboard(groupId);
        return ResponseEntity.ok(points.stream()
                .map(PointsResponse::fromPoints)
                .collect(Collectors.toList()));
    }
}
