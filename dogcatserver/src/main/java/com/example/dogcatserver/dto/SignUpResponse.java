package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import lombok.*;

@Data
@AllArgsConstructor
public class SignUpResponse {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class HospitalResponse{
        private Hospital hospital;
        private RoleUserUsermemberResponse.RoleHospital roleHospital;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class NormalResponse{
        private Nuser nuser;
        private RoleUserUsermemberResponse.RoleNormal roleNormal;
    }

}
