package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class NoticeService {
  @Autowired
  private NoticeDao noticeDao;

  // 블록 사이즈는 5로 고정
  private static final int BLOCK_SIZE = 5;

  // 한 페이지에 공지사항글들 목록 불러오기(pagination해서)
  public NoticeDto.Pages findAllNotice(int pageno, int pagesize) {
    int totalcount = noticeDao.countAllNotice();
    List<Notice> notices = noticeDao.findAllNotice(pageno, pagesize);
    return NoticeUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalcount, notices);
  }

  // 단일 글 불러오기
  public Optional<Notice> findNoticeByNno(int nno) {
    Optional<Notice> notice = noticeDao.findNoticeByNno(nno);
    return notice;
  }

  // 글 작성

  // 글 수정

  // 글 삭제
}
