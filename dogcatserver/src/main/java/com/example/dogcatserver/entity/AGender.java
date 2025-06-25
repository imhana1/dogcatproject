package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
public enum AGender {
  MALE("남"), FEMALE("여"), UNKNOWN("확인 불가");

  private final String gender;
}
