package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import com.example.dogcatserver.service.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;
import org.springframework.transaction.annotation.*;

@SpringBootTest
public class NoticeDaoTest {
  @Autowired
  private NoticeDao noticeDao;
//  @Autowired
//  private NoticeService noticeService;



//  @Test
  public void saveNotices() {
    for(int i=0; i<100; i++) {
      Notice notice = Notice.builder().nTitle(i+"번째 공지 제목").nContent(i+"번째 공지 내용").username("admin").nIsTop(false).build();
      noticeDao.writeNotice(notice);
    }
  }

//  @Test
  @Transactional
  public void updateNotice() {
    // 글 찾아
    Notice notice = noticeDao.findNoticeByNno(1).orElseThrow(()->new EntityNotFoundException("글 없음"));
    // 글 수정
    NoticeDto.Update updateNotice = new NoticeDto.Update();
    updateNotice.setNTitle("1번째 공지 제목 수정");
    updateNotice.setNContent("1번째 공지 내용 수정");
    updateNotice.setNIsTop(true);
    // update 실행
    noticeDao.updateNotice(updateNotice);
  }

//  @Test
  @Transactional
  public void findNormalNoticeTest() {
    noticeDao.findNormalNotice(1, 5);
  }

//    @Test
  @Transactional
  public void findTopNoticeTest() {
    noticeDao.findTopNotices();
  }

//  @Test
  @Transactional
  public void findNoticeByNnoTest() {
    noticeDao.findNoticeByNno(1);
  }

//  @Test
  @Transactional
  public void countNormalNoticesTest() {
    noticeDao.countNormalNotices();
  }

//  @Test
  @Transactional
  public void deleteNoticeTest() {
    Notice notice = noticeDao.findNoticeByNno(1).orElseThrow(()->new EntityNotFoundException("글없음"));
    noticeDao.deleteNotice(notice.getNno());
  }


}
