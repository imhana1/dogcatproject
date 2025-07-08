package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;

@SpringBootTest
public class Aaa {
    @Autowired
    private ReservationDao dao;

    @Autowired
    private ScheduleDao scheduleDao;
    @Test
    public void teet1() {
        scheduleDao.findScheduleIdByTimeAndChoice("2025-07-07 10:00", "진료","123456");
    }
//    @Test
    public void test2(){
        dao.aaa();
    }

}
