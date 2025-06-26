package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.time.*;
import java.util.*;

@Mapper
public interface ScheduleDao {
    int insertSchedule(Schedule schedule);  // 단수형 파라미터, 메서드명도 단수

    @Select("SELECT s_notice FROM schedule WHERE h_username = #{hUsername} FETCH FIRST 1 ROWS ONLY")
    String findNoticeByUsername(String hUsername);

    @Update("update schedule set s_notice=#{sNotice} where h_username= #{hUsername} ")
    int updateNotice(String sNotice, String hUsername);

    List<Schedule> selectByCondition(String hUsername, LocalDate date, String sChoice);

    @Update("update schedule set block_status=1 where h_username=#{loginId} AND TRUNC(schedule) = TRUNC(#{date}) and s_choice=#{sChoice}")
    int blockTimes(String loginId, LocalDate date, String sChoice);

    @Update("update schedule set block_status=1 where h_username=#{loginId}  AND TRUNC(schedule) = TRUNC(#{date})   AND TO_CHAR(schedule, 'HH24:MI:SS') = TO_CHAR(#{time}, 'HH24:MI:SS') and s_choice=#{sChoice}")
    int blockTime(String loginId, LocalDate date, LocalTime time,String sChoice);
}
