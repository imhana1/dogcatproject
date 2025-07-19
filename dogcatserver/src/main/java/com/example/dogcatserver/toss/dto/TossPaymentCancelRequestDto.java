package com.example.dogcatserver.toss.dto;

import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TossPaymentCancelRequestDto {

  private int rno;

  @NotBlank(message = "paymentKey는 필수입니다.")
  private String paymentKey;      // 결제 키

  @JsonProperty("orderId")
  private String orderId;         // 주문 번호

  @NotBlank(message = "cancelReason 은 필수입니다.")
  private String cancelReason;    // 환불 사유

//  @JsonProperty("amount")
  private int cancelAmount;       // 환불 금액

  // 환불 해줄 정보 추가
  private String accountNumber;  // 계좌번호
  private String accountHolder;  // 예금주
}
