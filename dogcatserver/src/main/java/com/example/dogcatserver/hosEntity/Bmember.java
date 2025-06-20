package com.example.dogcatserver.hosEntity;

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
