package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Data
public class Pay {
  // rno, h_username, nusername 외래키
  // p_name : 결제명
  // pay_seq : 시퀀스

  private int rno;                // 예약번호
  private String hUsername;       // 병원 아이디
  private String nUsername;       // 고객 아이디
  private String orderNo;         // 주문 번호
  private String paymentKey;      // API 로 요청 후 제공되는 키
  private String pUsername;       // 결제자 이름
  private String productDesc;     // 결제 명
  private int amount;             // 결제 금액
  private int amountTaxFree;      // 비과세
  private String autoExecute;     // 자동 승인 설정
  private String resultCallback;  // 결제 결과 CallbackURL
  private String retUrl;          // 인증 완료 후 연결할 URL
  private String retCancelUrl;    // 결제 중단 시 사용자를 이동시킬 홈페이지 URL
  private PaymentStatus p_status; // 결제 상태

}