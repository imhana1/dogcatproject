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
import java.util.List;

@RestController
@Validated
public class PetController {
    @Autowired
    private PetService petService;

    @Operation(summary = "반려동물 정보 저장",description = "반려동물 정보 저장")
    @PostMapping(value = "/nuser-petsave")
    public ResponseEntity<Pet> petsave(@RequestPart PetDto.psave dto, BindingResult br,
                                       @RequestPart(value = "pprof", required = false) MultipartFile pprof) {

        String base64Image = "";
        try {
            if(pprof != null && !pprof.isEmpty()) {
                base64Image = ProfileUtil.convertToBase64(pprof);
            }
        } catch (IOException e) {
            System.out.println("프로필 이미지 변환 실패: " + e.getMessage());
        }
        Pet pet = petService.petsave(dto, base64Image);
        System.out.println("200응답");
        return ResponseEntity.status(200).body(pet);
    }

    @Operation(summary = "반려동물 정보 보기", description = "반려동물 정보 보기")
    @GetMapping("/nuser-pet")
    public ResponseEntity<List<PetDto.pread>> petread(Principal principal) {
        List<PetDto.pread> dto = petService.petread(principal.getName());
        return ResponseEntity.ok(dto);
    }

    @Operation(summary = "정보 변경", description = "펫 정보 변경")
    @PostMapping("/nuser-petchange")
    public ResponseEntity<PetDto.pread> changepet (@RequestPart("dto") PetDto.petchange dto,
                                                   @RequestPart(value = "pprof", required = false) MultipartFile pprof,
                                                   Principal principal) {
        String base64Image = "";
        try {
            if (pprof != null && !pprof.isEmpty()) {
                base64Image = ProfileUtil.convertToBase64(pprof);
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }

        dto.setNid(principal.getName());
        PetDto.pread updated = petService.updatePet(dto, base64Image);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "반려동물 정보 삭제", description = "반려동물 정보 삭제")
    @DeleteMapping("/nuser-pet/{pno}")
    public ResponseEntity<String> deletepet(Principal principal) {
        petService.deletepet(principal.getName());
        return ResponseEntity.ok("정보 삭제");
    }
}

























