package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
public enum ACity {  // 지역 의미하는 상수
  SEOUL("서울"),
  BUSAN("부산"),
  INCHEON("인천"),
  DAEGU("대구"),
  DAEJEON("대전"),
  GWANGJU("광주"),
  ULSAN("울산"),
  SEJONG("세종"),
  GYEONGGI("경기"),
  CHUNGBUK("충북"),
  CHUNGNAM("충남"),
  JEONNAM("전남"),
  GYEONGBUK("경북"),
  GYEONGNAM("경남"),
  GANGWON("강원"),
  JEONBUK("전북"),
  JEJU("제주");

  // enum에 한글화 파라미터를 추가하면, 추가한 파라미터를 필드로
  private final String name;
}
