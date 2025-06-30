package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.Status;
import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@Builder
public class UseMemberResponseDto {
    private String username;
    private String email;
    private Status status;
    private boolean isLocked;
    @Builder.Default
    private LocalDateTime signDt = LocalDateTime.now();
    // 인증코드 등 민감정보는 포함하지 않음
}
