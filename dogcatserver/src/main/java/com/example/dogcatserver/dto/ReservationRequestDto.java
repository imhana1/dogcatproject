package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationRequestDto {
  // 사용자가 예약 시 보내는 데이터
    private int rno;            // 예약 번호
    private String nUsername;   // 사용자 아이디
    private String hUsername;   // 병원 아이디
    private int pno;            // 반려동물 번호
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;  // 예약일시
    private LocalTime time;  // 예약 시간

  @Data
  @AllArgsConstructor
  @Builder
  public static class Create {
//    private String nUsername;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime schedule;
    private String hUsername;
    private String nName;
//    private int pno;
    private String pName;
    private String sChoice;// 진료미용
    private String rCondition;
    private String remark;

    public Reservation toEntity(Integer sId, String loginId, Integer pno) {
      return Reservation.builder()
              .nUsername(loginId)
              .schedule(this.schedule)
              .hUsername(this.hUsername)
              .pno(pno)
              .nName(this.nName)
              .sChoice(this.sChoice)
              .sId(sId)
              .rCondition(rCondition)
              .remark(remark)
              .build();
    }
  }

}
