package com.example.dogcatserver.service;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;

private Reservation dtoToEntity (ReservationRequestDto dto) {
  Reservation reservation = new Reservation();
//  reservation.setNUseranme(dto.getNUsername());
//  reservation.setHUsername(dto.getHUsername());
  reservation.setPno(dto.getPno());
  reservation.setSchedule(dto.getSchedule());
  reservation.setRStatus("WAIT");  // 기본 예약 상태
  return reservation;
}
