package com.choreapp.chorest.repositories;

import com.choreapp.chorest.models.Points;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PointsRepository extends JpaRepository<Points, Long> {
    Optional<Points> findByUserIdAndGroupId(Long userId, Long groupId);

    List<Points> findByGroupId(Long groupId);
    @Modifying
    @Query("UPDATE Points p SET p.weeklyPoints = 0")
    void resetWeeklyPoints();

    @Modifying
    @Query("UPDATE Points p SET p.monthlyPoints = 0")
    void resetMonthlyPoints();
}
