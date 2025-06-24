package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;
import org.springframework.transaction.annotation.*;

import java.time.*;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class

ReservationDaoTest {
  @Autowired
  private ReservationDao reservationDao;

  @Autowired
  private ReservationService reservationService;

  // 메소드 insert test
  @Test
  @Transactional
  public void findReservedTimeByDate() {
    Reservation reservation = Reservation.builder()
      .nUsername("winter")
      .hUsername("summer")
      .pno(100)
      .schedule(LocalDateTime.of(2025, 6, 25, 10, 0))
      .rStatus("WAIT")
      .build();
    reservationDao.save(reservation);

    // rno가 DB에 저장되었는지 확인
    assertTrue(reservation.getRno() > 0, "rno 가 생성되지 않았습니다");
      System.out.println("생성된 rno: " + reservation.getRno());
  }
}
