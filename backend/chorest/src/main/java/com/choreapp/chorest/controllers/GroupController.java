package com.choreapp.chorest.controllers;

import com.choreapp.chorest.dto.requests.GroupRequest;
import com.choreapp.chorest.dto.responses.GroupResponse;
import com.choreapp.chorest.dto.responses.TaskResponse;
import com.choreapp.chorest.models.Group;
import com.choreapp.chorest.models.User;
import com.choreapp.chorest.repositories.UserRepository;
import com.choreapp.chorest.services.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.choreapp.chorest.security.UserPrincipal;
import com.choreapp.chorest.services.AuthService;

import java.util.List;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping("/api/v1/groups")
//@RequiredArgsConstructor
//public class GroupController {
//    private final GroupService groupService;
//    @PostMapping
//    public ResponseEntity<GroupResponse> createGroup(
//            @RequestBody @Valid GroupRequest request,
//            @AuthenticationPrincipal UserDetails userDetails) {
//        Group group = groupService.createGroup(request.toDTO(),
//                ((User) userDetails).getId());
//        return ResponseEntity.ok(GroupResponse.fromGroup(group));
//    }
//
//    @PostMapping("/{groupId}/members/{userId}")
//    public ResponseEntity<GroupResponse> addMember(
//            @PathVariable Long groupId,
//            @PathVariable Long userId) {
//        Group group = groupService.addMemberToGroup(groupId, userId);
//        return ResponseEntity.ok(GroupResponse.fromGroup(group));
//    }
//
//    @GetMapping("/user")
//    public ResponseEntity<List<GroupResponse>> getUserGroups(
//            @AuthenticationPrincipal UserDetails userDetails) {
//        List<Group> groups = groupService.getUserGroups(((User) userDetails).getId());
//        return ResponseEntity.ok(groups.stream()
//                .map(GroupResponse::fromGroup)
//                .collect(Collectors.toList()));
//    }
//}

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;
    private final AuthService authService;

    @PostMapping("")
    public ResponseEntity<GroupResponse> createGroup(
            @RequestBody @Valid GroupRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Group group = groupService.createGroup(request.toDTO(), userPrincipal.getId());
        return ResponseEntity.ok(GroupResponse.fromGroup(group));
    }

    @GetMapping("/user")
    public ResponseEntity<List<GroupResponse>> getUserGroups(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Group> groups = groupService.getUserGroups(userPrincipal.getId());
        return ResponseEntity.ok(groups.stream()
                .map(GroupResponse::fromGroup)
                .collect(Collectors.toList()));
    }

    @PostMapping("/{groupId}/members/{username}")
    public ResponseEntity<GroupResponse> addMember(
            @PathVariable Long groupId,
            @PathVariable String username) {
        System.out.println("addMemberCalled");
        Long userId = authService.getUserByUsername(username).getId();
        Group group = groupService.addMemberToGroup(groupId, userId);
        System.out.println("group retrieved");
        return ResponseEntity.ok(GroupResponse.fromGroup(group));
    }

    //getMembers
    //updateGroup
    //deleteGroup
    //removeMember
}