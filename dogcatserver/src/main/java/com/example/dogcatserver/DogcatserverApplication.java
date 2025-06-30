package com.example.dogcatserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.*;

@SpringBootApplication
@EnableScheduling
public class DogcatserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(DogcatserverApplication.class, args);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
//    @Bean  // 평문 비밀번호 db에 저장하고 확인하는 용도
//    public PasswordEncoder passwordEncoder() {
//        return NoOpPasswordEncoder.getInstance();  
//    }
}
