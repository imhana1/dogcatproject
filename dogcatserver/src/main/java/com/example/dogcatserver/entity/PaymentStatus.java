package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
public enum PaymentStatus {
  PENDING, // 결제 대기
  COMPLETED, // 결제 완료
  CANCELLED, // 결제 취소
  FAILED, // 결제 실패
  DONE // 토스에서 보내는 완료 상태
  ;
}
