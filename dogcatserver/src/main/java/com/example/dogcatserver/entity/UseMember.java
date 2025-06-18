package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UseMember {
    private String username;
    private String password;
    private Role role;
}
