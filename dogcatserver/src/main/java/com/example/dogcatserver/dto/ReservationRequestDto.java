package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;  // 예약일시
    private LocalTime time;  // 예약 시간

  @Data
  @AllArgsConstructor
  @Builder
  public static class Create{
    private String nUsername;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime schedule;
    private String hUsername;
    private int pno;
    // 기본값 WAITING
    @Builder.Default
    private String rStatus = "WAIT";
    public Reservation toEntity() {
      return Reservation.builder()
              .nUsername(this.nUsername)
              .schedule(this.schedule)
              .hUsername(this.hUsername)
              .pno(this.pno)
              .rStatus(this.rStatus)
              .build();
    }
  }

}
