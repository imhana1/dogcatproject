package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.Nuser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

public class NuserDto {
    @Data
    public static class NidCheck {
        @NotEmpty
        @Pattern(regexp = "^[A-Za-z0-9]{6,10}$")
        private String nid;
    }

    @Data
    public static class Ncreate {
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String nid;
        private String nname;
        @Pattern(regexp = "^[A-Za-z0-9]{6,10}$")
        private String npwd;
        @Pattern(regexp = "^01[016789]-?\\d{3,4}-?\\d{4}$")
        private String ntel;
        private Integer zip; // 우편번호
        private String naddr;
        private LocalDate nbirth;

        public Nuser toSignEntity(Double nlocation, Double nlongitude) {
            return Nuser.builder().nid(nid).nname(nname).ntel(ntel).naddr(naddr).nbirth(nbirth).nlocation(nlocation).nlongitude(nlongitude).zip(zip).
                    build();
        }
    }
}
