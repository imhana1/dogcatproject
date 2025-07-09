package com.example.dogcatserver.entity;

import com.example.dogcatserver.dto.PetDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pet {
    // 사용자에게 받아올 값 (pet)
    private int pno;    // 동물번호
    private String nid; // 회원 아이디
    private String ptype;   // 동물 종류
    private String pmichipe;   // 내장칩유무
    private String pbreed;  // 품종
    private String pname;   // 이름
    private String pweight;    // 몸무게
//    @JsonFormat(pattern = "yyyy년 MM월 dd일") 오라클 열 유형 오류 초래
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate page;   // 나이
    private String palg;   // 알러지유무
    private String pins;   // 펫보험 여부
    private String pchronic; // 선천적 지병
    private String psname;  // 수술 이름
    private String pprof;   // 펫 프사

    public PetDto.pread toRead() {
        return new PetDto.pread(pno, ptype, pmichipe, pbreed, pname, page, pweight, palg, pins, pchronic, psname, pprof);
    }

}
