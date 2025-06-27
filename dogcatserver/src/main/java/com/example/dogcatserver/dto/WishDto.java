package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.Wish;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

public class WishDto {

    @Data
    @AllArgsConstructor
    public static class WishPages {
        private int prev;
        private int start;
        private int end;
        private int next;
        private int pageno;
        private List<Wish> wish;
    }
}
