package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
public enum ACity {  // 지역 의미하는 상수
  SEOUL("서울", "서울특별시"),
  BUSAN("부산", "부산광역시"),
  INCHEON("인천","인천광역시"),
  DAEGU("대구","대구광역시"),
  DAEJEON("대전","대전광역시"),
  GWANGJU("광주","광주광역시"),
  ULSAN("울산","울산광역시"),
  SEJONG("세종","세종특별자치시"),
  GYEONGGI("경기","경기도"),
  CHUNGBUK("충북","충청북도"),
  CHUNGNAM("충남","충청남도"),
  JEONNAM("전남","전라남도"),
  GYEONGBUK("경북","경상북도"),
  GYEONGNAM("경남","경상남도"),
  GANGWON("강원","강원특별자치도"),
  JEONBUK("전북","전북특별자치도"),
  JEJU("제주","제주특별자치도");

  // enum에 한글화 파라미터를 추가하면, 추가한 파라미터를 필드로
  // 필드가 선언된 순서대로 생성자 파라미터 할당
  private final String name;
  private final String fullName;
}
