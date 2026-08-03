package com.choreapp.chorest.services;

import com.choreapp.chorest.dto.mappers.TaskDTO;
import com.choreapp.chorest.exceptions.GroupNotFoundException;
import com.choreapp.chorest.exceptions.InvalidTaskStateException;
import com.choreapp.chorest.exceptions.TaskNotFoundException;
import com.choreapp.chorest.models.*;
import com.choreapp.chorest.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final GroupRepository groupRepository;
    private final PointsService pointsService;
    private final AuthService authService;
    public Task createTask(TaskDTO taskDTO, Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException("Group not found"));

        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setPointValue(taskDTO.getPointValue());
        task.setDueDate(taskDTO.getDueDate());
        task.setCreatedAt(LocalDateTime.now());
        task.setGroup(group);
        task.setStatus(Task.TaskStatus.INCOMPLETED);

        return taskRepository.save(task);
    }

    public Task completeTask(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        if (task.getStatus() == Task.TaskStatus.COMPLETED) {
            throw new InvalidTaskStateException("Task already completed");
        }

        task.setStatus(Task.TaskStatus.COMPLETED);
        task.setCompletedAt(LocalDateTime.now());
        task.setAssignee(authService.getUserById(userId));

        // Award points to the user
        pointsService.awardPoints(userId, task.getGroup().getId(), task.getPointValue());

        return taskRepository.save(task);
    }

    public List<Task> getGroupTasks(Long groupId) {
        return taskRepository.findByGroupIdOrderByDueDateAsc(groupId);
    }

    public List<Task> getAssigneeTasks(Long userId) {
        return taskRepository.findByAssigneeIdOrderByDueDateAsc(userId);
    }

    public Task getTask(Long taskId) {
        return taskRepository.getTaskById(taskId);
    }
}
