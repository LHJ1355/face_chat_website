package com.example.server.server;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        if(token == null){
            return true;
        }
        if(!jwtTokenProvider.validateToken(token)){
            return true;
            //throw new IllegalArgumentException("유효하지 않은 토큰");
        }
        String email = jwtTokenProvider.getSubject(token);
        request.setAttribute("email", email);
        return true;
    }
}
