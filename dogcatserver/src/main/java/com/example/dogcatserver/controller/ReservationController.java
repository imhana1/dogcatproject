package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.format.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import java.security.*;
import java.time.*;
import java.util.*;

@Controller
public class ReservationController {
  @Autowired
  private ReservationService service;
  @Autowired
  private ReservationDao reservationDao;
  //

  @Operation(summary = "예약 생성", description = "예약 생성이 되었는지 확인")
  @PostMapping ("/reservation")
  public ResponseEntity<String> createReservation(@RequestBody ReservationRequestDto dto) {
   int rno =  service.createReservation(dto);
    return ResponseEntity.ok("예약이 생성되었습니다. 예약번호는" + rno);
  }

  @Operation(summary = "병원 예약 스케줄 불러오기", description = "스케줄 불러와서 예약 가능한 시간 보여주기")
  @GetMapping("/reservation/times")
  public ResponseEntity<List<Schedule>> getHospitalSchedule (
    @RequestParam String hUsername,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
      List<Schedule> schedules = service.getHospitalSchedule(hUsername, date);
       if (schedules.isEmpty()){
        return ResponseEntity.notFound().build();
      }
    return ResponseEntity.ok(schedules);
  }

  @Operation(summary = "예약 취소", description = "예약 취소 변수도 알아보자")
  @PatchMapping("/reservation/cancel")
  public ResponseEntity<String> cancelReservation(Reservation reservation) {
    boolean result = service.cancelReservation(reservation);

    if(result) {
      return ResponseEntity.ok("예약 취소 성공");
    } else {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("예약 취소 실패");
    }
  }

  @Operation(summary = "예약 삭제", description = "예약 삭제")
  @DeleteMapping("/reservation/delete")
  public ResponseEntity<String> deleteReservation(int rno) {
    int result = service.deleteReservation(rno);
    if (result == 1)
      return ResponseEntity.ok("삭제 성공");
    return ResponseEntity.status(HttpStatus.CONFLICT).body("삭제 실패");
  }

  @Operation(summary = "예약 내역 불러오기", description = "예약 내역 마이 페이지에 불러오기")
  @GetMapping("/reservation/info")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<Reservation>> getMyReservation(Principal principal) {
    List<Reservation> reservations = service.getMyReservation(principal.getName());
    return ResponseEntity.ok(reservations);
  }
}
