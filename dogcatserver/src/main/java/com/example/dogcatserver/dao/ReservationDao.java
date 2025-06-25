package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.time.*;
import java.util.*;

@Mapper
public interface ReservationDao {
  // 사용자가 선택한 시간 불러오기
  @Select("select to_char(schedule, 'HH24:MI') as reserved_time from reservation where trunc(schedule) = to_date(#{date},'yyyy-MM-DD') and h_username = #{hUsername}")
  List<String> findReservedTimeByDate(@Param("date")String date, @Param("hUsername")String hUsername);

  // 예약 생성
  // reservation_mapper.xml 으로 sql문 옮김
  int save(Reservation reservation);

  // 병원 시간 불러오기
  List<Schedule> getHospitalSchedule(@Param("hUsername") String hUsername, @Param("date") LocalDate date);

  // 예약 취소
  int cancelReservation (@Param("rno") int rno);

  // 마이 페이지에서 병원 예약한 내역
  List<Reservation> getMyReservation (@Param("nUsername") String nUsername);

  // 예약 번호로 상세 조회
  Reservation getReservationByRno (@Param("rno") int rno);
}
