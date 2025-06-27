package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface HMemberManageDao {
    // 전체 회원 수 세기
    @Select("select count(*) from user_member u join hospital_member h on u.username= h.h_username order by u.sign_dt desc")
    int countAllHospitalMember();

    // 검색 결과별 회원수 세기
    int countSearchMember(@Param("searchWord") String searchWord, @Param("searchType") String searchType);

    // 전체 목록 출력
    List<HMemberManageDto.HospitalMemberList> findAllHospitalMember(int pageno, int pagesize);

    // 상태별 목록 출력
    List<HMemberManageDto.HospitalMemberList> findAllHospitalMemberByStatus(int pageno, int pagesize, String status);

    // 회원 검색
    List<HMemberManageDto.HospitalMemberList> findHospitalMemberByWord(@Param("pageno") int pageno, @Param("pagesize") int pagesize, @Param("searchWord") String searchWord, @Param("searchType") String searchType);

    // 회원 단일 정보 조회
    @Select("select * from user_member u join hospital_member h on u.username = h.h_username where u.username=#{username}")
    HMemberManageDto.HospitalMemberDetails findHospitalMemberByUsername(String username);
}