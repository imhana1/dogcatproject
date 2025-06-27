package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
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

import java.security.*;
import java.util.*;

@Controller
public class QnaController {

  @Autowired
  private QnaService qnaService;
  @Autowired
  private QnaImageService qnaImageService;

  // 본인이 작성한 질문 리스트(고객)
  @GetMapping("/api/qna/my-questions")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<QnaQuestionDto.Pages> findQnaQuestionsByUsername(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize, Principal principal) {
    return ResponseEntity.ok(qnaService.findQnaQuestionsByUsername(pageno, pagesize, principal.getName()));
  }

  // 질문글 작성 (고객)
  @Operation(summary = "질문 글 작성", description = "질문 글 작성")
  @PostMapping("/api/qna/write-question")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<QnaQuestion> writeQnaQuestion( @RequestParam String qTitle,
                                                       @RequestParam String qContent,
                                                       @RequestParam(value = "qImage", required = false) MultipartFile qnaImage,
                                                       Principal principal) {
    // 이미지 저장 및 파일명 세팅
    String savedFileName = null;
    if (qnaImage != null && !qnaImage.isEmpty()) {
      savedFileName = qnaImageService.saveQnaImage(qnaImage);
    }

// QnaQuestion 생성 시 이미지 파일명 포함
    QnaQuestion qnaQuestion = QnaQuestion.builder()
        .qTitle(qTitle)
        .qContent(qContent)
        .username(principal.getName())
        .qImage(savedFileName)  // ← null 또는 파일명
        .build();

// DB 저장
    QnaQuestion writeQuestion = qnaService.writeQnaQuestion(qnaQuestion);

    return ResponseEntity.ok(writeQuestion);
  }

  // 질문 단일글 조회
  @Operation(summary = "질문 글 조회", description = "글번호로 질문 글 조회")
  @GetMapping("/api/qna/question")
  @PreAuthorize("isAuthenticated()")  // 작성자/관리자 확인하는건 서비스에서 처리했어
  public ResponseEntity<Map<String, Object>> findQnaQuestionByQnoWithAnswer(@RequestParam int qno, @AuthenticationPrincipal UserDetails userDetails) {
    Map<String, Object> question = qnaService.findQnaQuestionByQnoWithAnswer(qno, userDetails.getUsername());
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
  public ResponseEntity<QnaAnswer> writeQnaAnswer(@RequestParam int qno, @RequestParam String answerContent, Principal principal) {
    QnaAnswer answer = qnaService.writeQnaAnswer(qno, answerContent, principal.getName());
    System.out.println("Logged in username: " + principal.getName()); // 로그로 확인
    return ResponseEntity.ok(answer);
  }

  // 질문글 사진 다운로드
  @Operation(summary = "사진 다운로드", description = "질문 글에 첨부된 사진 다운로드")
  @GetMapping("/api/qna/downloadImg")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Resource> downloadQnaImage(@RequestParam int qno, Principal principal) {
    return ResponseEntity.ok(qnaImageService.downloadQnaImage(qno, principal.getName()));
  }

}
