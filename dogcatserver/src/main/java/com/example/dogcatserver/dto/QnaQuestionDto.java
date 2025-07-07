package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.*;

public class QnaQuestionDto {
  // 전체 글 불러오기
  @Data
  @AllArgsConstructor
  public static class Pages {
    private int prev;
    private int start;
    private int end;
    private int next;
    private int pageno;
    private List<QnaQuestion> qnaQuestions;
  }

  @Data
  public static class Write {
    @NotEmpty
    private String qTitle;
    @NotEmpty
    private String username;
    @NotEmpty
    private String qContent;

    public QnaQuestion toEntity(String savedFileName, String loginId) {
      return QnaQuestion.builder().qImage(savedFileName).qTitle(qTitle).username(loginId).qContent(qContent).build();
    }
  }
}
