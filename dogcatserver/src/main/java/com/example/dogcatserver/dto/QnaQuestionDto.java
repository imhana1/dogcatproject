package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
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
}
