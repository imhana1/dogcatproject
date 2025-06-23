package com.example.dogcatserver.exception;

import lombok.*;

// 작업 실패했을 때 오류 (ex 글을 수정하지 못했습니다 ... )

@Getter
@AllArgsConstructor
public class JobFailException extends RuntimeException{
  private String message;
}
