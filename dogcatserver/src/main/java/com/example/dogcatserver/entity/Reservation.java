package com.example.dogcatserver.entity;

import lombok.*;
import org.springframework.stereotype.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Reservation {
  // rno 기본키
  private int rno;
  private String nusername;
  private LocalDateTime schedule;
  private String h_username;
  private int pno;
  private String rStatus;
}