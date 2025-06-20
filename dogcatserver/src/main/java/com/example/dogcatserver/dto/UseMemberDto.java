package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

public class UseMemberDto {
    @Data
    public static class UseMemberCode{
        private String username;
        private String email;

        public UseMember toEntity(String code){
            return UseMember.builder().username(username).eCode(code).email(email).isLocked(true).build();
        }
    }
    @Data
    public static class checkCode{
        @NotEmpty
        private String code;
    }


}
