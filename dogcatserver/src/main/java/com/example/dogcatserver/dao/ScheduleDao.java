package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.time.*;
import java.util.*;

@Mapper
public interface ScheduleDao {


    int insertSchedule(Schedule schedule);  // 단수형 파라미터, 메서드명도 단수


    // 날짜 진료/미용 선택/병원 아이디로 s_id 식별하는 기능 (sql문은 mapper로 작성)
    Integer findScheduleIdByTimeAndChoice(String dateTime, String choice, String hUsername);

    @Select("select * from schedule")
    List<Schedule>findAll();

    @Select("SELECT s_notice FROM schedule WHERE h_username = #{hUsername} FETCH FIRST 1 ROWS ONLY")
    String findNoticeByUsername(String hUsername);

    @Update("update schedule set s_notice=#{sNotice} where h_username= #{hUsername} ")
    int updateNotice(String sNotice, String hUsername);

    List<Schedule> selectByCondition(String hUsername, LocalDate date, String sChoice);

    // 병원 측 날짜에 대한 스케즐 전체 블록 처리
    @Update("UPDATE schedule SET block_status=1 " +
            "WHERE h_username=#{loginId} " +
            "AND schedule >= TO_DATE(#{date}, 'YYYY-MM-DD') " +
            "AND schedule < TO_DATE(#{date}, 'YYYY-MM-DD') + 1 " +
            "AND s_choice=#{sChoice}")
    int blockTimes( String loginId,String date,String sChoice);

    // 시간을 가지고 스케즐 블락처리 고객(예약용)
    @Update("update schedule set block_status=1 where h_username=#{loginId}  AND TRUNC(schedule) = TRUNC(#{date})   AND TO_CHAR(schedule, 'HH24:MI:SS') = TO_CHAR(#{time}, 'HH24:MI:SS') and s_choice=#{sChoice}")
    int blockTime(String loginId, LocalDate date, LocalTime time,String sChoice);

    @Select("select * from schedule where s_id=#{sId} and block_status= 1")
    int countBlockStatus(Integer sId);


    // 예약 시간이 지나면 삭제하는 기능(미완성 수정 필요) 비효율적인 sql
//    @Delete("DELETE FROM schedule\n" +
//            "WHERE schedule >= TO_DATE(#{date} || ' ' || #{time}, 'YYYY-MM-DD HH24:MI')\n" +
//            "  AND schedule < TO_DATE(#{date} || ' ' || #{time}, 'YYYY-MM-DD HH24:MI') + (1/1440)")
//    int scheduleDelete(LocalDate date, LocalTime time);

    @Delete("delete from schedule where TRUNC(schedule, 'MI') < TRUNC(SYSTIMESTAMP, 'MI')")
    int deletePastSchedule();

    @Delete("delete from schedule where h_username= #{loginId}")
    int AllDelet(String loginId);


}
