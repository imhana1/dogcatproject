package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import com.example.dogcatserver.service.*;
import com.example.dogcatserver.util.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.annotation.*;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.security.access.prepost.*;
import org.springframework.security.core.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.security.*;
import java.sql.*;
import java.util.*;
import java.sql.Clob;

@Controller
public class QnaController {

  @Autowired
  private QnaService qnaService;

  // 본인이 작성한 질문 리스트(고객)
  @GetMapping("/api/qna/my-questions")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<QnaQuestionDto.Pages> findQnaQuestionsByUsername(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize, Principal principal) {
    return ResponseEntity.ok(qnaService.findQnaQuestionsByUsername(principal.getName(), pageno, pagesize));
  }

  // 질문글 작성 (고객)
  @Operation(summary = "질문 글 작성", description = "질문 글 작성")
  @PostMapping("/api/qna/write-question")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<QnaQuestion> writeQnaQuestion( @RequestPart @Valid QnaQuestionDto.Write writeDto, @RequestPart(value = "qImage", required = false) MultipartFile qImage, BindingResult br, Principal principal) {
    String base64Image = null;
    try {
      if(qImage != null && !qImage.isEmpty()) {
        base64Image = QnaUtil.convertToBase64(qImage);
      }
      }catch(IOException e) {
      System.out.println("이미지 등록 실패: "  + e.getMessage());
    }
    QnaQuestion qnaQuestion = qnaService.writeQnaQuestion(writeDto, base64Image, principal.getName());
    System.out.println("200응답");
    return ResponseEntity.status(200).body(qnaQuestion);
  }


  // 질문 단일글 조회
  @Operation(summary = "질문 글 조회", description = "글번호로 질문 글 조회")
  @GetMapping("/api/qna/question")
  @PreAuthorize("isAuthenticated()")  // 작성자/관리자 확인하는건 서비스에서 처리했어
  public ResponseEntity<Map<String, Object>> findQnaQuestionByQnoWithAnswer(@RequestParam int qno, @AuthenticationPrincipal UserDetails userDetails) {
    Map<String, Object> question = qnaService.findQnaQuestionByQnoWithAnswer(qno, userDetails.getUsername());
    // 모든 CLOB 필드 변환  * adoption은 map을 안써서 괜찮은데 질문글은 map을 무조건 써야해
    for (Map.Entry<String, Object> entry : question.entrySet()) {
      Object value = entry.getValue();
      if (value instanceof java.sql.Clob) {
        java.sql.Clob clob = (java.sql.Clob) value;
        try {
          String str = clob.getSubString(1, (int) clob.length());
          entry.setValue(str);
        } catch (Exception e) {
          entry.setValue(null);
        }
      }
    }
    return ResponseEntity.ok(question);
  }

  // 질문 전체 리스트 조회 (관리자)
  @Operation(summary = "전체 질문 리스트 출력", description = "전체 질문 리스트 출력")
  @GetMapping("/api/qna/all-questions")
  @Secured("ROLE_ADMIN")
  public ResponseEntity<QnaQuestionDto.Pages> findAllQnaQuestion (@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize, Principal principal) {
     return ResponseEntity.ok(qnaService.findAllQnaQuestion(pageno, pagesize));
  }

  // 답변 상태에 따른 질문 리스트 조회 (관리자)
  @Operation(summary = "답변 상태에 따른 질문 리스트 출력", description = "답변 상태 선택하면 해당 상태인 질문 리스트 출력")
  @GetMapping("/api/qna/type-questions")
  @Secured("ROLE_ADMIN")
  public ResponseEntity<QnaQuestionDto.Pages> findAllQnaQuestionByIsAnswered(@RequestParam boolean qIsAnswered, @RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize) {
    return ResponseEntity.ok(qnaService.findAllQnaQuestionByIsAnswered(qIsAnswered, pageno, pagesize));
  }

  // 답변 작성 (관리자)
  @Operation(summary = "답변 작성", description = "글 번호의 질문에 대한 답변 작성")
  @PostMapping("/api/qna/write-answer")
  @Secured("ROLE_ADMIN")
  public ResponseEntity<QnaAnswer> writeQnaAnswer(@RequestBody @Valid QnaAnswerDto.Write writeDto, BindingResult br, Principal principal) {
    QnaAnswer answer = qnaService.writeQnaAnswer(writeDto, principal.getName());
    System.out.println("Logged in username: " + principal.getName()); // 로그로 확인
    return ResponseEntity.ok(answer);
  }

//  // 질문글 사진 다운로드
//  @Operation(summary = "사진 다운로드", description = "질문 글에 첨부된 사진 다운로드")
//  @GetMapping("/api/qna/downloadImg")
//  @PreAuthorize("isAuthenticated()")
//  public ResponseEntity<Resource> downloadQnaImage(@RequestParam int qno, Principal principal) {
//    return ResponseEntity.ok(qnaImageService.downloadQnaImage(qno, principal.getName()));
//  }

}
