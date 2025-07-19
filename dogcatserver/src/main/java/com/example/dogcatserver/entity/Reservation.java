package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import java.time.*;
import java.util.*;

import static com.example.dogcatserver.entity.ReservationStatus.WAITING;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Reservation {
  // rno 기본키
  private int rno;
  private Integer sId; // 스케즐 일련번호
  private String nUsername;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm", shape = JsonFormat.Shape.STRING)
  private LocalDateTime schedule;
  private String hUsername;
  private int pno;
  private String sChoice;
  private String nName; // 예약자 명
  private String hospital; // 예약한 병원 명
  private String rCondition;
  private String remark;
  // 기본값 WAITING
  @Builder.Default
  private ReservationStatus rStatus = WAITING;
  private String orderNo;         // 주문 번호
  private String paymentKey;
  private int amount;
}