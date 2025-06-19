package com.example.dogcatserver.entity;

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
    private String status;
    private String e_code;
    private int count;
    private LocalDateTime sign_dt;
    private int isLocked;
}
