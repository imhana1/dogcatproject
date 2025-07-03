package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import jakarta.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.*;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.stereotype.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;

// 1:1 질문글 이미지 파일 업로드 / 다운로드 처리 서비스
// 혹시 다른 곳에서 필요하면 말해주세요 이름 수정하면 다른 곳에서도 사요 ㅇ가능
@Service
public class QnaImageService {
  @Autowired
  private QnaQuestionDao qnaQuestionDao;
  @Value("${upload.directory}")
  private String uploadDirectory;  // 사진 파일 업로드 경로 선언


  // 사진 파일 저장
  public String saveQnaImage(MultipartFile qnaImage) {
    String qnaImageName = UUID.randomUUID().toString() + "_" + qnaImage.getOriginalFilename();  // 파일 이름 저장
    Path qnaImagePath = Paths.get(uploadDirectory, qnaImageName);  // 파일 시스템상 경로 저장
    try {
      Files.createDirectories(qnaImagePath.getParent());  // 디렉토리 생성
      qnaImage.transferTo(qnaImagePath.toFile());  // 업로드한 파일을 지정된 경로에 저장
      return qnaImageName;  // 파일 경로 문자열로 반환
      // return qnaImagePath().toString(); 했다가 수정
    } catch (IOException e) {
      throw new JobFailException("사진 업로드에 실패하였습니다.");
    }
  }

  // 관리자인지 확인하는  **
  public boolean isAdmin(String loginId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // Autnehtication 객체 가져와
    UseMember useMember = (UseMember) authentication.getPrincipal();  // useMember 객체 꺼내
    return useMember.getRole() == Role.ADMIN;  // 확인해서 true/false 반환

  }

  // 사진 파일 다운로드
  public Resource downloadQnaImage (int qno, String loginId) {

    // 글 있나 확인
    QnaQuestion question = qnaQuestionDao.findQnaQuestionByQno(qno).orElseThrow(()->new EntityNotFoundException("질문글을 찾을 수 없습니다"));

    // 로그인 아이디 / 권한 확인
    if(!loginId.equals(question.getUsername()) && !isAdmin(loginId)) {
      throw new JobFailException("작성자와 관리자만 가능한 작업입니다.");
    }

    // 글에 이미지 들었나
    if(question.getQImage() == null || question.getQImage().isEmpty()) {
      throw new EntityNotFoundException("이미지를 찾을 수 없습니다.");
    }

    String qnaImageName = question.getQImage();
    Path qnaImagePath = Paths.get(uploadDirectory).resolve(qnaImageName);  // 경로와 이름 합쳐서 전체경로 생성

    Resource resource = new FileSystemResource(qnaImagePath.toFile());

    // 리소스가 존재하고 읽을 수 있는지 확인
    if (!resource.exists() || !resource.isReadable()) {
      throw new EntityNotFoundException("파일을 찾을 수 없습니다.");
    }


    return resource;
  }


}
