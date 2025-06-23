package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.time.*;
import java.util.*;

@Mapper
public interface ScheduleDao {
    int insertSchedule(Schedule schedule);  // 단수형 파라미터, 메서드명도 단수


    List<Schedule> selectByCondition(String hUsername, LocalDate date, String sChoice);
}
