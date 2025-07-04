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
        private int pno;
        private String nid;
        private String ptype;
        private int pmichipe;
        private String pbreed;
        private String pname;
        private LocalDate page;
        private int pweight;
        private int palg;
        private int pins;
        private String pchronic;
        private String psname;

        public Pet toEntity(String base64image) {
            return Pet.builder()
                    .pno(pno)
                    .nid(nid)
                    .ptype(ptype)
                    .pmichipe(pmichipe)
                    .pbreed(pbreed)
                    .pname(pname)
                    .page(page)
                    .pweight(pweight)
                    .palg(palg)
                    .pins(pins)
                    .pchronic(pchronic)
                    .psname(psname)
                    .pprof(base64image)
                    .build();
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
        private LocalDate page;   // 생년월일
        private int pweight;    // 몸무게
        private int palg;   // 알러지유무
        private int pins;   // 펫보험 여부
        private String pchronic; // 선천적 지병
        private String psname;  // 수술 이름
        public String petprofile;    // 펫 프사
    }
}
