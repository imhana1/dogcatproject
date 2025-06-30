package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import lombok.*;

import java.time.*;

@Data
public class PayResponseDto {
  private PaymentStatus p_status; // 결제 상태
  private String message; // 결제 메시지
  private String paymentKey; // 결제 요청 했을 때 떨어지는 api 키
  private String orderId; // 주문 아이디 (주문번호) 
  private String p_price; // 주문 금액
  private String method; // 결제 수단
  private LocalDateTime p_time; // 결제 시간
  private String failReason; // 결제 실패 이유
}
