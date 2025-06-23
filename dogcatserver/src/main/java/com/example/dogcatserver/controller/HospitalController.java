package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;

@Validated
@Controller
public class HospitalController {

    @Autowired
    private HospitalService service;

    @Autowired
    private HospitalDao hospitalDao;


    @PostMapping("/hospital/signup")
    @Operation(summary = "병원 회원가입", description = "회원가입 확인")
    public ResponseEntity<SignupDto> signup(@RequestBody SignupDto.SignupRequestDto dto) {
        System.out.println("Received DTO: " + dto);
        if (dto == null || dto.getUseMember() == null || dto.getHospital() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        SignupDto result = service.signup(dto);
        return ResponseEntity.status(200).body(result);
    }

    @Operation(summary = "내 정보 보기", description = "내 정보 보기")
    @GetMapping("/hospital")
    public ResponseEntity<JoinViewInfoDto.HospitalInfo>read(@ModelAttribute UseMemberDto.UsernameCheck uDto){
        JoinViewInfoDto.HospitalInfo dto = service.Read(uDto.getUsername());
        return ResponseEntity.ok(dto);
    }


    @Operation(summary = "정보 변경", description = "내 정보를 변경")
    @PutMapping("/hospital/profile")
    public ResponseEntity<JoinViewInfoDto.HospitalInfoChange> changeInfo(
            @RequestPart("dto") @Valid JoinViewInfoDto.HospitalInfoChange dto,
            @RequestPart("uDto") @Valid UseMemberDto.UsernameCheck uDto,
            @RequestPart(value = "hProfile", required = false) MultipartFile hProfile,
            @RequestPart(value = "dProfile", required = false) MultipartFile dProfile) {

        JoinViewInfoDto.HospitalInfoChange hInfo = service.ChangeInfo(dto, hProfile,dProfile, uDto.getUsername());
        return ResponseEntity.ok(hInfo);
    }

}
