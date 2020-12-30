package com.example.server.server.service;

import com.example.server.server.VO.CreateRoomVO;
import com.example.server.server.domain.Room;
import com.example.server.server.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<RoomInfoDto> findAll(){
        List<Room> rooms = roomRepository.findAll();
        List<RoomInfoDto> dtos = new ArrayList<>();
        for(Room room : rooms){
            dtos.add(new RoomInfoDto(room.getId(), room.getName()));
        }
        return dtos;
    }

    public SuccessDto save(CreateRoomVO vo){
        Room room = new Room(vo.getName());
        roomRepository.save(room);
        return new SuccessDto(true, vo.getName() + "이 만들어졌습니다.");
    }
}
