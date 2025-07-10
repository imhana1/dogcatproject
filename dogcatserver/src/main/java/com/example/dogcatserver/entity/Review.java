package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Review {
  // rev_no 기본키
  // 외래키 : rno, rWriter, hUsername
  // 리뷰는 사용자가 작성해서 병원 소개 페이지에 띄운다

  private int revNo; // 리뷰 번호
  private int rno; // 예약 번호
  private String revWriter; // 작성자
  @Builder.Default
  private LocalDateTime revWriteDay = LocalDateTime.now(); // 작성일
  private String revContent; // 내용
  private String hUsername; // 병원 아이디
}
