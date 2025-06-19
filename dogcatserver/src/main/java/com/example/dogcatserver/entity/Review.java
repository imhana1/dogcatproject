package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Review {
  // rev_no 기본키
  private int rev_no;
  private int rno;
  private String r_writer;
  private LocalDateTime write_day;
  private String content;
}
