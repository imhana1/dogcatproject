package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
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

import java.security.*;

@Controller
public class AdoptionController {
  @Autowired
  private AdoptionService adoptionService;
  @Autowired
  private WishService wishService;

  // 전체 글 목록 출력
  @Operation(summary = "전체목록 페이징", description = "기본 페이지 번호 1, 페이지 크기 10")
  @GetMapping("/api/adoptions/all-list")
  public ResponseEntity<AdoptionDto.Pages> findAllAdoption(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize) {
    return ResponseEntity.ok(adoptionService.findAllAdoption(pageno, pagesize));
  }

  // 지역별 글 목록 출력
  @Operation(summary = "지역별 목록 페이징", description = "기본 페이지 번호 1, 페이지 크기 10")
  @GetMapping("/api/adoptions/city-list")
  public ResponseEntity<AdoptionDto.Pages> findAllAdoptionByACity(@RequestParam ACity aCity, @RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize) {
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
  @PostMapping("/api/adoptions/write")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Adoption> writeAdoption(@ModelAttribute @Validated AdoptionDto.Write writeDto, @RequestParam MultipartFile aProfileImage, BindingResult br, Principal principal) {
    Adoption adoption = adoptionService.writeAdoption(writeDto, aProfileImage, principal.getName());
    return ResponseEntity.ok(adoption);
  }

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
  public ResponseEntity<Adoption> updateAdoption(@ModelAttribute @Validated AdoptionDto.Update updateDto, @RequestParam MultipartFile aProfileImage, BindingResult br, Principal principal) {
    // 로그인 아이디 = 작성자 확인하는 부분은 서비스에 있어
    Adoption adoption = adoptionService.updateAdoption(updateDto, aProfileImage, principal.getName());  //
    return ResponseEntity.ok(adoption);
  }

  // 글 삭제
  @Operation(summary = "글 삭제", description = "유기동물 게시판 글 삭제")
  @PreAuthorize("isAuthenticated()")
  @DeleteMapping("/api/adoptions/adoption")
  public ResponseEntity<String> deleteAdoptionByAno(@RequestParam int ano, Principal principal) {
    adoptionService.deleteAdoptionByAno(ano, principal.getName());
    return ResponseEntity.ok("유기동물 게시판 글 삭제가 완료되었습니다.");
  }

}
