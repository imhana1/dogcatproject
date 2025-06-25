package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import lombok.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.time.*;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ReservationService {
  @Autowired
  private HospitalDao hospitalDao;
  @Autowired
  private ReservationDao reservationDao;

  // 예약 생성 (createReservation)
    // 예약을 생성해 사용자에게 보여야하기 때문에 RequestDto 사용
  public int createReservation(ReservationRequestDto dto) {
    String hUsername = dto.getHUsername();

    // 병원 유효성 체크
    int exists = hospitalDao.findByUsername(dto.getHUsername());
    if (exists == 0) throw new IllegalArgumentException("존재하지 않는 병원입니다.");

    // 중복 검사
    String dateStr = dto.getSchedule().toLocalDate().toString();
    List<String> reservedTimes = reservationDao.findReservedTimeByDate(dateStr, hUsername);
    String requestedTime = dto.getSchedule().toLocalTime().toString();
    if (reservedTimes.contains(requestedTime)) {
      throw new IllegalArgumentException("이미 예약된 시간입니다");
    }
    // 저장
    Reservation reservation = dtoToEntity(dto);
    reservationDao.save(reservation);

    return reservation.getRno();
  }
  private Reservation dtoToEntity(ReservationRequestDto dto) {
    return Reservation.builder()
      .nUsername(dto.getNUsername())
      .hUsername(dto.getHUsername())
      .pno(dto.getPno())
      .schedule(dto.getSchedule())
      .rStatus("WAIT")
      .build();
  }

  // 병원 시간 불러오기
  public List<Schedule> getHospitalSchedule (String hUsername, LocalDate date) {
    return reservationDao.getHospitalSchedule(hUsername, date);
  }


  // 예약 취소
  public void cancelReservation (int rno) {
    int updated = reservationDao.cancelReservation(rno);
    if (updated==0) {
      throw new IllegalArgumentException("예약을 찾을 수 없거나 이미 취소된 예약입니다.");
    }
  }

  // 예약 내역 불러오기
//  public List<Reservation> getMyReservation (String nUsername) {
//
//  }

}
