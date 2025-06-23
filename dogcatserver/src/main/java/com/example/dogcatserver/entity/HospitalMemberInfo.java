package com.example.dogcatserver.entity;

import com.example.dogcatserver.dto.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.*;

import java.time.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalMemberInfo {
    private String hUsername;
    private String director;
    private String hospital;
    private String hTel;
    private String hReptel;
    private String hAddress;
    private String email;
    private boolean hChoice;
    @JsonIgnore
    private MultipartFile hProfile;
    @JsonFormat(pattern = "HH시 mm분")
    private LocalDateTime openTime;
    @JsonFormat(pattern = "HH시 mm분")
    private LocalDateTime closeTime;
    @JsonIgnore
    private MultipartFile dProfile;
    @JsonFormat(pattern = "yyyy년 MM월 dd일 HH시 mm분")
    @JsonProperty("hIntroduction")
    private String hIntroduction;

    public JoinViewInfoDto.HospitalInfo toRead(){
        return new JoinViewInfoDto.HospitalInfo(hUsername,director,hospital,hTel,hReptel,hAddress,email);
    }

    public JoinViewInfoDto.HospitalInfoChange toChangeRead(){
        return new JoinViewInfoDto.HospitalInfoChange(director,hospital,hTel,hReptel,hAddress,hChoice,hProfile,openTime,closeTime,dProfile,hIntroduction);
    }
}
