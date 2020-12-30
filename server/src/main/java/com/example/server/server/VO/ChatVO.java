package com.example.server.server.VO;

import lombok.Getter;

@Getter
public class ChatVO {
    private Long user_id;
    private String user_name;
    private String message;
    private MsgType msg_type;

    private enum MsgType{
        Enter, Exit, Message
    }
}
