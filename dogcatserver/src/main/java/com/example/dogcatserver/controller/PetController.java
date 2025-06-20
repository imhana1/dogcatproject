//package com.example.dogcatserver.controller;
//
//import com.example.dogcatserver.dto.PetDto;
//import com.example.dogcatserver.service.PetService;
//import io.swagger.v3.oas.annotations.Operation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.security.Principal;
//
//@RestController
//@Validated
//public class PetController {
//    @Autowired
//    private PetService petservice;
//
//    @PreAuthorize("isAuthenticated()")
//    @Operation(summary = "반려동물 정보 보기", description = "정보 보기")
//    @GetMapping("/api/pet/pread")
//    public ResponseEntity<PetDto.Pread> pread(Principal principal) {
////        PetDto.Pread dto = petservice.Pread(principal.getpName());
////        return ResponseEntity.ok(dto);
//    }
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
