package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.*;

public class TreatDto {
    @Data
    public static class  create{
        @NotNull
        Integer rno;
        @NotEmpty
        private String title;
        @NotEmpty
        private String content;

        public Treat toEntity(String loginID, String nUsername){
            return Treat.builder().tTitle(title).tContent(content).tWriter(loginID).rno(rno).nUsername(nUsername).build();
        }
    }
    @Data
    @AllArgsConstructor
    public static class pages{
        private int prev;
        private int start;
        private int end;
        private int next;
        private int pageno;
        private List<Treat> treats;
    }
}
