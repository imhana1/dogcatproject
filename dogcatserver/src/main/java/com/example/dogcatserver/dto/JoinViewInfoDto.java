package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.*;

import java.time.*;

public class JoinViewInfoDto {
    @Data
    @AllArgsConstructor
    public static class HospitalInfo {
        private String hUsername;
        private String hospital;
        private String director;
        private String hTel;
        private String hReptel;
        private String hAddress;
        private String email;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class HospitalInfoChange{
        @NotEmpty
        private String director;
        @NotEmpty
        private String hospital;
        @NotEmpty
        private String hTel;
        @NotEmpty
        private String hReptel;
        @NotEmpty
        private String hAddress;
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
        public Hospital toChangeEntity(Double hLocation, Double hLongitude, String base64PImage, String bas64DImage){
             return Hospital.builder().director(director).hospital(hospital).hTel(hTel).hReptel(hReptel).hAddress(hAddress).hChoice(hChoice)
                     .hProfile(base64PImage).openTime(openTime).closeTime(closeTime).dProfile(bas64DImage).hLocation(hLocation).hLongitude(hLongitude).hIntroduction(hIntroduction).build();
        }
    }

    @Data
    @AllArgsConstructor
    public static class NuserInfo {
        private String nid;
        private String nname;
        private String ntel;
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

        public Nuser tonChangeEntity(Double nlocation, Double nlongitude) {
            return Nuser.builder().ntel(nTel).naddr(naddr).nlocation(nlocation).nlongitude(nlongitude).build();
        }
    }
}
