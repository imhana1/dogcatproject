package com.example.dogcatserver.controller;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import java.security.*;
import java.time.*;
import java.time.format.*;

@Controller
public class WsController {
    // HTTP 컨트롤러는 클라이언트 -> 서버 주소만 지정, 컨트롤러 마지막에 응답
    @Autowired
    private SimpMessagingTemplate tpl;


    // 글을 작성하면 작성되었다고 웹소켓 메시지를 보내자
//    @PreAuthorize("isAuthenticated()")
    @PostMapping("/api/message")
    public ResponseEntity<Void> job3(String receiver, String message) {
        String sender = "haha";
        if(sender.equals(receiver))
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        //receiver에게만 웹소켓 메시지를 전송
        // /sub/job3를 수신 주소로 특정 사영자에게 메시지를 보낸다 -> /user/sub/job3
        tpl.convertAndSendToUser(receiver,"/sub/job3", sender+"메시지");
        return ResponseEntity.ok(null);
    }



}
