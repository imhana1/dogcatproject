package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.format.annotation.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

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


}
