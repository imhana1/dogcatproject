package com.example.dogcatserver.toss.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

// 결제 승인 요청
@Data
public class TossPaymentConfirmRequestDto {

  private String PaymentKey;

  @JsonProperty("orderId")
  private String orderNo;

  private int amount;
}
