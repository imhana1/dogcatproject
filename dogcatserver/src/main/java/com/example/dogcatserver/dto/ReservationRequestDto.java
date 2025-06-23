package com.example.dogcatserver.dto;

import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationRequestDto {
  // 사용자가 예약 시 보내는 데이터
    private String nUsername;   // 사용자 아이디
    private String hUsername;   // 병원 아이디
    private int pno;            // 반려동물 번호
    private LocalDateTime schedule;  // 예약일시
}
