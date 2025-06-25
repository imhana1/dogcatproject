package com.example.dogcatserver.entity;

import lombok.*;
import java.time.*;

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
  private String rStatus = "WAITING";
}