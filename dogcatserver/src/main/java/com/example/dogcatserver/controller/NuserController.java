package com.example.dogcatserver.controller;


import com.example.dogcatserver.dto.NuserDto;
import com.example.dogcatserver.service.NuserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
public class NuserController {
    @Autowired
    private NuserService nuserservice;

    @PreAuthorize("isAnonymous()")
    @Operation(summary = "아이디 확인", description = "아이디 중복 확인")
    @GetMapping("/api/nmember/checknid")
    public ResponseEntity<String> checkNid(@ModelAttribute @Valid NuserDto.NidCheck dto, BindingResult br) {
        boolean result = nuserservice.checkNid(dto);
        if (result)
            return ResponseEntity.ok("사용 가능한 아이디 입니다.");
        return ResponseEntity.status(HttpStatus.CONFLICT).body("사용중인 아이디 입니다.");
    }
}
