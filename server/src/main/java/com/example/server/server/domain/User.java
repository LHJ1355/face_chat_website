package com.example.server.server.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class User {
    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    private String email;
    private String password;
    private String name;
    private String image;
    private String token;
    private Long tokenExp;

    @OneToMany(mappedBy = "user")
    private List<UserRoom> userRooms = new ArrayList<>();

    protected User(){};

    public User(String email, String password, String name, String image){
        this.email = email;
        this.password = password;
        this.name = name;
        this.image = image;
    }
}
