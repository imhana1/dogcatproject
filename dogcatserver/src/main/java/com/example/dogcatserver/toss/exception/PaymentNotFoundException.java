package com.example.dogcatserver.toss.exception;

public class PaymentNotFoundException extends RuntimeException {

  public PaymentNotFoundException() {
    super("결제 정보를 찾을 수 없습니다.");
  }

  public PaymentNotFoundException(String message) {
    super(message);
  }
}