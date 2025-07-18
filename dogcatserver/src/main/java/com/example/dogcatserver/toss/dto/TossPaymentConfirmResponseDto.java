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

  // ✅ 추가: orderName 필드
  @JsonProperty("orderName")
  private String orderName;       // 주문 이름 (상품명 등, Toss Payments 응답에 포함됨)

  @JsonProperty("status")
  // `PaymentStatus` Enum을 사용하려면 Jackson이 문자열을 Enum으로 변환할 수 있도록 설정이 필요합니다.
  // 기본적으로 Enum의 `name()`을 사용하므로, Toss API의 status 문자열과 Enum 이름이 일치해야 합니다.
  private PaymentStatus pStatus;  // 결제 진행 상태

  private String method;          // 결제 종류

  private int totalAmount;        // 총 금액

  @JsonProperty("approvedAt")
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
  private OffsetDateTime approvedAt;      // 결제 승인 완료 시간

  private String checkoutUrl;     // 결제창 url



}
