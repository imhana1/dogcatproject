package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.*;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

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
    @Operation(summary = "이메일 발송", description = "이메일 발송")
    public ResponseEntity<UseMemberResponseDto> emailSend(@RequestBody UseMemberDto.UseMemberCode dto) {
        UseMember result = service.emailSending(dto);
        UseMemberResponseDto response = new UseMemberResponseDto(
                result.getUsername(),
                result.getEmail(),
                result.getStatus(),
                result.isLocked(),
                result.getSignDt()
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

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/change-password")
    @Operation(summary= "비밀번호 변경", description = "비밀번호 변경")
    public ResponseEntity<String>changePassword(@ModelAttribute  @Valid UseMemberDto.changePassword dto, Principal principal , BindingResult br) {
        boolean result = service.updatePassword(dto, principal.getName());
        if (result) {
            return ResponseEntity.ok("비밀번호 변경");
        } else {
            return ResponseEntity.status(409).body("비밀번호 변경 실패");
        }
    }

    @PutMapping("/getTemporaryPassword")
    @Operation(summary= "임시비밀번호 발급", description = "이메일로 임시 비밀번호 발급")
    public ResponseEntity<String>getTemporaryPassword(@ModelAttribute @Valid UseMemberDto.findPassword dto, BindingResult br){
        boolean result = service.getTemporaryPassword(dto);
        if(result)
            return ResponseEntity.ok("임시비밀번호를 가입 이메일로 보냈습니다");
        return ResponseEntity.status(HttpStatus.CONFLICT).body("사용자를 찾을 수 없습니다");
    }

    @GetMapping("/checkPassword")
    @Operation(summary= "비밀번호 확인", description = "비밀번호 확인")
    public ResponseEntity<String>checkPassword(@ModelAttribute @Valid UseMemberDto.CheckPassword dto, Principal principal, BindingResult br){
        boolean result = service.checkPassword(dto, principal.getName());
        if(result)
            return ResponseEntity.ok("확인 성공");
        return ResponseEntity.status(409).body("확인 실패");
    }

    @PreAuthorize("isAnonymous()")
    @GetMapping("/findUsername")
    @Operation(summary = "아이디 찾기", description = "이메일로 아이디 찾기")
    public ResponseEntity<String>findUsername(@RequestParam @Email String email){
        Optional<String> result = service.searchUsername(email);
        if(result.isPresent())
            return  ResponseEntity.ok(result.get());
        return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디를 찾을 수 없습니다");
    }


//    // 회원 탈퇴
//    @Operation(summary = "회원 탈퇴", description = "로그아웃 시킨 후 회원 탈퇴")
//    @DeleteMapping("/member/member") // url 미정
//    public ResponseEntity<String> resign(Principal principal, HttpSession session) {
//        service.resign(principal.getName());
//        session.invalidate();
//        return ResponseEntity.ok("회원 탈퇴");
//    }
}

















