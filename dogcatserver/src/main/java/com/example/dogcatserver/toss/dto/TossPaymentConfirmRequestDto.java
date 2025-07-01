package com.example.dogcatserver.toss.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

// 결제 승인 요청
@Data
public class TossPaymentConfirmRequestDto {

  private String PaymentKey;    // 토스에서 결제 진행하면 지급하는 키

  @JsonProperty("orderId")
  private String orderNo;       // 주문 번호

  private int amount;           // 가격
}
