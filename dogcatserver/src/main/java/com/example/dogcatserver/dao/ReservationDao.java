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

  // 병원이 고객 예약 내역 읽기 (병원, 고객, 예약 테이블 3개를 join)
  @Select("select  h.hospital, r.*, s.s_choice, n.n_name  from hospital_member h join reservation r on h.h_username=r.h_username join normal_member n on n.n_username= r.n_username\n" +
          "JOIN schedule s on r.s_id = s.s_id  WHERE h.h_username =#{hUsername} ORDER BY r.schedule DESC")
  List<Reservation> getReservation (String hUsername);

  // 예약 번호로 상세 조회
  Reservation getReservationByRno (int rno);

  // 예약 번호로 병원 아이디 조회
  @Select("select h_username from reservation where rno=#{rno}")
  String FindhUsrnameByRno(int rno);

  // rno를 가지고 고객 아이디 조회
  @Select("select n_username from reservation where rno=#{rno}")
  String FindnUsernameByRno(int rno);

  // 테스트 코드
  @Select("select s_id from schedule where s_id=123")
  List<String> aaa();

  @Select("select r.r_condition, r.remark, r.rno, n.n_name from reservation r join normal_member n on r.n_username= n.n_username  where rno=#{rno}")
  Reservation findReservation(Integer rno);

  // 회원 탈퇴 시 이용
  @Delete("delete from reservation where h_username=#{loginId}")
  int AllDelete(String loginId);

  // 예약 번호로 예약 정보 조회
  Reservation selectReservationByRno(int rno);
}
