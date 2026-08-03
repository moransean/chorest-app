package com.choreapp.chorest.repositories;

import com.choreapp.chorest.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByGroupIdOrderByDueDateAsc(Long groupId);
    List<Task> findByAssigneeIdOrderByDueDateAsc(Long userId);
    List<Task> findByGroupIdAndStatus(Long groupId, Task.TaskStatus status);
    Task getTaskById(Long taskId);
}
