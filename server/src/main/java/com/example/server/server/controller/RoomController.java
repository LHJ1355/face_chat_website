package com.example.server.server.controller;

import com.example.server.server.VO.CreateRoomVO;
import com.example.server.server.service.RoomInfoDto;
import com.example.server.server.service.RoomService;
import com.example.server.server.service.SuccessDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/all_rooms")
    public List<RoomInfoDto> findAll(){
        return roomService.findAll();
    }

    @PostMapping("/create_room")
    public SuccessDto createRoom(@RequestBody CreateRoomVO vo){
        return roomService.save(vo);
    }
}
