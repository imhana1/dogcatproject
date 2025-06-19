package com.example.dogcatserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

public class PetDto {
    @Data
    @AllArgsConstructor
    public static class Pread {
        private int pno;    // 동물번호
        private String ptype;   // 동물 종류
        private int pmichipe;   // 내장칩유무
        private String pbread;  // 품종
        private String pname;   // 이름
        private int page;   // 나이
        private int palg;   // 알러지유무
        private int pins;   // 펫보험 여부
        private String pporf;   // 펫 프사
    }
}
