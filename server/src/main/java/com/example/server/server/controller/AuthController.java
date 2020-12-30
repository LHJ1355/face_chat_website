package com.example.server.server.controller;

import com.example.server.server.domain.User;
import com.example.server.server.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;

    @GetMapping("/auth")
    public UserInfoDto auth(HttpServletRequest request){
        String email = (String)request.getAttribute("email");
        if(email != null){
            User user = userRepository.findByEmail(email);

            if(user != null){
                return new UserInfoDto(true, user.getId(), user.getName(), user.getImage());
            }
        }
        return new UserInfoDto();
    }

    @Getter
    private class UserInfoDto{
        private Long id;
        private String name;
        private String image;
        private boolean isAuth = false;

        public UserInfoDto(){}

        public UserInfoDto(boolean isAuth, Long id, String name, String image){
            this.id = id;
            this.isAuth = isAuth;
            this.name = name;
            this.image = image;
        }
    }
}
