package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.format.annotation.*;
import org.springframework.web.multipart.*;

import java.time.*;

public class JoinViewInfoDto {
    @Data
    @AllArgsConstructor
    @Builder
    public static class HospitalInfo {
        private String hUsername;
        private String hospital;
        private String director;
        private String hTel;
        private String hReptel;
        private Integer zip; // 우편번호
        private String hAddress;
        private String email;
        private String hProfile;
        private String  openTime;
        private String  closeTime;
        private String dProfile;
        private String hIntroduction;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate hBirthDay;
        private String educational;
    }

    @Data
    @AllArgsConstructor
    @Builder
    public static class HospitalInfoChange {

        private String hUsername;
        private String director;
        private String hospital;
        private String hTel;
        private String hReptel;
        private Integer zip; // 우편번호
        private String hAddress;
//        private boolean hChoice;
        private String openTime;
        private String closeTime;
        private String hIntroduction;
        private String educational;

        // 이미지 파일은 이 DTO에서 제거됨
        // private MultipartFile hProfile;
        // private MultipartFile dProfile;

        // toChangeEntity는 이미지 base64 문자열을 외부에서 주입받음
        public HospitalMemberInfo toChangeEntity(Double hLocation, Double hLongitude, String base64HImage, String base64DImage) {
            return HospitalMemberInfo.builder()
                    .hUsername(hUsername)
                    .director(director)
                    .hospital(hospital)
                    .hTel(hTel)
                    .hReptel(hReptel)
                    .zip(zip)
                    .hAddress(hAddress)
//                    .hChoice(hChoice)
                    .hProfile(base64HImage) // 문자열로 주입된 값
                    .openTime(openTime)
                    .closeTime(closeTime)
                    .dProfile(base64DImage) // 문자열로 주입된 값
                    .hLocation(hLocation)
                    .hLongitude(hLongitude)
                    .hIntroduction(hIntroduction)
                    .educational(educational)
                    .build();
        }
    }

    @Data
    @AllArgsConstructor
    public static class NuserInfo {
        private String nid;
        private String nname;
        private String ntel;
        private Integer zip; // 우편번호
        private String naddr;
        private String email;
        @JsonFormat(pattern = "yyyy년 MM월 dd일")
        private LocalDate nbirth;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class NuserInfoChange {
        @NotEmpty
        private String nTel;
        @NotEmpty
        private String naddr;
        private Integer zip; // 우편번호

        public Nuser tonChangeEntity(Double nlocation, Double nlongitude) {
            return Nuser.builder().ntel(nTel).naddr(naddr).zip(zip).nlocation(nlocation).nlongitude(nlongitude).build();
        }
    }
}
