package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

// 일반 회원 관리 dao

@Mapper
public interface NMemberManageDao {
  // 전체 회원 수 세기
  @Select("select count(*) from user_member u join normal_member n on u.username= n.n_username order by u.sign_dt desc")
  int countAllNormalMember();

  // 검색 결과별 회원수 세기
  int countSearchMember(@Param("searchWord")String searchWord, @Param("searchType")String searchType);

  // 전체 목록 출력
  List<NMemberManageDto.NormalMemberList> findAllNormalMember(int pageno, int pagesize);

  // 상태별 목록 출력
  List<NMemberManageDto.NormalMemberList> findAllNormalMemberByStatus(int pageno, int pagesize, String status);

  // 회원 검색
  List<NMemberManageDto.NormalMemberList> findNormalMemberByWord(@Param("pageno")int pageno, @Param("pagesize")int pagesize, @Param("searchWord")String searchWord, @Param("searchType")String searchType);

  // 회원 단일 정보 조회
  @Select("select * from user_member u join normal_member n on u.username = n.n_username where u.username=#{username}")
  NMemberManageDto.NormalMemberDetails findNormalMemberByUsername(String username);



}
