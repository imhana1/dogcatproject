package com.example.dogcatserver.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Nuser {
    // 일반 회원에게 받아올 값
    private String nid;     // 아이디

    @JsonIgnore
    private String nname;       // 이름
    private String npassword;   // 비밀번호
    private String email;       // 이메일
    private String naddr;       // 주소
    private int ntel;           // 연락처
    private Date nbirth;        // 생년월일
    private int nlongitude;     // 위도
    private int nlocation;      // 경도
    private LocalDate nsigndt;
}
