package com.choreapp.chorest.services;

import com.choreapp.chorest.dto.mappers.GroupDTO;
import com.choreapp.chorest.exceptions.GroupNotFoundException;
import com.choreapp.chorest.exceptions.UserNotFoundException;
import com.choreapp.chorest.models.Group;
import com.choreapp.chorest.models.User;
import com.choreapp.chorest.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import lombok.*;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    public Group createGroup(GroupDTO groupDTO, Long creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new UserNotFoundException("Creator not found"));

        Group group = new Group();
        group.setName(groupDTO.getName());
        group.setDescription(groupDTO.getDescription());
        group.addMember(creator);

        return groupRepository.save(group);
    }

    public Group addMemberToGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException("Group not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        group.addMember(user);
        return groupRepository.save(group);
    }

    public List<Group> getUserGroups(Long userId) {
        return groupRepository.findByMembers_Id(userId);
    }
}
