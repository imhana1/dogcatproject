package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Getter
@AllArgsConstructor
public enum Status {
  NORMAL("일반"), WARNING("경고"), BLOCK("차단");

  private final String status;

  @JsonValue
  public String getStatus() {
    return status;
  }
}
