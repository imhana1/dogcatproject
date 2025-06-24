package com.example.dogcatserver.dto;

import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupDto {
    private SignupRequestDto data;
   @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignupRequestDto{
        private HospitalDto.create hospital;
        private UseMemberDto.hospitalSignup useMember;
        private NuserDto.Ncreate nuser;
    }
}
