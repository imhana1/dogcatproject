package com.example.dogcatserver.toss.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.util.*;

// 결제 생성 응답

@Data
public class TossPaymentCreateResponseDto {

  private String paymentKey;      // 토스에서 떨어뜨려 주는 값

  @JsonProperty("orderId")
  private String orderNo;         // 주문 번호

  private int amount;             // 가격

  @JsonProperty("status")
  private PaymentStatus pStatus; // 상태

  @JsonProperty("checkout")
  private Checkout checkout;    // checkoutUrl

  // checkout url을 정의
  @Data
  public static class Checkout {
    private String url;
  }
  
  // enum 매핑
  @JsonCreator
  public static PaymentStatus formStatus (String status) {
    return PaymentStatus.valueOf(status.toUpperCase());
  }
}


