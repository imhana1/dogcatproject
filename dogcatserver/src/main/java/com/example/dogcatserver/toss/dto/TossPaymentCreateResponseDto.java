package com.example.dogcatserver.toss.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

// 결제 생성 응답

@Data
public class TossPaymentCreateResponseDto {

  @JsonProperty("paymentId")
  private String paymentKey;

  private String checkoutUrl;

  @JsonProperty("orderId")
  private String orderNo;

  @JsonProperty("status")
  private PaymentStatus rStatus;
}
