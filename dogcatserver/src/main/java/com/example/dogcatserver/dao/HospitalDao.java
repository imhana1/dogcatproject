package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;
import org.springframework.web.multipart.*;

import java.util.*;

@Mapper
public interface HospitalDao {


    // 회원 가입시 병원 정보 저장
    @Insert("insert into hospital_member(h_username,director,hospital,h_tel,h_reptel, ZIP, h_address,h_choice,h_location, h_longitude, h_birthday, h_subaddress) values(#{hUsername}, #{director},#{hospital}," +
            "#{hTel}, #{hReptel},#{zip}, #{hAddress},#{hChoice},#{hLocation},#{hLongitude}, #{hBirthDay}, #{hSubaddress})")
    int save(Hospital hospital);

    @Select("SELECT h.*, m.email FROM hospital_member h LEFT JOIN user_member m ON h.h_username = m.username WHERE h.h_username = #{loginId}")
    int findByUsername(String loginId);

    // 병원 정보 조회
    @Select("SELECT h.*, m.email FROM hospital_member h LEFT JOIN user_member m ON h.h_username = m.username WHERE h.h_username = #{loginId}")
    HospitalMemberInfo getByUsername(String loginId);

    @Select("select h_username from hospital_member where hospital=#{hospital}")
    String findhUsername(String hospital);


    // 병원 정보 변경 sql문은 mpper로
    int changeInfo(HospitalMemberInfo hospitalMemberInfo);

    // 병원 아이디 이름 리스트 출력 시간 생성용
    @Select("Select h_username from hospital_member")
    List<String> findAllUserNames();

    @Select("select h_location, h_longitude from hospital_member where h_address=#{hAddress}")
    Hospital findAddress(String hAddress);

    // 소개 페이지
    // TRIM() 함수는 문자열의 앞이나 뒤, 또는 양쪽에 있는 특정 문자를 제거하는 데 사용, cast
    @Select("SELECT * FROM hospital_member " +
            "WHERE TRIM(REPLACE(h_address, ' ', '')) = TRIM(REPLACE(CAST(#{hAddress} AS VARCHAR2(100)), ' ', '')) " +
            "  AND TRIM(REPLACE(hospital, ' ', '')) = TRIM(REPLACE(CAST(#{hospital} AS VARCHAR2(70)), ' ', '')) " +
            "  AND rownum = 1")
    HospitalMemberInfo hospitalInfo(String hAddress, String hospital);


    @Delete("delete from hospital_member where h_username=#{loginId}")
    int deletehospital(String loginId);

    @Delete("delete from pay where h_username=#{loginId}")
    int deletePay(String loginId);

    // 주소로 병원 찾기 (아이디로 안 찾아져서 주소로 변경함)
    HospitalPublicInfo findByAddress(String address);

}
