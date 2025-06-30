package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.*;

import java.time.*;

public class HospitalDto {

    @Data
    public static class create {
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String hUsername;
        private String director;
        private String hospital;
        @Pattern(regexp = "^01[016789]-?\\d{3,4}-?\\d{4}$")
        private String hTel;
        @Pattern(regexp = "^0\\d{1,2}-?\\d{3,4}-?\\d{4}$")
        private String hReptel;
        private Integer zip; // 우편번호
        private String hAddress;
        private boolean hChoice;
        private LocalDate hBirthDay;

                public Hospital toSignEntity(Double hLocation, Double hLongitude){
            return Hospital.builder().hUsername(hUsername).director(director).hospital(hospital).hTel(hTel).hReptel(hReptel).hAddress(hAddress).hChoice(hChoice)
                    .zip(zip).hBirthDay(hBirthDay).hLocation(hLocation).hLongitude(hLongitude).build();
        }

        }
    }
