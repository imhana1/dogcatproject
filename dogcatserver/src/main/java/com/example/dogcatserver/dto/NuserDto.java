package com.example.dogcatserver.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

public class NuserDto {
    @Data
    public static class NidCheck{
        @NotEmpty
        @Pattern(regexp = "^[A-Za-z0-9]{6,10}$")
        private String nId;
    }

    @Data
    public static class Ncreate {
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String nId;
        @NotEmpty
        private String nname;
        @NotEmpty
        @Pattern(regexp = "^[A-Za-z0-9]{6,10}$")
        private String npwd;
        @NotEmpty
        @Email
        private String email;
        @NotEmpty
        private String naddr;
        @NotEmpty
        private LocalDate nbirth;

        public Nuser toEntity(String encodedPassword) {
            return Nuser.builder().nname(nname).npassword(encodedPassword).email(email).
                    build();
        }
    }
