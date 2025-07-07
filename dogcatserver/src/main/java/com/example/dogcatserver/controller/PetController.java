package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.PetDto;
import com.example.dogcatserver.entity.Pet;
import com.example.dogcatserver.service.PetService;
import com.example.dogcatserver.util.ProfileUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@Validated
public class PetController {
    @Autowired
    private PetService petService;

    @Operation(summary = "반려동물 정보 저장",description = "반려동물 정보 저장")
    @PostMapping(value = "/nuser-petsave")
    public ResponseEntity<Pet> petsave( @RequestPart("pprof")  MultipartFile pprof) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nid = authentication.getName();  // 로그인한 사용자 이름(아이디) 가져오기
        System.out.println(pprof);
//        dto.setNid(nid);
//        System.out.println(dto);
//        MultipartFile pprof = dto.getPprof();
//        String base64Image = "";
//        try {
//            if(pprof != null && !pprof.isEmpty()) {
//                base64Image = ProfileUtil.convertToBase64(pprof);
//            }
//        } catch (IOException e) {
//            System.out.println("프로필 이미지 변환 실패: " + e.getMessage());
//        }
//        Pet pet = petService.petsave(dto, base64Image);
        System.out.println("200응답");
        return ResponseEntity.status(200).body(null);
    }

    @Operation(summary = "반려동물 정보 보기", description = "반려동물 정보 보기")
    @GetMapping("/nuser-petchange")
    public ResponseEntity<PetDto.pread> petread(Principal principal) {
        PetDto.pread dto = petService.petread(principal.getName());
        return ResponseEntity.ok(dto);
    }

    // 프로필 변경
    @PutMapping("/nuser-petchange")
    public ResponseEntity<PetDto.pread> changepetProfile(MultipartFile petprofile, Principal principal) {
        PetDto.pread dto = petService.changepetProfile(petprofile, principal.getName());
        return ResponseEntity.status(200).body(dto);
    }

    @Operation(summary = "반려동물 정보 삭제", description = "반려동물 정보 삭제")
    @DeleteMapping("/nuser-petchange")
    public ResponseEntity<String> deletepet(Principal principal, HttpSession session) {
        petService.deletepet(principal.getName());
        session.invalidate();
        return ResponseEntity.ok("정보 삭제");
    }
}

























