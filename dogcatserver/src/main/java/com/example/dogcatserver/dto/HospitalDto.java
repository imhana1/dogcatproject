package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.*;

import java.time.*;

public class HospitalDto {

    @Data
    public static class create{
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String hUsername;
        private String director;
        private String hospital;
        @Pattern(regexp = "^01[016789]-?\\d{3,4}-?\\d{4}$")
        private String hTel;
        @Pattern(regexp = "^0\\d{1,2}-?\\d{3,4}-?\\d{4}$")
        private String hReptel;
        private String hAddress;
        private boolean hChoice;
        private LocalDateTime hBirthDay;
        public Hospital toSignEntity(){
            return Hospital.builder().hospital(hUsername).director(director).hUsername(hUsername).hTel(hTel).hReptel(hReptel).hAddress(hAddress).hChoice(hChoice)
                    .hBirthDay(hBirthDay).build();
        }

    }

}
