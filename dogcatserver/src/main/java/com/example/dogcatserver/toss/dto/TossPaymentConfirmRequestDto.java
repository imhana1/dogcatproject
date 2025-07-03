package com.example.dogcatserver.toss.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
public class TossPaymentConfirmRequestDto {

  @JsonProperty("paymentKey")
  private String paymentKey;    // 토스에서 결제 진행하면 지급하는 키

  @JsonProperty("orderId")
  private String orderNo;       // 주문 번호

  private int amount;           // 가격
}
