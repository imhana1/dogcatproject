package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

public class TreatDto {
    @Data
    public static class  create{
        @NotEmpty
        private String title;
        @NotEmpty
        private String content;

        public Treat toEntity(String loginID){
            return Treat.builder().tTitle(title).tContent(content).tWriter(loginID).build();
        }
    }
}
