package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;

public class UseMemberDto {
    @Data
    public static class UsernameCheck{
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String username;
    }
    @Data
    public static class UseMemberCode{
        private String username;
        @Email
        private String email;

        public UseMember toEntity(String code){
            return UseMember.builder().username(username).eCode(code).email(email).isLocked(true).build();
        }
    }
    @Data
    public static class checkCode{
        @NotEmpty
        private String code;

        public UseMember toEntity(String username){
            return UseMember.builder().username(username).isLocked(false).build();
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    public static class hospitalSignup{
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String username;
        @NotEmpty
        @Pattern(regexp = "^[a-zA-Z0-9]{6,10}$")
        private String password;
        @Builder.Default
        private Role role= Role.HOSPITAL;
//        @Builder.Default
//        private String status = "일반";
//        @Builder.Default
//        // 경고 횟수
//        private int count=0;
        @Builder.Default
        private LocalDateTime signDt = LocalDateTime.now();

        public UseMember toUseMemberEntity(String encodedPassword){
            return UseMember.builder().username(username).password(encodedPassword).role(role).signDt(signDt).build();
        }
    }
    @Data
    @Builder
    @AllArgsConstructor
    public static class noamlSignup{
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String username;
        @NotEmpty
        @Pattern(regexp = "^[a-zA-Z0-9]{6,10}$")
        private String password;
        @Builder.Default
        private Role role= Role.USER;
        @Builder.Default
        private String status = "일반";
        @Builder.Default
        // 경고 횟수
        private int count=0;
        @Builder.Default
        private LocalDateTime signDt = LocalDateTime.now();
    }

    @Data
    public static class changePassword{
        @NotEmpty
        @Pattern(regexp = "^[a-zA-Z0-9]{6,10}$")
        private String currentPassword;

        @NotEmpty
        @Pattern(regexp = "^[a-zA-Z0-9]{6,10}$")
        private String newPassword;
    }

    @Data
    public static class CheckPassword{
        @NotEmpty
        @Pattern(regexp = "^[a-zA-Z0-9]{6,10}$")
        private String Password;
    }


    @Data
    public static class findPassword{
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String username;
    }



}
