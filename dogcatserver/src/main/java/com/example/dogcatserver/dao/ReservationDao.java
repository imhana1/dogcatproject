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

  // reservation_mapper.xml 으로 sql문 옮김
  int save(Reservation reservation);
}
