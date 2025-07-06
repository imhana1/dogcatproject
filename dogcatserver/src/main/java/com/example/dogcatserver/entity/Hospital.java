package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Hospital {
    private String hUsername; // 병원 아이디
    private String director;
    private String hospital; // 병원 이름
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate hBirthDay;
    private String hIntroduction;
    private String educational;
    private String hSubaddress; // 상세주소
}
