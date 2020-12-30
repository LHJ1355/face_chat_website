package com.example.server.server.domain;

import javax.persistence.*;

@Entity
public class UserRoom {
    @Id @GeneratedValue
    @Column(name = "user_room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;
}
