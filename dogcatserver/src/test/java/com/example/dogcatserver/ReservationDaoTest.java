package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;

import java.time.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ReservationDaoTest {
  @Autowired
  private ReservationDao reservationDao;

  @Autowired
  private ReservationService reservationService;

  // 메소드 insert test
//  @Test
  public void findReservedTimeByDate() {
    Reservation reservation = Reservation.builder()
      .nUsername("winter")
      .hUsername("summer")
      .pno(100)
      .schedule(LocalDateTime.of(2025, 6, 25, 10, 0))
//      .rStatus("WAIT")
      .build();
//    reservationDao.save(responseDao);

    // rno가 DB에 저장되었는지 확인
    assertTrue(reservation.getRno() > 0, "rno 가 생성되지 않았습니다");
      System.out.println("생성된 rno: " + reservation.getRno());
  }

//  @Test
  public void canceledReservationTest() {
    int num = reservationDao.cancelReservation(23);

    // 예약이 있으면 1, 없으면 0
    assertEquals(1, num, "예약 취소 처리");
  }

//  @Test
  public void deleteReservationTest() {
    int num = reservationDao.deleteReservation(23);
    assertEquals(1, num, "예약 삭제 성공");
  }

  @Test
  public void getReservationTest(){
    reservationDao.findReservation(86);
  }
}
