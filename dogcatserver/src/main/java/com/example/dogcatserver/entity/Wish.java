package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString  // 작업 완료 후 삭제
public class Wish {
  private int ano;
  private String username;
  private String aProfile;
  private String aName;
  private String aCity;
}
