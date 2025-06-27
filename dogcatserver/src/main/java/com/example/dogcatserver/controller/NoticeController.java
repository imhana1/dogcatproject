package com.example.dogcatserver.controller;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import jakarta.validation.constraints.*;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.validation.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.security.*;

@Validated  // 검증
@RestController
public class NoticeController {
  @Autowired
  private NoticeService noticeService;

  @Operation(summary = "페이징", description = "기본 페이지 번호 1, 페이지 크기 10 ")
  @GetMapping("/api/notices")
  public ResponseEntity<NoticeDto.Pages> findAll(@RequestParam(defaultValue = "1") int pageno, @RequestParam(defaultValue = "10") int pagesize) {
    return ResponseEntity.ok(noticeService.findAllNotice(pageno, pagesize));
  }

  @Operation(summary = "공지사항 글 읽기", description = "단일 글 출력")
  @GetMapping("/api/notices/notice")
  public ResponseEntity<Notice>  findNoticeByNno(@RequestParam int nno, Principal principal){  // 수정, 삭제버튼 유무 달라서 로그인 아이디 받아오기
    // 로그인 아이디: null이면 null, null아니면 이름 꺼내
    String loginId = principal == null? null : principal.getName();
    return ResponseEntity.ok(noticeService.findNoticeByNno(nno, loginId));
  }


  // 이 밑은 로그인이 되어있어야해서 swagger로 동작 확인x 로그인 완료되면 확인

  @Operation(summary = "공지사항 글 쓰기", description = "공지사항 글 쓰기")
  @Secured("ROLE_ADMIN")
  @PostMapping("/api/notices/write")
  public ResponseEntity<Notice> writeNotice(@RequestBody @Validated NoticeDto.Write writeDto, BindingResult br, Principal principal) {
    Notice notice = noticeService.writeNotice(writeDto, principal.getName());  // 글쓰기가 writeDto로 작성한거랑 id 필요하니까
    return ResponseEntity.ok(notice);
  }

  @Operation(summary = "공지사항 글 수정", description = "공지사항 제목, 내용, 상단고정 수정 후 수정완료 메시지 반환")
  @PutMapping("/api/notices/notice")
  @Secured("ROLE_ADMIN")
  public ResponseEntity<Notice> updateNotice(@RequestBody NoticeDto.Update updateDto, BindingResult br, Principal principal) {
    Notice notice = noticeService.updateNotice(updateDto, principal.getName());
    return ResponseEntity.ok(notice);
  }

  @Operation(summary = "공지사항 글 삭제", description = "글 번호로 공지사항 글 삭제 후 삭제 완료 문구 반환")
  @Secured("ROLE_ADMIN")
  @DeleteMapping("/api/notices/notice")
  public ResponseEntity<String> deleteNotice(@RequestParam @NotNull int nno, Principal principal) {
    // 공지사항 글 번호가 비어있으면 안되니까 notnull 넣음
    noticeService.deleteNotice(nno, principal.getName());
    return ResponseEntity.ok("공지사항 글 삭제가 완료되었습니다.");
  }
}
