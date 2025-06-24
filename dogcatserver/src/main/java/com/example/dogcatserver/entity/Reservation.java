package com.example.dogcatserver.entity;

import lombok.*;
import org.springframework.stereotype.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Data
@ToString
public class Reservation {
  // rno 기본키
  private int rno;
  private String nUsername;
  private LocalDateTime schedule;
  private String hUsername;
  private int pno;
  private String rStatus;
}