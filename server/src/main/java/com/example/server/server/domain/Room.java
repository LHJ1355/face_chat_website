package com.example.server.server.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Room {
    @Id @GeneratedValue
    @Column(name = "room_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "room")
    private List<UserRoom> userRooms = new ArrayList<>();

    protected Room(){}
    public Room(String name){
        this.name = name;
    }
}
