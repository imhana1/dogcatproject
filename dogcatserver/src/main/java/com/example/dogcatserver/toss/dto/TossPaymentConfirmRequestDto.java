package com.example.dogcatserver.toss.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Data
public class TossPaymentConfirmRequestDto {

  private int rno;                // 예약번호
  private String hUsername;       // 병원 아이디
  private String nUsername;       // 고객 아이디

  @JsonProperty("orderId")
  private String orderId;       // 주문 번호

  @JsonProperty("paymentKey")
  private String paymentKey;    // 토스에서 결제 진행하면 지급하는 키

  private String pUsername;       // 결제자 이름
  private String productDesc;     // 결제 명
  private int amount;             // 결제 금액
  private int amountTaxFree;      // 비과세
  private Boolean autoExecute;     // 자동 승인 설정
  private String resultCallback;  // 결제 결과 CallbackURL
  private String retUrl;          // 인증 완료 후 연결할 URL
  private String retCancelUrl;    // 결제 중단 시 사용자를 이동시킬 홈페이지 URL
  private PaymentStatus pStatus; // 결제 상태
}
