package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import java.time.*;

import static com.example.dogcatserver.entity.ReservationStatus.WAITING;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Reservation {
  // rno 기본키
  private int rno;
  private String nUsername;
  private LocalDateTime schedule;
  private String hUsername;
  private int pno;
  // 기본값 WAITING
  @Builder.Default
  private ReservationStatus rStatus = WAITING;
}