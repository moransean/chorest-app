package com.choreapp.chorest.repositories;

import com.choreapp.chorest.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findByMembers_Id(Long userId);
    Optional<Group> findByIdAndMembers_Id(Long groupId, Long userId);

}