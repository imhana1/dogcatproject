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
import org.springframework.security.access.annotation.*;
import org.springframework.security.access.prepost.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import java.security.*;
import java.time.*;
import java.util.*;

@RestController
public class ReservationController {
    @Autowired
    private ReservationService service;
    @Autowired
    private ReservationDao reservationDao;

    @Autowired
    private ScheduleService scheduleService;
    //

    @Secured("ROLE_USER")
    @Operation(summary = "예약 생성", description = "예약 생성이 되었는지 확인")
    @PostMapping("/reservation")
    public ResponseEntity<String> create(@RequestBody ReservationRequestDto.Create dto) {
        int rno = service.createReservation(dto);
        return ResponseEntity.ok("예약번호: " + rno);
    }

    @Operation(summary = "병원 예약 스케줄 불러오기", description = "스케줄 불러와서 예약 가능한 시간 보여주기")
    @GetMapping("/reservation/times")
    public ResponseEntity<List<Schedule>> getHospitalSchedule(
            @RequestParam String hUsername,
            @RequestParam LocalDate date) {
        System.out.println("컨트롤러 들어옴");
        List<Schedule> schedules = service.getHospitalSchedule(hUsername, date);
        System.out.println(schedules);
        if (schedules.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(schedules);
    }

    @Operation(summary = "예약 취소", description = "예약 취소 변수도 알아보자")
    @PatchMapping("/reservation/cancel")
    public ResponseEntity<String> cancelReservation(@RequestParam int rno) {
        boolean result = service.cancelReservation(rno);

        if (result) {
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

    @Operation(summary = "예약 내역 불러오기", description = "고객 예약 내역을 병원 마이 페이지에 불러오기")
    @GetMapping("/hospital/reservation/info")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Reservation>> findReservations(Principal principal) {
        List<Reservation> reservations = service.getReservations(principal.getName());
        return ResponseEntity.ok(reservations);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/hospital/reservation")
    @Operation(summary = "증상 및 추가 사항", description = "rno로 증상 및 추가 사항을 불러오기")
    public ResponseEntity<Reservation> findReservation(@RequestParam Integer rno){
        Reservation reservation= service.getReservation(rno);
        return ResponseEntity.ok(reservation);
    }

    @Operation(summary = "예약 공지 사항 읽어오기", description = "병원 이름을 입력 해서 예약 공지 사항을 입력")
    @GetMapping("reservat/on/notice")
    public ResponseEntity<String>getHospitalNotice(@RequestParam String hUsername){
        String notice = scheduleService.getNotice(hUsername);
        return ResponseEntity.ok(notice);
    }
}
