package com.example.dogcatserver.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class UseMemberResponseDto {
    private String username;
    private String email;
    private String status;
    private boolean isLocked;
    // 인증코드 등 민감정보는 포함하지 않음
}
