package com.example.dogcatserver.entity;

public enum ReservationStatus {
  WAITING, // 예약 대기
  RESERVED, // 예약 확정
  CANCELED, // 예약 취소
  COMPLETED // 진료 완료
}
