package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

@Validated
@Controller
public class HospitalController {
    @Autowired
    private HospitalService service;

    @Autowired
    private HospitalDao hospitalDao;


    @PostMapping("/signup")
    @Operation(summary = "병원 회원가입", description = "회원가입 확인")
    public ResponseEntity<SignupDto> signup(@RequestBody SignupDto.SignupRequestDto dto) {
        SignupDto result = service.signup(dto);
        return ResponseEntity.status(200).body(result);
    }


}
