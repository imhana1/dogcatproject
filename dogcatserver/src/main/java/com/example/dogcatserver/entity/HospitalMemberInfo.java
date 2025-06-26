package com.example.dogcatserver.entity;

import com.example.dogcatserver.dto.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HospitalMemberInfo {
    private String hUsername;
    private String director;
    private String hospital;
    private String hTel;
    private String hReptel;
    private String hAddress;
    private String email;
    private boolean hChoice;
    // 위도
    @JsonProperty("y")
    private Double hLocation;
    // 경도
    @JsonProperty("x")
    private Double hLongitude;
    @JsonIgnore
    private String hProfile;
    @JsonIgnore
    private String dProfile;
    private String  openTime;
    private String closeTime;
    @JsonFormat(pattern = "yyyy년 MM월 dd일 HH시 mm분")
    private LocalDate hBirthDay;
//    @JsonProperty("hIntroduction")
    private String hIntroduction;
    private String educational;

    // 기존 toRead()는 그대로 유지
    public JoinViewInfoDto.HospitalInfo toRead() {
        return JoinViewInfoDto.HospitalInfo.builder()
                .hUsername(hUsername)
                .hospital(hospital)
                .director(director)
                .hTel(hTel)
                .hReptel(hReptel)
                .hAddress(hAddress)
                .email(email)
                .hProfile(hProfile)
                .openTime(openTime)
                .closeTime(closeTime)
                .dProfile(dProfile)
                .hIntroduction(hIntroduction)
                .educational(educational)
                .hBirthDay(hBirthDay)
                .build();
    }

    // 파일명/경로를 이용해 URL로 변환해서 DTO로 반환
    public HospitalInfoChangeResponse toChangeRead() {
        return HospitalInfoChangeResponse.builder()
                .hUsername(hUsername)
                .director(director)
                .hospital(hospital)
                .hTel(hTel)
                .hReptel(hReptel)
                .hAddress(hAddress)
                .hChoice(hChoice)
                .hProfileUrl(hProfile != null ? "/files/profile/" + hProfile : null)
                .openTime(openTime)
                .closeTime(closeTime)
                .dProfileUrl(dProfile != null ? "/files/profile/" + dProfile : null)
                .hIntroduction(hIntroduction)
                .educational(educational)
                .build();
    }
}

