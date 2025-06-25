package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.context.annotation.*;

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
    @NotNull
    private String nTitle;
    @NotNull
    private String nContent;
    private boolean nIsTop;
  }

  // 글 등록
  @Data
  @Builder
  public static class Write {
    @NotNull
    private String nTitle;
    @NotNull
    private String nContent;
    private boolean nIsTop;

    public Notice toEntity(String loginId) {
      return Notice.builder().nTitle(nTitle).nContent(nContent).nIsTop(nIsTop).username(loginId).build();

//      Notice notice = new Notice();
//      notice.setNTitle(nTitle);
//      notice.setNContent(nContent);
//      notice.setNIsTop(nIsTop);
//      notice.setUsername(loginId);
//      return notice;

      // db 등록할 때 username에 관리자 id를 넣을거야. 관리자 id는 controller 만들면서 toEntity로 보낼거야. 이후에 꼭 넣기
    }
  }
}
