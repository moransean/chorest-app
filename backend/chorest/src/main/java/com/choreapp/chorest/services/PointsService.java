package com.choreapp.chorest.services;

import com.choreapp.chorest.dto.mappers.TaskDTO;
import com.choreapp.chorest.exceptions.GroupNotFoundException;
import com.choreapp.chorest.exceptions.UserNotFoundException;
import com.choreapp.chorest.models.*;
import com.choreapp.chorest.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import lombok.*;
import java.time.temporal.WeekFields;
import java.util.Locale;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PointsService {
    private final PointsRepository pointsRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    public Points awardPoints(Long userId, Long groupId, Integer pointValue) {
        Points points = pointsRepository.findByUserIdAndGroupId(userId, groupId)
                .orElseGet(() -> createNewPoints(userId, groupId));

        points.setTotalPoints(points.getTotalPoints() + pointValue);
        points.setWeeklyPoints(points.getWeeklyPoints() + pointValue);
        points.setMonthlyPoints(points.getMonthlyPoints() + pointValue);

        return pointsRepository.save(points);
    }

    private Points createNewPoints(Long userId, Long groupId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException("Group not found"));

        Points points = new Points();
        points.setUser(user);
        points.setGroup(group);
        points.setTotalPoints(0);
        points.setWeeklyPoints(0);
        points.setMonthlyPoints(0);
        points.setMonthlyReset(LocalDateTime.now());
        points.setWeeklyReset(LocalDateTime.now());
        return points;
    }

    public List<Points> getGroupLeaderboard(Long groupId) {
        List<Points> pointList = pointsRepository.findByGroupId(groupId);
        LocalDateTime today = LocalDateTime.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        for (Points points : pointList) {
            LocalDateTime lastMonthlyReset = points.getMonthlyReset();
            if (today.getMonth() != lastMonthlyReset.getMonth() || today.getYear() != lastMonthlyReset.getYear()) {
                points.setMonthlyPoints(0);
                points.setMonthlyReset(today.withDayOfMonth(1));
            }
            LocalDateTime lastWeeklyReset = points.getWeeklyReset();
            int currentWeek = today.get(weekFields.weekOfWeekBasedYear());
            int lastWeek = lastWeeklyReset.get(weekFields.weekOfWeekBasedYear());
            if (currentWeek != lastWeek || today.getYear() != lastWeeklyReset.getYear()) {
                points.setWeeklyPoints(0);
                points.setWeeklyReset(today);
            }
        }
        return pointList;
    }
}