package com.example.dogcatserver.toss.exception;

import org.springframework.context.support.*;
import org.springframework.http.*;
import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;

import java.util.stream.*;

@ControllerAdvice
public class GlobalExceptionHandler {

  // 런타임 예외 처리
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
    // 로그 찍기 (필요시)
    System.err.println("Error: " + ex.getMessage());

    // 클라이언트에 에러 메시지와 500 상태코드 응답
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body("서버 오류가 발생했습니다: " + ex.getMessage());
  }

  // 필요시 특정 예외별로 별도 핸들러 추가 가능

  // createPayment 검증 실패 예외 처리
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
    String errorMessage = ex.getBindingResult().getAllErrors().stream()
      .map(DefaultMessageSourceResolvable::getDefaultMessage)
      .collect(Collectors.joining(", "));
    return ResponseEntity.badRequest().body("입력값 오류: " + errorMessage);
  }

  // controller 예외 처리
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<String> handleIllegalArgument (IllegalArgumentException e) {
    return ResponseEntity.badRequest().body(e.getMessage());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleAll (Exception e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("백엔드 서버 오류 : " + e.getMessage());
  }
}
