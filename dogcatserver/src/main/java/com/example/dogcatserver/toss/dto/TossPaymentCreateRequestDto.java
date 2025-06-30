package com.example.dogcatserver.toss.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

// payService 안에 있는 createPayment 를 관리하기 위한 dto
  // 결제 생성
@Data
public class TossPaymentCreateRequestDto {

  @JsonProperty("orderId")
  private String orderNo;        // 주문 번호

  private int amount;            // 결제 금액

  @JsonProperty("taxFreeAmount")
  private int amountTaxFree;     // 비과세

  @JsonProperty("orderName")
  private String productDesc;    // 결제명

  private boolean autoExecute;    // 자동결제 승인 설정

  private String resultCallback; // 결제 결과 Callback

  @JsonProperty("successUrl")
  private String retUrl;         // 인증 완료 후 연결할 url

  @JsonProperty("failUrl")
  private String retCancelUrl;   // 결제 중단 시 사용자를 이동시킬 홈페이지 url

}
