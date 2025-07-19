package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import lombok.*;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

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
  private PetDao petDao;

  @Autowired
  private ScheduleDao  scheduleDao;

  // 예약 생성 (createReservation)
  // 예약을 생성해 사용자에게 보여야하기 때문에 RequestDto 사용
  @Transactional
  public int createReservation(ReservationRequestDto.Create dto, String loginId) {
    // 1. 진료 시간과 선택한 진료 종류로 schedule s_id 찾기
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    String dateTime = dto.getSchedule().format(formatter); // ← 여기가 핵심
    String hUsername = dto.getHUsername();
    String choice = dto.getSChoice();
    Integer pno = petDao.findPno(loginId, dto.getPName());

    System.out.println("찾는 스케줄 시간: " + dateTime);
    System.out.println("선택한 진료 종류: " + choice);
    System.out.println("병원 아이디: " + hUsername);

    Integer sId= scheduleDao.findScheduleIdByTimeAndChoice(dateTime, choice, hUsername);
    System.out.println(sId);
    if (sId == null) {
      throw new JobFailException("해당 시간과 진료 종류에 대한 스케줄이 없습니다");
    }
    Boolean idBlocked= scheduleDao.existsBlockedSchedule(sId);
    if(idBlocked){
      throw new JobFailException("이미 예약 되었습니다");
    }

    Reservation reservation = dto.toEntity(sId, loginId, pno); // 변환 메서드 작성
    reservationDao.save(reservation);
    reservationDao.blockTime(sId);
    return reservation.getRno();
  }

  // 병원 시간 불러오기
  public List<Schedule> getHospitalSchedule ( String hUsername, LocalDate date) {
    return reservationDao.getHospitalSchedule(hUsername, date);
  }

  // 예약 상태 진료 완료 설정
//  @Scheduled(fixedDelay = 10000)
  public void Complete(){
    reservationDao.updateStatus();
  }

  // 예약 승인
  public boolean reservedReservation(int rno) {
    Reservation res = reservationDao.getReservationByRno(rno);

    if (res == null) {
      System.out.println("승인 실패. 예약이 존재하지 않습니다");
      return false;
    }
    if ("RESERVED".equals(res.getRStatus())) {
      System.out.println("예약 승인 실패. 이미 승인된 예약입니다");
      return false;
    }
    int reservedNo = reservationDao.reservedReservation(rno);
    System.out.println(reservedNo);

    if(reservedNo == 1) {
      return true;
    }
    throw new RuntimeException("예약 승인 트랜잭션 실패: rno = " + rno);
  }



  // 예약 취소
  @Transactional
  public boolean cancelReservation(int rno) {
    // 상태 변경하기
    Reservation db = reservationDao.getReservationByRno(rno);
    // 실패 분야 늘리기
    if (db == null) {
      System.out.println("예약 취소 실패 : 예약이 존재하지 않습니다");
      return false;
    }
    if ("CANCELED".equals(db.getRStatus())) {
      System.out.println("예약 취소 실패 : 이미 취소된 예약입니다.");
      return false;
    }
    int updateNo = reservationDao.cancelReservation(rno);
    int deleteNO = reservationDao.deleteReservation(rno);
    // 변경이 안되면 안된다고 출력
    System.out.println(updateNo);
    System.out.println(deleteNO);
    if (updateNo == 1 && deleteNO == 1) {
      return true;
    }

    throw new RuntimeException("예약 취소 트랜잭션 실패: rno = " + rno);
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
  public List<Reservation> getReservations (String hUsername) {
    if(hUsername == null || hUsername.isBlank()) {
      throw new IllegalArgumentException("사용자 이름이 유효하지 않습니다");
    }
    return reservationDao.getReservation(hUsername);
  }

  public Reservation getReservation(Integer rno){
    if(rno == null) {
      throw new IllegalArgumentException("존재하지 않는 예약 번호입니다");
    }
    return reservationDao.findReservation(rno);
  }
}
