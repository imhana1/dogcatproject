package com.example.dogcatserver.controller;

import org.springframework.context.event.*;
import org.springframework.stereotype.*;
import org.springframework.web.socket.messaging.*;

// 웹소켓 연결, 연결 헤제에 대한 스프링 이벤트 핸들러 등록
@Component
public class WebsoketEventListener {
    @EventListener
    public  void connect(SessionConnectedEvent e){
            System.out.println("WebSocket 연결 :" + e.getMessage());
    }
    @EventListener
    public void disconnect(SessionDisconnectEvent e){
        System.out.println("WebSocket 연결 종료 :" + e.getMessage());
    }
}
