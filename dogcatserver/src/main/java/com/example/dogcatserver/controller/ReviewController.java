package com.example.dogcatserver.controller;

import ch.qos.logback.core.model.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import jakarta.validation.constraints.*;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;

import java.security.*;
import java.util.*;

@Controller

public class ReviewController {
    @Autowired
    private ReviewService service;


    @Operation(summary = "페이징", description = "기본 페이지 1, 페이지 크기 10으로 페이징")
    @GetMapping("/review")
    public ResponseEntity<ReviewDto.pages> findAll(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize){
        return ResponseEntity.ok(service.findAll(pageno, pagesize));
    }


    @PostMapping("/review/new")
//    @Secured("ROLE_USER")
    @Operation(summary = "리뷰작성 ", description = "리뷰 작성")
   // 유연한 제네릭 타입으로 예외 메시지 명확히 전달
    public ResponseEntity<?>write(@ModelAttribute @Valid ReviewDto.write dto, BindingResult bindingResult, Principal principal) {
        try {
            Review review = service.RevWrite(dto, principal.getName());
            return ResponseEntity.ok(review);
        }// 예약 번호가 없을 때  예외 처리
        catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", ex.getMessage()));
        }
    }

    @GetMapping("/review/review")
    @Operation(summary = "리뷰 읽기", description = "리뷰 읽기")
    public ResponseEntity<Review>Read(int revNo){
        return ResponseEntity.ok(service.read(revNo));
    }

    @Secured("Role_USER")
    @PutMapping("/review/update")
    @Operation(summary = "리뷰 내용 변경", description = "리뷰번호로 리뷰 내용 변경")
    public ResponseEntity<String> update(@ModelAttribute @Valid ReviewDto.update dto, BindingResult br, Principal principal){
        service.update(dto, principal.getName());
        return ResponseEntity.ok("리뷰 내용을 변경했습니다");
    }
    @Secured("ROLE_USER")
    @DeleteMapping("/review/delete")
    @Operation(summary = "리뷰 삭제", description = "리뷰번호로 리뷰 삭제")
    public ResponseEntity<String> delete(@RequestParam @NotNull Integer revNo,BindingResult br, Principal principal){
        service.delete(revNo, principal.getName());
        return ResponseEntity.ok("리뷰를 삭제 했습니다");
    }
}
