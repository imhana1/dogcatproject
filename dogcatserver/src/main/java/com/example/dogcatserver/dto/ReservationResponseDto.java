package com.example.dogcatserver.dto;

import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponseDto {
  // 사용자가 서버에게 받는 데이터
  private int rno;                 // 예약번호
  private String nUsername;
  private String hUsername;
  private int pno;
  private LocalDateTime schedule;
  private String rStatus; // 예약 상태
}
