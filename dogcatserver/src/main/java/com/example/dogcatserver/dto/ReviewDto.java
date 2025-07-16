package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.*;

public class ReviewDto {

    @Data
    public static class write{
        @NotNull
        private Integer rno;
        @NotEmpty
        private String content; // 내용

        public Review toEntity(String hUsername, String loginId) {
            return Review.builder()
                    .rno(rno)
                    .revContent(content)
                    .hUsername(hUsername)
                    .revWriter(loginId)
                    .build();
        }
    }
    @Data
    public static class update{
        @NotNull
        private Integer revNo;
        @NotEmpty
        private String revContent;
    }


    @Data
    @AllArgsConstructor
    public static class pages{
        private int prev;
        private int start;
        private int end;
        private int next;
        private int pageno;
        private List<Review> reviews;
    }
}
