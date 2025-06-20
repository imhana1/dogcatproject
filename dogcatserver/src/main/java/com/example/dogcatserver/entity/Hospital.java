package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
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
    private String hTel;
    private String hReptel;
    private String hAddress;
    private boolean hChoice;
    private String hProfile;
    private Double hLocation;
    private Double hLongitude;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    @JsonIgnore
    private String dProfile;
    private LocalDateTime hBirthDay;
    private String hIntroduction;
}
