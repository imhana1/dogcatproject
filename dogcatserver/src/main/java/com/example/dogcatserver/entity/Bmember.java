package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Bmember {
    private String username;
    private String password;
    private Role role;
}
