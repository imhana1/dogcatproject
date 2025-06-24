package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class ReservationService {
  @Autowired
  private HospitalDao hospitalDao;
  @Autowired
  private ReservationDao reservationDao;

  // 예약 생성 (createReservation)
    // 예약을 생성해 사용자에게 보여야하기 때문에 RequestDto 사용
  public void createReservation(ReservationRequestDto dto) {
    // 병원 유효성 체크
    int exists = hospitalDao.findByUsername(dto.getHUsername());
      if (exists == 0) throw new IllegalArgumentException("존재하지 않는 병원입니다.");

    // 중복 검사
    List<String> reservedTimes = reservationDao.findReservedTimeByDate(dto.getSchedule().toLocalDate(), dto.getHUsername());
    String requestedTime = dto.getSchedule().toLocalTime().toString();
    if (reservedTimes.contains(requestedTime)) {
      throw new IllegalArgumentException("이미 예약된 시간입니다");
    }

//    Reservation reservation = dtoToEntity(dto);
//    reservationDao.save(reservation);
    return;
  }
}
