package com.example.dogcatserver.entity;

import com.example.dogcatserver.dto.PetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pet {
    // 사용자에게 받아올 값 (pet)
    private int pno;    // 동물번호
    private String ptype;   // 동물 종류
    private int pmichipe;   // 내장칩유무
    private String pbreed;  // 품종
    private String pname;   // 이름
    private int pweight;    // 몸무게
    private int page;   // 나이
    private int palg;   // 알러지유무
    private int pins;   // 펫보험 여부
    private String pporf;   // 펫 프사

    public PetDto.pread toRead() {
        return new PetDto.pread(pno, pname, pmichipe, ptype, pbreed, pweight, page, palg, pins, pporf);
    }

}
