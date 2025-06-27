package com.example.dogcatserver.dto;

import lombok.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupNdto {
    private SignupRequestDto data;
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignupRequestDto{
        private NuserDto.Ncreate nuser;
        private UseMemberDto.nomalSignup useMember;
    }
}
