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
    private Integer zip; // 우편번호
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
    private String  openTime;
    private String closeTime;
    @JsonIgnore
    private String dProfile;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate hBirthDay;
    private String hIntroduction;
    private String educational;

}
