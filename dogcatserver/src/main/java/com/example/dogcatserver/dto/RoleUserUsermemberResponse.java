package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import lombok.*;

import java.time.*;

public class RoleUserUsermemberResponse {
    @Data
    @AllArgsConstructor
    @Builder
    public static class RoleHospital{
        private String username;
        private String password;
        @Builder.Default
        private Status status = Status.NORMAL;
        @Builder.Default
        private int count = 0;
        private boolean isLocked;
        @Builder.Default
        private Role role= Role.HOSPITAL;
        @Builder.Default
        private LocalDateTime signDt = LocalDateTime.now();
    }
    @Data
    @AllArgsConstructor
    @Builder
    public static class RoleNormal{
        private String username;
        private String password;
        @Builder.Default
        private Status status = Status.NORMAL;
        @Builder.Default
        private int count = 0;
        private boolean isLocked;
        @Builder.Default
        private Role role= Role.USER;
        @Builder.Default
        private LocalDateTime signDt = LocalDateTime.now();
    }
}
