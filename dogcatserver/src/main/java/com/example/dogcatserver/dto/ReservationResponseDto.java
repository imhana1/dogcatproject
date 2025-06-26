package com.example.dogcatserver.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationResponseDto {
  // 사용자가 서버에게 받는 데이터
  private int rno;                 // 예약번호
  private String nUsername;
  private String hUsername;
  private int pno;
  @JsonFormat (pattern = "yyyy-MM-dd")
  private LocalDate date;
  private LocalTime time;
  private String rStatus; // 예약 상태
}
