package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import jakarta.validation.constraints.*;
import lombok.*;

public class QnaAnswerDto {
  @Data
  public static class Write {
    @NotNull
    private int qno;
    @NotEmpty
    private String username;
    @NotEmpty
    private String answerContent;

    public QnaAnswer toEntity(String loginId) {
      return QnaAnswer.builder().qno(qno).username(loginId).answerContent(answerContent).build();
    }
  }
}
