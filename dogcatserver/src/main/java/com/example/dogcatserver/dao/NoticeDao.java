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

  // 공지사항 전체 글 목록 불러오기 (mapper)
  List<Notice> findAllNotice(int pageno, int pagesize);

  // 공지사항 단일 글 불러오기
  @Select("select * from notice where nno=#{nno}")
  Optional<Notice> findNoticeByNno(int nno);

  // 전체 글 수 세기
  @Select("select count(*) from notice")
  int countAllNotice();

}
