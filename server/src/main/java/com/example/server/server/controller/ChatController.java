package com.example.server.server.controller;

import com.example.server.server.VO.ChatVO;
import com.example.server.server.VO.FaceChatVO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @MessageMapping("/chat/{room_id}")
    @SendTo("/sub/chat/{room_id}")
    public ChatVO chat(ChatVO vo){
        return vo;
    }

    @MessageMapping("/face_chat/{room_id}")
    @SendTo("/sub/face_chat/{room_id}")
    public FaceChatVO faceChat(FaceChatVO vo){
        return vo;
    }
}
