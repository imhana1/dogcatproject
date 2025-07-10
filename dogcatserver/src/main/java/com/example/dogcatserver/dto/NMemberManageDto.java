package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;
import java.util.*;


public class NMemberManageDto {
  @Data
  public static class NormalMemberList {
    // 아이디, 이름, 가입일, 회원상태
    private String username;
    private String nname;
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
    private List<NMemberManageDto.NormalMemberList> normalMemberList;
  }

  // 상세화면 출력:
  // id, 이름, 연락처, 주소, 이메일, 가입일, 회원상태, 경고횟수
  @Data
  public static class NormalMemberDetails {
    private String username;
    private String nname;
    private String ntel;
    private String naddr;
    private String email;
    private LocalDateTime signDt;
    private Status status;
    private int count;

  }
}
