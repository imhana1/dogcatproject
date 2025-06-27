package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
public enum Status {
  NORMAL("일반"), WARNING("경고"), BLOCK("차단");

  private final String status;
}
