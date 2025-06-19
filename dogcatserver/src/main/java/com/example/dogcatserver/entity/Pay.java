package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Pay {
  // rno, h_username, nusername 외래키
  private int rno;
  private String h_username;
  private String nusername;
  private String p_username;
  private LocalDateTime p_time;
  private int p_price;
}