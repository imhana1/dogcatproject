package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.format.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;

import java.security.*;
import java.time.*;
import java.util.*;

@Controller
public class ScheduleController {
    @Autowired
    private ScheduleService service;

    @GetMapping("/search")
    @Operation(summary = "시간 보기", description = "시간 보기")
    public ResponseEntity<List<ScheduleDto>> searchSchedules(
            @RequestParam String hUsername,
            @RequestParam LocalDate date,
            @RequestParam String sChoice
    ) {
        List<ScheduleDto> result = service.findSchedulesByCondition(hUsername, date, sChoice);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/hospital/notice")
    @Operation(summary = "공지사항 작성", description = "공지 사항 작성")
    public ResponseEntity<String>writeNotice(HospitalNotice dto, Principal principal){
        boolean success = service.updateNotice(principal.getName(), dto.getSNotice());
        if (success) {
            return ResponseEntity.ok("공지사항이 수정되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("해당 병원을 찾을 수 없습니다.");
        }
    }


    @GetMapping("/hospital/notice")
    @Operation(summary = "병원 공지사항 ", description = "병원 공지")
    public ResponseEntity<String> getNotice(Principal principal) {
        String notice = service.getNotice(principal.getName());
        return ResponseEntity.ok(notice);
    }

    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/schedule/dateBlock")
    @Operation(summary = "날짜 블록", description = "날짜 블록")
    public ResponseEntity<Integer> blockDate(@RequestBody ScheduleDto.ScheduleDateBlock dto, Principal principal) {
        int update = service.blockDate(principal.getName(),dto.getSChoice(), dto.getDates());
        return ResponseEntity.ok(update);  // 200 + update 숫자
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/schedule/timeBlock")
    @Operation(summary = "시간 블록", description = "시간 블록")
    public ResponseEntity<Integer> blockTimeSchedule(@RequestBody @Valid ScheduleDto.ScheduleBlock dto, BindingResult br, Principal principal) {
        int update = service.blockTime(principal.getName(), dto.getDate(), dto.getTime(), dto.getSChoice());
        return ResponseEntity.ok(update);  // 200 + update 숫자
    }






}
