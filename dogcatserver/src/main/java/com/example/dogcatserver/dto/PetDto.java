package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.Pet;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public class PetDto {
    @Data
    @AllArgsConstructor
    public static class psave {
        private int pno;    // 동물번호
        private String ptype;   // 동물 종류
        private int pmichipe;   // 내장칩유무
        private String pbread;  // 품종
        private String pname;   // 이름
        private int page;   // 나이
        private int pweight;    // 몸무게
        private int palg;   // 알러지유무
        private int pins;   // 펫보험 여부
        public MultipartFile petprofile;    // 펫 프사

        public Pet toEntity(String base64image) {
            return Pet.builder().pname(pname).pporf(base64image).build();
        }
    }

    @Data
    @AllArgsConstructor
    public static class pread {
        private int pno;    // 동물번호
        private String ptype;   // 동물 종류
        private int pmichipe;   // 내장칩유무
        private String pbread;  // 품종
        private String pname;   // 이름
        private int page;   // 나이
        private int pweight;    // 몸무게
        private int palg;   // 알러지유무
        private int pins;   // 펫보험 여부
        private String pchronic; // 선천적 지병
        private String psname;  // 수술 이름
        public String petprofile;    // 펫 프사
    }
}
