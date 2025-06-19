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
  private int rno;
  private String h_username;
  private String nusername;
  private String orderId;
  private String paymentKey;
  private String p_username;
  private String p_name;
  private LocalDateTime p_time;
  private int p_price;
  private PaymentStatus p_status;
}