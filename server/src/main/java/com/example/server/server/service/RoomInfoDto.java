package com.example.server.server.service;

import lombok.Getter;

@Getter
public class RoomInfoDto {
    private Long id;
    private String name;

    public RoomInfoDto(){};
    public RoomInfoDto(Long id, String name){
        this.id = id;
        this.name = name;
    }
}
