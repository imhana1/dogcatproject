package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import lombok.*;

import java.time.*;
import java.util.*;

public class NoticeDto {
  // 전체 글 불러오기
  @Data
  @AllArgsConstructor
  public static class Pages {
    private int prev;
    private int start;
    private int end;
    private int next;
    private int pageno;
    private List<Notice> notices;
  }


  // 글 수정
  @Data
  public static class Update {
    private int nno;
    private String nTitle;
    private String nContent;
    private boolean nIsTop;
  }

  // 글 등록
  @Data
  public static class Write {
    private String nTitle;
    private String nContent;
    private boolean nIsTop;

    public Notice toEntity(String loginId) {
      return Notice.builder().nTitle(nTitle).nContent(nContent).nIsTop(nIsTop).username(loginId).build();
      // db 등록할 때 username에 관리자 id를 넣을거야. 관리자 id는 controller 만들면서 toEntity로 보낼거야. 이후에 꼭 넣기
    }
  }
}
