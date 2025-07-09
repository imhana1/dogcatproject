package com.example.dogcatserver.toss.dto;

// 결제 승인 응답

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;

@Data
public class TossPaymentConfirmResponseDto {

  private String paymentKey;      // 토스에서 보내주는 키 값

  @JsonProperty("orderId")
  private String orderId;         // 주문 번호

  @JsonProperty("status")
  private PaymentStatus pStatus;  // 결제 진행 상태

  private String method;          // 결제 종류

  private int totalAmount;        // 총 금액

  @JsonProperty("approvedAt")
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
  private OffsetDateTime approvedAt;      // 결제 승인 완료 시간

  private String checkoutUrl;     // 결제창 url
}
