package com.example.dogcatserver.exception;

import lombok.*;

// entity 없을 때 예외처리

@Getter
@AllArgsConstructor
public class EntityNotFoundException extends RuntimeException {
  private String message;
}
