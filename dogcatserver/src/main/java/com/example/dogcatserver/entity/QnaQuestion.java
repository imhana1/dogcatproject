package com.example.dogcatserver.entity;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;
import java.util.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@ToString // 작업 완료 후 삭제
public class QnaQuestion {  // qna 질문
  private int qno;
  @NotNull
  private String qTitle;
  private String username;
  @Builder.Default
  private LocalDateTime qWriteDay = LocalDateTime.now();  // 기본값: 작성일
  @NotNull
  private String qContent;
  @Builder.Default
  private boolean qIsAnswered = false;  // 기본값: 답변미완료
  private String qImage;  // 사진 첨부 가능하게 (1장)
}

// 질문, 답변 entity 따로 만든 후 dto 만들어서 출력할 형태 관리