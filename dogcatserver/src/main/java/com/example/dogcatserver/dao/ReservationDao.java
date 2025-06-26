package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.time.*;
import java.util.*;

@Mapper
public interface ReservationDao {
  // 사용자가 선택한 시간 불러오기
  @Select("select * from reservation where trunc(schedule) = to_date(#{date},'yyyy-MM-DD') and h_username = #{hUsername} and to_char(#{time},'HH:mm')")
  Reservation findReservedTimeByDate(LocalDate date,LocalTime time, String hUsername);

  // 예약 생성
  // reservation_mapper.xml 으로 sql문 옮김
  int save(ReservationResponseDto responseDto);

  // 병원 시간 불러오기
  List<Schedule> getHospitalSchedule(String hUsername, LocalDate date);

  // 예약 취소
  int cancelReservation (int rno);

  // 예약 삭제
  int deleteReservation (int rno);

  // 마이 페이지에서 병원 예약한 내역
  List<Reservation> getMyReservation (String nUsername);

  // 예약 번호로 상세 조회
  Reservation getReservationByRno (int rno);
}
