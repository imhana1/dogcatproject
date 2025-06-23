package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

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
}
