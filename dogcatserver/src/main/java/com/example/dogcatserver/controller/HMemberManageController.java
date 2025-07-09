package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
public class HMemberManageController {
  @Autowired
  private HMemberManageService manageService;

  // 전체 목록 출력
  @Operation(summary = "전체 목록 출력", description = "전체 회원 목록 출력")
  @GetMapping("/api/h-members/list")
  public ResponseEntity<HMemberManageDto.Pages> findAllHospitalMember(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "20") int pagesize) {
    return ResponseEntity.ok(manageService.findAllHospitalMember(pageno, pagesize));
  }

  // 상태에 따른 목록 출력
  @Operation(summary = "상태에 따른 목록 출력", description = "선택한 상태에 따른 회원 목록 출력")
  @GetMapping("/api/h-members/status-list")
  public ResponseEntity<HMemberManageDto.Pages> findAllHospitalMemberByStatus(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "20") int pagesize, @RequestParam String status) {
    return ResponseEntity.ok(manageService.findAllHospitalMemberByStatus(pageno, pagesize, status));
  }

  // 검색에 따른 목록 출력
  @Operation(summary = "검색에 따른 목록 출력", description = "검색한 결과에 따른 회원 목록 출력")
  @GetMapping("/api/h-members/search-list")
  public ResponseEntity<HMemberManageDto.Pages> findHospitalMemberByWord(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "20") int pagesize, @RequestParam String searchWord, @RequestParam String searchType) {
    return ResponseEntity.ok(manageService.findHospitalMemberByWord(pageno, pagesize, searchWord, searchType));
  }

  // 회원 상세보기
  @Operation(summary = "회원 상세보기", description = "단일 회원 상세정보 출력")
  @GetMapping("/api/h-members/h-member")
  public ResponseEntity<HMemberManageDto.HospitalMemberDetails> findHospitalMemberByUsername(@RequestParam String username) {
    return ResponseEntity.ok(manageService.findHospitalMemberByUsername(username));
  }


  // 경고횟수 1회 증가
  @Operation(summary = "경고횟수 1회 증가", description = "경고횟수 1회 증가 후 결과 저장")
  @GetMapping("/api/h-members/inc")
  public ResponseEntity<HMemberManageDto.HospitalMemberDetails> incWarningCount(@RequestParam String username) {
    return ResponseEntity.ok(manageService.incWarningCount(username));
  }


  // 경고횟수 1회 감소
  @Operation(summary = "경고횟수 1회 감소", description = "경고횟수 1회 증가 후 감소 저장")
  @GetMapping("/api/h-members/dec/dec")
  public ResponseEntity<HMemberManageDto.HospitalMemberDetails> decWarningCount(@RequestParam String username) {
    return ResponseEntity.ok(manageService.decWarningCount(username));
  }

  // 차단
  @Operation(summary = "차단", description = "차단을 true로 변경")
  @GetMapping("/api/h-members/block-on")
  public ResponseEntity<HMemberManageDto.HospitalMemberDetails> blockOn(@RequestParam String username) {
    return ResponseEntity.ok(manageService.blockOn(username));
  }

  // 차단 해제
  @Operation(summary = "차단 해제", description = "차단을 false로 변경")
  @GetMapping("/api/h-members/block-off")
  public ResponseEntity<HMemberManageDto.HospitalMemberDetails> blockOff(@RequestParam String username) {
    return ResponseEntity.ok(manageService.blockOff(username));
  }

}
