package com.example.server.server.controller;

import com.example.server.server.VO.LoginVO;
import com.example.server.server.VO.SignupVO;
import com.example.server.server.service.LoginDto;
import com.example.server.server.service.SuccessDto;
import com.example.server.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public SuccessDto signup(@RequestBody SignupVO vo){
        return userService.save(vo);
    }

    @PostMapping("/login")
    public LoginDto login(@RequestBody LoginVO vo){
        return userService.login(vo);
    }
}

