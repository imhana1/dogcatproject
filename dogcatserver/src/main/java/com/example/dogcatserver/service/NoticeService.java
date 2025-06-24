package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
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

  // 단일 글 불러오기 (여기 리턴타입 optional 하면 컨트롤러 오류나지 그냥 notice 하고 예외처리)
  public Notice findNoticeByNno(int nno, String loginId) {
    // 수정, 삭제버튼 유무 결정하려면 작성자인지 판단해야해서 loginId 넣음(이건 컨트롤러에서 작성)
    Notice notice = noticeDao.findNoticeByNno(nno).orElseThrow(()->new EntityNotFoundException("글을 찾지 못했습니다."));
    return notice;
  }

  // 글 작성
  public Notice writeNotice(NoticeDto.Write writeDto, String loginId) {
    Notice notice = writeDto.toEntity(loginId);
    noticeDao.writeNotice(notice);
    return notice;
  }
  // 글 수정
  public void updateNotice(NoticeDto.Update updateDto, String loginId) {
    // 글 찾아 없으면 예외
    Notice notice = noticeDao.findNoticeByNno(updateDto.getNno()).orElseThrow(()-> new EntityNotFoundException("글을 찾지 못했습니다"));
    // 작성자 아니면 예외처리
    if(!notice.getUsername().equals(loginId)) {
      throw new JobFailException("잘못된 작업입니다");
    }
    //찾았으면 수정
    noticeDao.updateNotice(updateDto);
  }

  // 글 삭제
  public void deleteNotice(int nno, String loginId) {
    // 글 읽어와
    Notice notice = noticeDao.findNoticeByNno(nno).orElseThrow(()-> new EntityNotFoundException("글을 찾지 못했습니다."));
    // 로그인아이디 동일x면 넘겨
    if(!notice.getUsername().equals(loginId)) {
      throw new JobFailException("잘못된 작업입니다.");
    }
    // 글 삭제
    noticeDao.deleteNotice(nno);
  }
}
