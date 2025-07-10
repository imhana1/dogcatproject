package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;
import java.util.*;

public class HMemberManageDto {
    @Data
    public static class HospitalMemberList {
        // 아이디, 병원 이름, 가입일, 회원상태
        private String username;
        private String hospital;
        @JsonFormat(pattern = "yyyy년 MM월 dd일 HH시 mm분")
        private LocalDateTime signDt;
        private Status status;
    }

    // 목록
    @Data
    @AllArgsConstructor
    public static class Pages {
        private int prev;
        private int start;
        private int end;
        private int next;
        private int pageno;
        private List<HMemberManageDto.HospitalMemberList> HospitalMemberList;
    }

    // 상세화면 출력:
    // id, 병원 이름, 병원 연락처, 대표 연락처, 병원 주소, 이메일, 가입일, 회원상태, 경고횟수
    @Data
    public static class HospitalMemberDetails {
        private String username;
        private String hospital;
        private String hTel;
        private String hReptel;
        private String hAddress;
        private String email;
        private LocalDateTime signDt;
        private Status status;
        private int count;

    }
}
