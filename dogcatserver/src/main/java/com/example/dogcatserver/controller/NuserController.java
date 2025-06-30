package com.example.dogcatserver.controller;


import com.example.dogcatserver.dao.AdoptionDao;
import com.example.dogcatserver.dao.NuserDao;
import com.example.dogcatserver.dao.PetDao;
import com.example.dogcatserver.dao.WishDao;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.Adoption;
import com.example.dogcatserver.entity.Pet;
import com.example.dogcatserver.entity.Wish;
import com.example.dogcatserver.service.NuserService;
import com.example.dogcatserver.service.PetService;
import com.example.dogcatserver.util.AdoptionUtil;
import com.example.dogcatserver.util.WishUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@Validated
public class NuserController {
    @Autowired
    private NuserService nuserservice;

    @Autowired
    private WishDao wishDao;

    @Operation(summary = "일반 회원 회원가입", description = "회원가입 확인")
    @PostMapping(value = "/nmembersignup")
    public ResponseEntity<SignUpResponse.NormalResponse> signup (@RequestBody SignupNdto.SignupRequestDto dto) {
        SignUpResponse.NormalResponse result = nuserservice.nsignup(dto);
        System.out.println("200 응답");
        return ResponseEntity.status(200).body(result);
    }

    @Operation(summary = "내 정보 보기", description = "일반 회원 내정보 보기")
    @GetMapping("/nuser")
    public ResponseEntity<JoinViewInfoDto.NuserInfo> read(@ModelAttribute UseMemberDto.UsernameCheck uDto) {
        JoinViewInfoDto.NuserInfo dto = nuserservice.Read(uDto.getUsername());
        return ResponseEntity.ok(dto);
    }

    @Operation(summary = "일반 회원 정보 변경", description = "일반 회원 정보 변경")
    @PutMapping("/nuser/profile")
    public ResponseEntity<JoinViewInfoDto.NuserInfo> changenInfo (
            @RequestPart("dto") @Valid JoinViewInfoDto.NuserInfoChange dto,
            @RequestPart("uDto") @Valid UseMemberDto.UsernameCheck uDto) {

        JoinViewInfoDto.NuserInfo nInfo = nuserservice.ChangeInfo(dto, uDto.getUsername());
        return ResponseEntity.ok(nInfo);
    }

    @Operation(summary = "회원 탈퇴", description = "로그아웃 시킨 후 회원 탈퇴")
    @DeleteMapping("/nuser/nuser") // url 미정
    public ResponseEntity<String> nresign(Principal principal, HttpSession session) {
        nuserservice.nresign(principal.getName());
        session.invalidate();
        return ResponseEntity.ok("회원 탈퇴");
    }


    @Operation(summary = "유기동물 관심 목록", description = "유기동물 관심 목록")
    @PutMapping("/nuser/adoption")
    public ResponseEntity<WishDto.WishPages> findAllAdoptionLikelist(int pageno, int pagesize, Principal principal) {
        return ResponseEntity.ok(nuserservice.AdoptionLikelist(pageno, pagesize, principal.getName()));
    }
}









































