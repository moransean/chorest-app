package com.choreapp.chorest.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "groups")
@Getter @Setter
@NoArgsConstructor
public class Group extends BaseEntity {
    @Column(nullable = false)
    private String name;
    private String description;

    @ManyToMany(mappedBy = "groups")
    private Set<User> members = new HashSet<>();

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

    /* add a scoreboard */

    // Helper methods for managing members
    public void addMember(User user) {
        members.add(user);
        user.getGroups().add(this);
    }

    public void removeMember(User user) {
        members.remove(user);
        user.getGroups().remove(this);
    }
}