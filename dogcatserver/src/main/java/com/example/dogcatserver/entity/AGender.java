package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Getter
@AllArgsConstructor
public enum AGender {
  MALE("남"), FEMALE("여"), UNKNOWN("확인 불가");

  private final String gender;

  @JsonValue
  public String getGender() {
    return gender;
  }
}
