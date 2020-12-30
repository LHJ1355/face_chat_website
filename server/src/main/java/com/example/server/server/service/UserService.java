package com.example.server.server.service;

import com.example.server.server.JwtTokenProvider;
import com.example.server.server.VO.LoginVO;
import com.example.server.server.VO.SignupVO;
import com.example.server.server.domain.User;
import com.example.server.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public SuccessDto save(SignupVO vo){
        if (userRepository.findByEmail(vo.getEmail()) != null){
            return new SuccessDto(false, "이미 존재하는 email 입니다.");
        }
        User user = new User(vo.getEmail(), vo.getPassword(),
                vo.getName(), vo.getImage());
        userRepository.save(user);
        return new SuccessDto(true, "회원가입에 성공하셨습니다.");
    }

    public LoginDto login(LoginVO vo){
        User user = userRepository.findByEmailAndPassword(vo.getEmail(), vo.getPassword());
        if(user != null){
            return new LoginDto(true, jwtTokenProvider.createToken(user.getEmail()));
        }
        return new LoginDto();
    }
}
