package com.example.dogcatserver.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HospitalInfoChangeResponse {
    private String hUsername;
    private String director;
    private String hospital;
    private String hTel;
    private Integer zip; // 우편번호
    private String hReptel;
    private String hAddress;
    private boolean hChoice;
    private String hProfileUrl;   // <img src="...">에 바로 사용
    private String  openTime;
    private String closeTime;
    private String dProfileUrl;
    private String hIntroduction;
    private String educational;
    private String hSubaddress; // 상세 주소 추가
}
