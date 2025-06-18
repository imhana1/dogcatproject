package com.example.dogcatserver.entity;

import lombok.*;

import java.util.*;

@Getter
@ToString // 작업 완료 후 삭제
public class QnaAnswer {  // qna 답변
  private int qno;
  private String username;
  private Date answerWriteDay;
  private String answerContent;
}

// 질문, 답변 entity 따로 만든 후 dto 만들어서 출력할 형태 관리