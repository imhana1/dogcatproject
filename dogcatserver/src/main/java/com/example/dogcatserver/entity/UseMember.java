package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UseMember {
    private String username;
    private String password;
    private Role role;
    @Builder.Default
    private String status = "일반";
    private String eCode;

    private String email;
    @Builder.Default
    // 경고 횟수
    private int count=0;
    @Builder.Default
    @JsonFormat(pattern = "yyyy년 MM월 dd일 HH시 mm분")
    private LocalDateTime signDt = LocalDateTime.now();
    @Builder.Default
    private boolean isLocked=false;
}
