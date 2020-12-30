package com.example.server.server.service;

import lombok.Getter;

@Getter
public class SuccessDto {
    private boolean success = false;
    private String message;

    public SuccessDto(){}
    public SuccessDto(boolean success, String message){
        this.success = success;
        this.message = message;
    }
}
