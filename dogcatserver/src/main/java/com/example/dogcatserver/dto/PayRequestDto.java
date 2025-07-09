package com.example.dogcatserver.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
public class PayRequestDto {
  @NotBlank(message = "paymentKey가 없습니다")
  private String paymentKey; // 결제 요청 했을 때 떨어지는 api 키

  @NotBlank(message = "orderId 가 없습니다")
  private String orderId; // 주문번호

  @Min(value = 1, message = "가격은 1원 이상이어야합니다")
  private int amount; // 결제 금액
}
