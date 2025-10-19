package com.choreapp.chorest.controllers;

import com.choreapp.chorest.dto.requests.TaskRequest;
import com.choreapp.chorest.dto.responses.TaskResponse;
import com.choreapp.chorest.models.Task;
import com.choreapp.chorest.models.User;
import com.choreapp.chorest.security.UserPrincipal;
import com.choreapp.chorest.services.TaskService;
import jakarta.validation.*;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody @Valid TaskRequest request) {   
        Task task = taskService.createTask(request.toDTO(), request.getGroupId());
        return ResponseEntity.ok(TaskResponse.fromTask(task));
    }


    @PostMapping("/{taskId}/complete")
    public ResponseEntity<TaskResponse> completeTask(
            @PathVariable Long taskId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Task task = taskService.completeTask(taskId, (userPrincipal.getId()));
        return ResponseEntity.ok(TaskResponse.fromTask(task));
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<TaskResponse>> getGroupTasks(@PathVariable Long groupId) {
        List<Task> tasks = taskService.getGroupTasks(groupId);
        return ResponseEntity.ok(tasks.stream()
                .map(TaskResponse::fromTask)
                .collect(Collectors.toList()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskResponse>> getUserTasks(@PathVariable Long assigneeId) {
        List<Task> tasks = taskService.getAssigneeTasks(assigneeId);
        return ResponseEntity.ok(tasks.stream()
                .map(TaskResponse::fromTask)
                .collect(Collectors.toList()));
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponse> getTask(@PathVariable Long taskId) {
        Task task = taskService.getTask(taskId);
        return ResponseEntity.ok(TaskResponse.fromTask(task));
    }

    //updateTask
    //deleteTask
    //assignTask

}
