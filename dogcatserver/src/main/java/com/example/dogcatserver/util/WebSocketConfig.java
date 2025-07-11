package com.example.dogcatserver.util;

// STOMP 웹소켓 설정

import org.springframework.context.annotation.*;
import org.springframework.messaging.simp.config.*;
import org.springframework.web.socket.config.annotation.*;

@Configuration
// STOMP 기반 (텍스트 메시징 전용) 웹소켓 설정
@EnableWebSocketMessageBroker
public class WebSocketConfig implements  WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 웹소켓 접속 주소 예) /login
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();

    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 웹소켓 서비스 주소. 예) /post/** , /meber/**
        // 클라이언트가 메시지를 구독하는 주소 /sub로 시작한다

        registry.enableSimpleBroker("/sub");

        // 클라이언트는 메시지를 보내려면 /pub/**로 발행한다
        registry.setApplicationDestinationPrefixes("/pub");
        // A와 B가 채팅을 한다면
        // 각자 채팅 메시지를 서버로 보내야한다(발행) : /pub/
        // 서버가 보내주는 채팅 메시지를 수신해야 한다(구독): /sub/
    }
}
