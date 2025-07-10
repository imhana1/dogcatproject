package com.example.dogcatserver.toss.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TossPaymentCancelRequestDto {

  private String paymentKey;      // 결제 키

  @JsonProperty("orderId")
  private String orderId;         // 주문 번호

  private String cancelReason;    // 환불 사유

  private int cancelAmount;       // 환불 금액
}
