package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface NoticeDao {
  // 공지사항 글 등록 (mapper)
  int writeNotice(Notice notice);

  // 공지사항 글 수정
  @Update("update notice set n_title=#{nTitle}, n_content=#{nContent}, n_is_top=#{nIsTop} where nno=#{nno}")
  int updateNotice(NoticeDto.Update updateDto);  // dto 만들어서 쓸거라 타입 notice x NoticeDto.Update o

  // 공지사항 글 삭제: 글 삭제 후 해당 글의 글번호 리턴
  @Delete("delete from notice where nno=#{nno}")
  int deleteNotice(int nno);

  // 공지사항 상단고정 글 목록 전체 조회
  @Select("select * from notice where n_is_top=1 order by nno desc")
  List<Notice> findTopNotices();

  // 공지사항 상단고정 아닌 글 목록 불러오기 (mapper)
  List<Notice> findNormalNotice(int pageno, int pagesize);

  // 공지사항 단일 글 불러오기
  @Select("select * from notice where nno=#{nno}")
  Optional<Notice> findNoticeByNno(int nno);

  // 상단 고정이 아닌 글 수 세기
  @Select("select count(*) from notice where n_is_top = 0")
  int countNormalNotices();

}
