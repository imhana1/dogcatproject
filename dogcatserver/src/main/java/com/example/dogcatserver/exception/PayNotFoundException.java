package com.example.dogcatserver.exception;

public class PayNotFoundException extends RuntimeException {

  public PayNotFoundException(String message) {
    super(message);
  }

  // 필요하다면 기본 생성자도 추가할 수 있음
  public PayNotFoundException() {
    super("결제 정보를 찾을 수 없습니다.");
  }
}
