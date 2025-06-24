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
    private String hReptel;
    private String hAddress;
    private Integer hChoice;
    private String hProfileUrl;   // <img src="...">에 바로 사용
    private String  openTime;
    private String closeTime;
    private String dProfileUrl;
    @JsonProperty("hIntroduction")
    private String hIntroduction;
}
