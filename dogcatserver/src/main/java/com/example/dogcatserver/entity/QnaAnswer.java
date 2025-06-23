package com.example.dogcatserver.entity;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString // 작업 완료 후 삭제
public class QnaAnswer {  // qna 답변
  private int qno;
  private String username;
  @Builder.Default
  private LocalDateTime answerWriteDay=LocalDateTime.now();  // 기본값: 작성일
  @NotNull
  private String answerContent;
}

// 질문, 답변 entity 따로 만든 후 dto 만들어서 출력할 형태 관리