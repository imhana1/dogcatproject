package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import lombok.*;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.time.*;
import java.time.format.*;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ReservationService {
  @Autowired
  private HospitalDao hospitalDao;
  @Autowired
  private ReservationDao reservationDao;

  @Autowired
  private ScheduleDao  scheduleDao;

  // 예약 생성 (createReservation)
    // 예약을 생성해 사용자에게 보여야하기 때문에 RequestDto 사용
  public int createReservation(ReservationRequestDto.Create dto) {
//    String hUsername = reservation.getHUsername();

    // 병원 유효성 체크
//    int exists = hospitalDao.findByUsername(reservation.getHUsername());
//    if (exists == 0) throw new IllegalArgumentException("존재하지 않는 병원입니다.");

    // 중복 검사
//    String dateStr = dto.getDate().toString();
//    List<String> reservedTimes = reservationDao.findReservedTimeByDate(dateStr, hUsername);
//    String requestedTime = dto.getTime().toString();
//    if (reservedTimes.contains(requestedTime)) {
//      throw new IllegalArgumentException("이미 예약된 시간입니다");
//    }
    // 저장
//    ReservationResponseDto responseDto = dtoToEntity(reservation);

    // 1. 진료 시간과 선택한 진료 종류로 schedule s_id 찾기
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    String dateTime = dto.getSchedule().format(formatter); // ← 여기가 핵심
    String hUsername = dto.getHUsername();
    String choice = dto.getSChoice();

    Integer sId= scheduleDao.findScheduleIdByTimeAndChoice(dateTime, choice, hUsername);
    System.out.println(sId);
    if (sId == null) {
      throw new IllegalArgumentException("해당 시간과 진료 종류에 대한 스케줄이 없습니다.");
    }


    Reservation reservation = dto.toEntity(sId); // 변환 메서드 작성
    reservationDao.save(reservation);
    return reservation.getRno();
  }
  private ReservationResponseDto dtoToEntity(ReservationRequestDto dto) {
    return ReservationResponseDto.builder()
      .nUsername(dto.getNUsername())
      .hUsername(dto.getHUsername())
      .pno(dto.getPno())
      .date(dto.getDate())
      .time(dto.getTime())
      .rStatus("WAIT")
      .build();
  }

  // 병원 시간 불러오기
  public List<Schedule> getHospitalSchedule ( String hUsername, LocalDate date) {
    return reservationDao.getHospitalSchedule(hUsername, date);
  }




  // 예약 취소
  public boolean cancelReservation(Reservation reservation) {
    // 상태 변경하기
    Reservation db = reservationDao.getReservationByRno(reservation.getRno());
    // 실패 분야 늘리기
    if (db == null) {
      System.out.println("예약 취소 실패 : 예약이 존재하지 않습니다");
      return false;
    }
    if ("CANCE".equals(db.getRStatus())) {
      System.out.println("예약 취소 실패 : 이미 취소된 예약입니다.");
      return false;
    }
    int updateNo = reservationDao.cancelReservation(reservation.getRno());
    // 변경이 안되면 안된다고 출력
    if (updateNo == 1) {
      // 변경 성공
      return true;
    } else {
      // 실패
      System.out.println("예약 취소 실패: 번호 = " + reservation.getRno());
      return false;
    }
  }

  // 예약 삭제
  public int deleteReservation (int rno) {
    return reservationDao.deleteReservation(rno);
  }

  // 예약 내역 불러오기
  public List<Reservation> getMyReservation (String nUsername) {
    if(nUsername == null || nUsername.isBlank()) {
      throw new IllegalArgumentException("사용자 이름이 유효하지 않습니다");
    }
    return reservationDao.getMyReservation(nUsername);
  }
  
  // 병원 측 예약 내역 불러오기 서비스
  public List<Reservation> getReservation (String hUsername) {
    if(hUsername == null || hUsername.isBlank()) {
      throw new IllegalArgumentException("사용자 이름이 유효하지 않습니다");
    }
    return reservationDao.getReservation(hUsername);
  }
}
