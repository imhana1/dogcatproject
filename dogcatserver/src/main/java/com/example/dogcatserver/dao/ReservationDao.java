package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.time.*;
import java.util.*;

@Mapper
public interface ReservationDao {
  // 예약 생성
  // reservation_mapper.xml 으로 sql문 옮김
  int save(Reservation reservation);

  // 병원 시간 불러오기
  List<Schedule> getHospitalSchedule(String hUsername, LocalDate date);

  // 예약 취소
  int cancelReservation (int rno);

  // 예약 삭제
  int deleteReservation (int rno);

  // 마이 페이지에서 병원 예약한 내역
  List<Reservation> getMyReservation (String nUsername);

  // 병원이 고객 예약 내역 읽기
  @Select(" select * from reservation where h_username = #{hUsername} order by schedule desc")
  List<Reservation> getReservation (String hUsername);

  // 예약 번호로 상세 조회
  Reservation getReservationByRno (int rno);

  // 예약 번호로 병원 아이디 조회
  @Select("select h_username from reservation where =#{rno}")
  String FindhUsrnameByRno(int rno);

  @Select("select n_username from reservation where =#{rno}")
  String FindnUsernameByRno(int rno);

}
