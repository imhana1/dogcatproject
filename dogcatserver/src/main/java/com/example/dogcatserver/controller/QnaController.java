package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import jakarta.annotation.*;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.security.access.prepost.*;
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
  @PostMapping("/api/qna/write-question")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<QnaQuestion> writeQnaQuestion(@ModelAttribute @Validated QnaQuestion qnaQuestion, BindingResult br, Principal principal, @RequestParam(value = "q_image", required = false) MultipartFile qnaImage) {
    String loginId = principal.getName();
    QnaQuestion writeQuestion = qnaService.writeQnaQuestion(qnaQuestion, qnaImage);  // 글 저장
    return ResponseEntity.ok(writeQuestion);
  }

  // 질문 단일글 조회
  @GetMapping("/api/qna/question")
  @PreAuthorize("isAuthenticated()")  // 작성자/관리자 확인하는건 서비스에서 처리했어
  public ResponseEntity<Map<String, Object>> findQnaQuestionByQnoWithAnswer(@RequestParam int qno, Principal principal) {
    Map<String, Object> question = qnaService.findQnaQuestionByQnoWithAnswer(qno, principal.getName());
    return ResponseEntity.ok(question);
  }

  // 질문 전체 리스트 조회 (관리자)
  @GetMapping("/api/qna/all-questions")
  @Secured("ROLE_ADMIN")
  public ResponseEntity<QnaQuestionDto.Pages> findAllQnaQuestion (@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize, Principal principal) {
     return ResponseEntity.ok(qnaService.findAllQnaQuestion(pageno, pagesize));
  }

  // 답변 작성 (관리자)
  @PostMapping("/api/qna/write-answer")
  @Secured("ROLE_ADMIN")
  public ResponseEntity<QnaAnswer> writeQnaAnswer(@RequestParam @Validated int qno, @RequestParam String answerContent, BindingResult br, Principal principal) {
    QnaAnswer answer = qnaService.writeQnaAnswer(qno, principal.getName(), answerContent);
    return ResponseEntity.ok(answer);
  }

  // 질문글 사진 다운로드
  @GetMapping("/api/qna/downloadImg")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Resource> downloadQnaImage(@RequestParam int qno, Principal principal) {
    return ResponseEntity.ok(qnaImageService.downloadQnaImage(qno, principal.getName()));
  }

}
