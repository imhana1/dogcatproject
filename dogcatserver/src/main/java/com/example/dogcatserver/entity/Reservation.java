package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Reservation {
  // rno 기본키
  private int rno;
  private String nusername;
  private LocalDateTime schedule;
  private String h_username;
  private int pno;
}