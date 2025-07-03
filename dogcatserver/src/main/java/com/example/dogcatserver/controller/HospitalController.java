package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import com.example.dogcatserver.util.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.servlet.http.*;
import jakarta.validation.*;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.security.*;
import java.util.*;

@Validated
@Controller
public class HospitalController {


    @Autowired
    private HospitalService service;

    @Autowired
    private HospitalDao hospitalDao;

    @Autowired
    private TreatService treatService;


    // 디폴트 값으로 지정된 정보를 뺀  나머지 정보만 입력하도록 수정
    @PostMapping("/hospital/signup")
    @Operation(summary = "병원 회원가입", description = "회원가입 확인")
    public ResponseEntity<SignUpResponse.HospitalResponse> signup(@RequestBody SignupDto.SignupRequestDto dto) {
        System.out.println("Received DTO: " + dto);
        if (dto == null || dto.getUseMember() == null || dto.getHospital() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        SignUpResponse.HospitalResponse result = service.signup(dto);
        return ResponseEntity.status(200).body(result);
    }

    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "내 정보 보기", description = "내 정보 보기")
    @GetMapping("/hospital")
    public ResponseEntity<JoinViewInfoDto.HospitalInfo>read(Principal principal){
        JoinViewInfoDto.HospitalInfo dto = service.Read(principal.getName());
        return ResponseEntity.ok(dto);
    }


    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "정보 변경", description = "내 정보를 변경")
    @PostMapping(value = "/hospital/change")
    public ResponseEntity<HospitalInfoChangeResponse> changeInfo(
            @RequestPart("dto") @Valid JoinViewInfoDto.HospitalInfoChange dto,
            @RequestPart(value = "hProfile", required = false) MultipartFile hProfile,
            @RequestPart(value = "dProfile", required = false) MultipartFile dProfile
    ) {
        String base64HImage = "";
        String base64DImage = "";

        try {
            if (hProfile != null && !hProfile.isEmpty()) {
                base64HImage = ProfileUtil.convertToBase64(hProfile);
            }
            if (dProfile != null && !dProfile.isEmpty()) {
                base64DImage = ProfileUtil.convertToBase64(dProfile);
            }
        } catch (IOException e) {
            // 로깅이나 적절한 예외처리 권장
            System.out.println("프로필 이미지 변환 실패: " + e.getMessage());
        }

        HospitalInfoChangeResponse response = service.ChangeInfo(dto, base64HImage, base64DImage);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/hospital/location")
    @Operation(summary = "좌표", description = "주소로 좌표 불러오기")
    public ResponseEntity<LocationResult> getLocation(@RequestBody LocationAddress dto) {
        LocationResult result = service.findloaction(dto.getHAddress());
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/hospital/treat")
    @Operation(summary = "진료내역 작성", description = "진료내열 작성")
    public ResponseEntity<Treat>hospitalTreat( @Valid @RequestBody TreatDto.create dto, Principal principal, BindingResult br){
        Treat treat = treatService.Write(dto, principal.getName());
        return ResponseEntity.ok(treat);
    }

    @GetMapping("/hospital/tread-read")
    @Operation(summary = "진료내역 읽기", description = "진료내열 읽기")
    public ResponseEntity<Treat> treatRead(@RequestParam Integer rno){
        Treat treat = treatService.read(rno);
        return ResponseEntity.ok(treat);
    }





//    @PostMapping("/aa")
//    public ResponseEntity<Aa>multipartTest(Aa a){
//        System.out.println(a.getDProfile().getOriginalFilename());
//        return  ResponseEntity.ok(null);
//    }
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "병원 회원 탈퇴", description = "병원 회원 탈퇴")
    @DeleteMapping("/hospital/delete")
    public ResponseEntity<String> delete(Principal principal, HttpSession session){
        service.resign(principal.getName());
        session.invalidate();
        return ResponseEntity.ok("회원 탈퇴 완료");
    }

}
