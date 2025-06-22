package com.example.dogcatserver.dto;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupDto {
    private SignupRequestDto data;
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignupRequestDto{
        private HospitalDto.create hospital;
        private UseMemberDto.hospitalSignup useMember;
    }
}
