package com.example.dogcatserver.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

public class NuserDto {
    @Data
    public static class NidCheck{
        @NotEmpty
        @Pattern(regexp = "^[a-Za-z0-9]{6,10}$")
        private String nId;
    }
}
