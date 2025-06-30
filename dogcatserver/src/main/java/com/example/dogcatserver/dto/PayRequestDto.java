package com.example.dogcatserver.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
public class PayRequestDto {
  @NotBlank
  private String paymentKey; // 결제 요청 했을 때 떨어지는 api 키

  @NotBlank
  private String orderId; // 주문아이디

  @NotBlank
  private String p_price; // 결제 금액
}
