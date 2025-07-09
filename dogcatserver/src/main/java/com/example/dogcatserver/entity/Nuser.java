package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Nuser {
    // 일반 회원에게 받아올 값
    private String nid;     // 아이디

    private String nname;       // 이름
    private Integer zip; // 우편번호
    private String naddr;       // 주소
    private String ntel;           // 연락처

    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate nbirth;        // 생년월일

    @JsonProperty("longitude")
    private Double nlongitude;     // 경도

    @JsonProperty("latitude")
    private Double nlocation;      // 위도

    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate nsigndt;  // 가입 일자

    private String nsubaddr; // 상세 주소 추가 - 재호
}
