package com.example.dogcatserver.exception;

import lombok.*;

// entity 없을 때 예외처리

@Getter
@AllArgsConstructor
public class EntityNotFoundException extends RuntimeException {
  public EntityNotFoundException(String message) {
    super(message);  // 부모 클래스에 메시지 전달
  } // 이전에 했던것처럼 하니까 오류나서 수정
}
