package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
public class NMemberManageController {
  @Autowired
  private NMemberManageService manageService;

  // 전체 목록 출력
  @Operation(summary = "전체 목록 출력", description = "전체 회원 목록 출력")
  @GetMapping("/api/n-members/list")
  public ResponseEntity<NMemberManageDto.Pages> findAllNormalMember(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "20") int pagesize) {
    return ResponseEntity.ok(manageService.findAllNormalMember(pageno, pagesize));
  }

  // 상태에 따른 목록 출력
  @Operation(summary = "상태에 따른 목록 출력", description = "선택한 상태에 따른 회원 목록 출력")
  @GetMapping("/api/n-members/status-list")
  public ResponseEntity<NMemberManageDto.Pages> findAllNormalMemberByStatus(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "20") int pagesize, @RequestParam Status status) {
    return ResponseEntity.ok(manageService.findAllNormalMemberByStatus(pageno, pagesize, status));
  }

  // 검색에 따른 목록 출력
  @Operation(summary = "검색에 따른 목록 출력", description = "검색한 결과에 따른 회원 목록 출력")
  @GetMapping("/api/n-members/search-list")
  public ResponseEntity<NMemberManageDto.Pages> findNormalMemberByWord(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "20") int pagesize, @RequestParam String searchWord, @RequestParam String searchType) {
    return ResponseEntity.ok(manageService.findNormalMemberByWord(pageno, pagesize, searchWord, searchType));
  }

  // 회원 상세보기
  @Operation(summary = "회원 상세보기", description = "단일 회원 상세정보 출력")
  @GetMapping("/api/n-members/n-member")
  public ResponseEntity<NMemberManageDto.NormalMemberDetails> findNormalMemberByUsername(@RequestParam String username) {
    return ResponseEntity.ok(manageService.findNormalMemberByUsername(username));
  }


  // 경고횟수 1회 증가
  @Operation(summary = "경고횟수 1회 증가", description = "경고횟수 1회 증가 후 결과 저장")
  @GetMapping("/api/n-members/inc")
  public ResponseEntity<NMemberManageDto.NormalMemberDetails> incWarningCount(@RequestParam String username) {
    return ResponseEntity.ok(manageService.incWarningCount(username));
  }


  // 경고횟수 1회 감소
  @Operation(summary = "경고횟수 1회 감소", description = "경고횟수 1회 증가 후 감소 저장")
  @GetMapping("/api/n-members/dec")  // 주소가 /dec/dec로 되어잇어서 수정
  public ResponseEntity<NMemberManageDto.NormalMemberDetails> decWarningCount(@RequestParam String username) {
    return ResponseEntity.ok(manageService.decWarningCount(username));
  }

  // 차단
  @Operation(summary = "차단", description = "차단을 true로 변경")
  @GetMapping("/api/n-members/block-on")
  public ResponseEntity<NMemberManageDto.NormalMemberDetails> blockOn(@RequestParam String username) {
    return ResponseEntity.ok(manageService.blockOn(username));
  }

  // 차단 해제
  @Operation(summary = "차단 해제", description = "차단을 false로 변경")
  @GetMapping("/api/n-members/block-off")
  public ResponseEntity<NMemberManageDto.NormalMemberDetails> blockOff(@RequestParam String username) {
    return ResponseEntity.ok(manageService.blockOff(username));
  }

}
