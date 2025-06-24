package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.PetDto;
import com.example.dogcatserver.entity.Pet;
import com.example.dogcatserver.service.PetService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@Validated
public class PetController {
    @Autowired
    private PetService petService;

    @Operation(summary = "반려동물 정보 저장",description = "반려동물 정보 저장")
    @PostMapping(value = "/pet/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // consumes : 컨트롤러로 돌아오는 파일 형식 지정
    public ResponseEntity<Pet> petsave(@ModelAttribute @Valid PetDto.psave dto, BindingResult br) {
        Pet pet = petService.petsave(dto);
        System.out.println("200응답");
        return ResponseEntity.status(200).body(pet);
    }

    @Operation(summary = "반려동물 정보 보기", description = "반려동물 정보 보기")
    @GetMapping("/pet/pet")
    public ResponseEntity<PetDto.pread> petread(Principal principal) {
        PetDto.pread dto = petService.petread(principal.getName());
        return ResponseEntity.ok(dto);
    }

    // 프로필 변경
    @PutMapping("/pet/profile")
    public ResponseEntity<PetDto.pread> changepetProfile(MultipartFile petprofile, Principal principal) {
        PetDto.pread dto = petService.changepetProfile(petprofile, principal.getName());
        return ResponseEntity.status(200).body(dto);
    }

    @Operation(summary = "반려동물 정보 삭제", description = "반려동물 정보 삭제")
    @DeleteMapping("/pet/pet")
    public ResponseEntity<String> deletepet(Principal principal, HttpSession session) {
        petService.deletepet(principal.getName());
        session.invalidate();
        return ResponseEntity.ok("정보 삭제");
    }
}

























