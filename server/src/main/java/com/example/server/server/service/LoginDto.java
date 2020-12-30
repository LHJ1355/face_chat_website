package com.example.server.server.service;

import lombok.Getter;

@Getter
public class LoginDto {
    private boolean success = false;
    private String token;

    public LoginDto(){}
    public LoginDto(boolean success, String token){
        this.success = success;
        this.token = token;
    }
}
