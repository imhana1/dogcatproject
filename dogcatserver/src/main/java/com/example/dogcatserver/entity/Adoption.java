package com.example.dogcatserver.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import java.time.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString  // 작업 완료 후 삭제
public class Adoption {
  private int ano;
  private String aProfile;
  private String aName;
  private int aAge;
  private AGender aGender; // 상수
  private String aBreed;
  private ACity aCity;  // 상수로 뺌
  private String aLocation;
  private String aFoundLocation;
  private String username;
  @Builder.Default
  @JsonFormat(pattern="yyyy년 MM월 dd일 hh:mm")
  private LocalDateTime aWriteDay = LocalDateTime.now();  // 기본값
  private String aContent;
  private boolean aIsAdopted; // 기본값 없앰 ∵필수입력할거야
}
