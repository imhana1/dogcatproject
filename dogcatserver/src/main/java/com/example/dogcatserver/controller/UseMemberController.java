package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class UseMemberController {
    @Autowired
    private UserMemberService service;
    @Autowired
    private UseMemberDao memberDao;


    @GetMapping("/api/hospital/check-username")
    @Operation(summary = "아이디 확인", description = "아이디가 사용가능한지 확인")
    public ResponseEntity<String> checkUsername(@ModelAttribute @Valid UseMemberDto.UsernameCheck dto, BindingResult br){
        boolean result = service.checkUsername(dto);
        if(result)
            return  ResponseEntity.ok("사용가능합니다");
        return ResponseEntity.status(HttpStatus.CONFLICT).body("사용중인 아이디입니다");
    }

    @PostMapping("/email-send")
    public ResponseEntity<UseMemberResponseDto> emailSend(@RequestBody UseMemberDto.UseMemberCode dto) {
        UseMember result = service.emailSending(dto);
        UseMemberResponseDto response = new UseMemberResponseDto(
                result.getUsername(),
                result.getEmail(),
                result.getStatus(),
                result.isLocked()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/email-check")
    @Operation(summary = "이메일인증", description = "이메일 인증 확인")
    public ResponseEntity<String> emailcheck(@ModelAttribute UseMemberDto.checkCode dto){
        String code= dto.getCode();
        String username = memberDao.findUsernameByCode(code);
        boolean result = service.checkEmail(dto);
        if(result){
            service.islockchange(dto);
            return ResponseEntity.ok(username);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("인증 실패했습니다");
    }

    // 회원 탈퇴
    @Operation(summary = "회원 탈퇴", description = "로그아웃 시킨 후 회원 탈퇴")
    @DeleteMapping("/member/member") // url 미정
    public ResponseEntity<String> resign(Principal principal, HttpSession session) {
        service.resign(principal.getName());
        session.invalidate();
        return ResponseEntity.ok("회원 탈퇴");
    }
}

















