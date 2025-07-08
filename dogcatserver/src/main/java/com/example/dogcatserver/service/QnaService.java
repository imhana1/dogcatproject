package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.entity.Role;
import com.example.dogcatserver.exception.*;
import com.example.dogcatserver.util.*;
import org.apache.catalina.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.stereotype.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.*;

import java.io.*;
import java.util.*;

@Service
public class QnaService {
  @Autowired
  private QnaQuestionDao qnaQuestionDao;
  @Autowired
  private QnaAnswerDao qnaAnswerDao;
//  @Autowired
//  private QnaImageService qnaImageService;

  // 블록 사이즈는 5로 고정
  private static final int BLOCK_SIZE = 5;

  // 본인이 작성한 질문 리스트 출력 (고객)
  public QnaQuestionDto.Pages findQnaQuestionsByUsername(int pageno, int pagesize, String loginId) {  // Principal: at controller
    int totalCount = qnaQuestionDao.countAllQnaQuestion();
    List<QnaQuestion> qnaQuestions = qnaQuestionDao.findQnaQuestionsByUsername(pageno, pagesize, loginId);
    return QnaUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, qnaQuestions);
  }

  // 전체 질문 리스트 출력 (관리자)
  public QnaQuestionDto.Pages findAllQnaQuestion (int pageno, int pagesize)  {
    int totalCount = qnaQuestionDao.countAllQnaQuestion();
    List<QnaQuestion> qnaQuestions = qnaQuestionDao.findAllQnaQuestion(pageno, pagesize);
    return QnaUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, qnaQuestions);
  }

  // 답변 상태에 따른 질문 리스트 출력 (관리자)
  public QnaQuestionDto.Pages findAllQnaQuestionByIsAnswered (boolean qIsAnswered, int pageno, int pagesize) {
    int totalCount = qnaQuestionDao.countAllQnaQuestion();
    List<QnaQuestion> qnaQuestions = qnaQuestionDao.findAllQnaQuestionByIsAnswered(qIsAnswered, pageno, pagesize);
    return QnaUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, qnaQuestions);
  }

  // 질문 단일 글 출력 ** 보류 이거 말고 답변이랑 같이 출력하는거 사용 예정 **
  public QnaQuestion findQnaQuestionByQno (int qno) {//일단 loginId 제외
    QnaQuestion qnaQuestion = qnaQuestionDao.findQnaQuestionByQno(qno).orElseThrow(()->new EntityNotFoundException("글을 찾지 못했습니다."));
    return qnaQuestion;
  }

//  // 관리자인지 확인하는  **
//  public boolean isAdmin(String loginId) {
//    Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // Autnehtication 객체 가져와
//    UseMember useMember = (UseMember) authentication.getPrincipal();  // useMember 객체 꺼내
//    return useMember.getRole() == Role.ADMIN;  // 확인해서 true/false 반환
//
//  }

  public boolean isAdmin(String loginId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // Authentication 객체 가져와
    Object principal = authentication.getPrincipal();  // principal 객체 꺼내

    // UserDetails가 UseMember 타입인지 확인
    if (principal instanceof UseMember) {
      UseMember useMember = (UseMember) principal;  // UseMember로 캐스팅
      return useMember.getRole() == Role.ADMIN;  // 관리자 확인
    }

    // 만약 principal이 UseMember가 아니라면, 일반 User 객체라면 그에 맞게 처리
    if (principal instanceof org.springframework.security.core.userdetails.User) {
      org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) principal;
      return user.getAuthorities().stream()
          .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
    }

    // 그 외의 경우는 관리자 권한이 없다고 가정
    return false;
  }

  // 질문 단일 글 답변과 함께 출력  **
  public Map<String, Object> findQnaQuestionByQnoWithAnswer(int qno, String loginId) {
    Map<String, Object> question = qnaQuestionDao.findQnaQuestionByQnoWithAnswer(qno).orElseThrow(()->new EntityNotFoundException("질문글을 찾지 못했습니다."));
    String writer = (String) question.get("username");
    if(!loginId.equals(writer) && !isAdmin(loginId)) {
      throw new JobFailException("작성자 또는 관리자만 열람할 수 있습니다");
    }
    return question;
  }

  // 1:1 문의글 작성 (사진 첨부x 화면에 출력되게 수정)
  public QnaQuestion writeQnaQuestion (QnaQuestionDto.Write writeDto, String base64Image, String loginId) {
    QnaQuestion qnaQuestion = writeDto.toEntity(base64Image, loginId);
    qnaQuestionDao.writeQnaQuestion(qnaQuestion);  // 글 작성
    return qnaQuestion;
  }


  // 답변 작성
  public QnaAnswer writeQnaAnswer (QnaAnswerDto.Write writeDto, String loginId) {
    QnaAnswer qnaAnswer = writeDto.toEntity(loginId);
    qnaAnswerDao.writeQnaAnswer(qnaAnswer);
    qnaQuestionDao.updateQIsAnswered(qnaAnswer.getQno());
    return qnaAnswer;
  }

}
