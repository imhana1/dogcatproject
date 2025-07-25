package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.WishDao;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.service.NuserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.security.*;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.validation.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@Validated
public class   NuserController {
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
    @GetMapping("/nuser-mypage")
    public ResponseEntity<JoinViewInfoDto.NuserInfo> read(Principal principal) {
        JoinViewInfoDto.NuserInfo dto = nuserservice.Read(principal.getName());
        System.out.println(dto);
        return ResponseEntity.ok(dto);

    }

    // 수정 (재호)
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "일반 회원 정보 변경", description = "일반 회원 정보 변경")
    @PutMapping("/nuser/profile")
    public ResponseEntity<JoinViewInfoDto.NuserInfo> changenInfo (
            @RequestPart("dto") @Valid JoinViewInfoDto.NuserInfoChange dto,
            @RequestPart("uDto") @Valid UseMemberDto.UsernameCheck uDto, BindingResult br,
            Principal principal) {

        JoinViewInfoDto.NuserInfo nInfo = nuserservice.ChangeInfo(dto, uDto.getUsername());
        return ResponseEntity.ok(nInfo);
    }

    @Operation(summary = "회원 탈퇴", description = "로그아웃 시킨 후 회원 탈퇴")
    @DeleteMapping("/nuser/delete") // url 미정
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

    @Operation(summary = "위치 정보 조회", description = "로그인한 회원 위치 정보 조회")
    @GetMapping("/api/nuser/location")
    // 어떤 응답이든 리턴할 수 있게 ? 로 처리
    public ResponseEntity<?> getUserLocation(Principal principal) {

        String loginId = principal.getName();

        return nuserservice.getUserLocation(loginId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.noContent().build());
    }
}









































