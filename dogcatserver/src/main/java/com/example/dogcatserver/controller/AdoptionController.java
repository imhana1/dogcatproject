package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import com.example.dogcatserver.util.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import org.apache.ibatis.annotations.*;
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

@Controller
public class AdoptionController {
  @Autowired
  private AdoptionService adoptionService;
  @Autowired
  private WishService wishService;

  // 전체 글 목록 출력
  @Operation(summary = "전체목록 페이징", description = "기본 페이지 번호 1, 페이지 크기 12")
  @GetMapping("/api/adoptions/all-list")
  public ResponseEntity<AdoptionDto.Pages> findAllAdoption(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "12") int pagesize) {
    return ResponseEntity.ok(adoptionService.findAllAdoption(pageno, pagesize));
  }

  // 지역별 글 목록 출력
  @Operation(summary = "지역별 목록 페이징", description = "기본 페이지 번호 1, 페이지 크기 12")
  @GetMapping("/api/adoptions/city-list")
  public ResponseEntity<AdoptionDto.Pages> findAllAdoptionByACity(@RequestParam ACity aCity, @RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "12") int pagesize) {
    return ResponseEntity.ok(adoptionService.findAllAdoptionByACity(aCity, pageno, pagesize));
  }

  // 관심 등록 + 관심 취소
  @Operation(summary = "관심 등록/취소", description = "관심 등록을 하지 않았으면 등록, 관심 등록을 이미 했으면 등록을 취소")
  @PreAuthorize("isAuthenticated()")  // 로그인 한 회원만 가능하게
  @PostMapping("/api/adoptions/wish")
  public ResponseEntity<Integer> addOrRemoveWish(@RequestParam int ano, Principal principal) {
    return ResponseEntity.ok(wishService.addOrRemoveWish(ano, principal.getName()));
  }

  // 글 작성
  @Operation(summary = "글 작성", description = "관심 등록을 하지 않았으면 등록, 관심 등록을 이미 했으면 등록을 취소")
  @PostMapping(value = "/api/adoptions/write")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Adoption> writeAdoption(@RequestPart @Valid AdoptionDto.Write writeDto, @RequestPart(value = "aProfile") MultipartFile aProfile, BindingResult br, Principal principal) {
    String base64Image = "";
    try {
      if(aProfile != null && !aProfile.isEmpty()) {
        base64Image = Adoption2Util.convertToBase64(aProfile);
      }
    } catch (IOException e) {
      System.out.println("프로필 이미지 변환 실패: " + e.getMessage());
    }
    Adoption adoption = adoptionService.writeAdoption(writeDto, base64Image, principal.getName());
    System.out.println("200응답");
    return ResponseEntity.status(200).body(adoption);
  }

////   글 작성 테스트끝
//  @Operation(summary = "글 작성", description = "관심 등록을 하지 않았으면 등록, 관심 등록을 이미 했으면 등록을 취소")
//  @PostMapping(value = "/api/adoptions/writeTest")
//  public ResponseEntity<Adoption> writeAdoptionTest(@RequestPart @Valid AdoptionDto.WriteTest writeDto, @RequestPart(value = "aProfile") MultipartFile aProfile, BindingResult br, Principal principal) {
//    String base64Image = "";
//    try {
//      if(aProfile != null && !aProfile.isEmpty()) {
//        base64Image = Adoption2Util.convertToBase64(aProfile);
//      }
//    } catch (IOException e) {
//      System.out.println("프로필 이미지 변환 실패: " + e.getMessage());
//    }
//    Adoption adoption = adoptionService.writeAdoptionTest(writeDto, base64Image);
//    System.out.println("200응답");
//    return ResponseEntity.status(200).body(adoption);
//  }


  // 글 읽기
  @Operation(summary = "글 읽기", description = "단일 글 출력")
  @GetMapping("/api/adoptions/adoption")
  public ResponseEntity<Adoption> findAdoptionByAno(@RequestParam int ano, Principal principal) {
    String loginId = principal == null? null : principal.getName();  // null이면 null, 아니면 getName()
    return ResponseEntity.ok(adoptionService.findAdoptionByAno(ano, loginId));
  }

  // 글 수정
  @Operation(summary = "글 수정", description = "유기동물 게시판 글 수정")
  @PreAuthorize("isAuthenticated()")
  @PutMapping("/api/adoptions/adoption")
  public ResponseEntity<Adoption> updateAdoption(@RequestPart @Valid AdoptionDto.Update updateDto, @RequestPart(value = "aProfile", required = false) MultipartFile aProfile, BindingResult br, Principal principal) {
    // 로그인 아이디 = 작성자 확인하는 부분은 서비스에 있어
    String loginId = principal.getName();
    Adoption existingAdoption = adoptionService.findAdoptionByAno(updateDto.getAno(), principal.getName());
    String base64Image = existingAdoption.getAProfile();
    try {
      if(aProfile != null && !aProfile.isEmpty()) {
        base64Image = Adoption2Util.convertToBase64(aProfile);
      }
    } catch (IOException e) {
      System.out.println("프로필 이미지 변환 실패: " + e.getMessage());
    }
    Adoption adoption = adoptionService.updateAdoption(updateDto, base64Image, principal.getName());
    System.out.println("200응답");
    return ResponseEntity.status(200).body(adoption);
  }

  // 글 삭제
  @Operation(summary = "글 삭제", description = "유기동물 게시판 글 삭제")
  @PreAuthorize("isAuthenticated()")
  @DeleteMapping("/api/adoptions/adoption")
  public ResponseEntity<String> deleteAdoptionByAno(@RequestParam int ano, Principal principal) {
    adoptionService.deleteAdoptionByAno(ano, principal.getName());
    return ResponseEntity.ok("유기동물 게시판 글 삭제가 완료되었습니다.");
  }

  // 찜 등록한 상태인지 아닌지 리턴 (∵프론트 로딩할 때 찜 유무에 따라 버튼 이미지 달라져)
  @Operation(summary = "찜 유무 확인", description = "로그인한 사용자가 해당 글을 찜한 상태인지 확인")
  @PreAuthorize("isAuthenticated()")
  @GetMapping("/api/adoptions/check-wish")
  public ResponseEntity<Boolean> checkIsWished(@RequestParam int ano, Principal principal) {
    String loginId = principal.getName();
    boolean isWished = wishService.checkIsWished(ano, loginId);
    return ResponseEntity.ok(isWished);
  }

}
