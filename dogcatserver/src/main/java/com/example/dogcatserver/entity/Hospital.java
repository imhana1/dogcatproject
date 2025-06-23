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
    @JsonIgnore
    private String hProfile;
    // 위도
    @JsonProperty("y")
    private Double hLocation;
    // 경도
    @JsonProperty("x")
    private Double hLongitude;
    @JsonFormat(pattern = "yyyy년 MM월 dd일 HH시 mm분")
    private LocalDateTime openTime;
    @JsonFormat(pattern = "yyyy년 MM월 dd일 HH시 mm분")
    private LocalDateTime closeTime;
    @JsonIgnore
    private String dProfile;
    @JsonFormat(pattern = "yyyy년 MM월 dd일 HH시 mm분")
    private LocalDateTime hBirthDay;
    private String hIntroduction;

}
