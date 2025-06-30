package com.example.dogcatserver.toss.dto;

// 결제 승인 응답

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
public class TossPaymentConfirmResponseDto {
  private String paymentKey;      // 토스에서 보내주는 키 값

  @JsonProperty("orderId")
  private String orderNo;         // 주문 번호

  private PaymentStatus rStatus;  // 결제 진행 상태
  private String method;          // 결제 종류
  private int totalAmount;        // 총 금액
  private String approcedAt;      // 결제 승인 완료 시간
}
