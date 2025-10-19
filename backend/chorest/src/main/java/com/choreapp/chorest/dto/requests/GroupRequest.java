package com.choreapp.chorest.dto.requests;

import com.choreapp.chorest.dto.mappers.GroupDTO;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter @Setter
public class GroupRequest {
    @NotBlank(message = "Group name is required")
    private String name;

    private String description;

    public GroupDTO toDTO() {
        GroupDTO dto = new GroupDTO();
        dto.setName(name);
        dto.setDescription(description);
        return dto;
    }
}
