package com.example.dogcatserver.exception;

import lombok.*;

// 작업 실패했을 때 오류 (ex 글을 수정하지 못했습니다 ... )

@Getter
@AllArgsConstructor
public class JobFailException extends RuntimeException{
  public JobFailException(String message) {
    super(message);  // 부모 클래스에 메시지 전달
  }  // 여기도 이전처럼 하니까 오류나서 수정
}
