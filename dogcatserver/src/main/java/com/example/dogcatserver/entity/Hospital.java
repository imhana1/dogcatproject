package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Hospital {
    private String hUsername;
    private String director;
    private String hospital;
    private String tel;
    private String reptel;
    private String address;
    private boolean choice;
    private String profile;
    private Double loaction;
    private Double longitude;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private String dProfile;
    private LocalDateTime birthDay;
    private String email;
    private String Introduction;
}
