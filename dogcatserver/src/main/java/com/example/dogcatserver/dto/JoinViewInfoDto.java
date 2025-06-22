package com.example.dogcatserver.dto;

import lombok.*;

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
}
