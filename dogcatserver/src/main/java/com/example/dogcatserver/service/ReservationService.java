package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class ReservationService {
  @Autowired
  ReservationDao reservationDao;

  // 예약 생성 (createReservation)
    // 예약을 생성해 사용자에게 보여야하기 때문에 RequestDto 사용
  public int createReservation(ReservationRequestDto dto) {
    // 중복 검사
  }
}
