package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

public class HospitalDto {
    @Data
    public static class UsernameCheck{
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String username;
    }
    @Data
    public static class HospitalEmail{
        @NotEmpty
        @Pattern(regexp = "^[a-z0-9]{6,10}$")
        private String username;

    }

}
