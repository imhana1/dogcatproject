package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Pay {
  // rno, h_username, nusername 외래키
  // p_name : 결제명
  // pay_seq : 시퀀스

  private int rno;                // 결제 번호
  private String h_username;      // 병원 아이디
  private String nusername;       // 고객 아이디
  private String orderId;         // 주문번호
  private String paymentKey;      // API 키
  private String p_username;      // 주문자
  private String p_name;          // 결제명 (결제 찍힐 때 나오는 이름)
  private LocalDateTime p_time;   // 결제 시간
  private int p_price;            // 결제 금액
  private PaymentStatus p_status; // 결제 상태
}