package com.example.dogcatserver.dto;

import com.example.dogcatserver.entity.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;
import java.util.*;

public class AdoptionDto {
  // 글 목록
  @Data
  @AllArgsConstructor
  public static class Pages {
    private int prev;
    private int start;
    private int end;
    private int next;
    private int pageno;
    private List<Adoption> adoptions;
  }

  // 글 작성
  @Data
  public static class Write {
    @NotEmpty  // 추가
    private String aName;
    @Min(0) // notnull에서 min으로 수정
    private int aAge;
    @NotNull
    private AGender aGender;
    @NotEmpty
    private String aBreed;
    @NotNull
    private ACity aCity;  // 상수로 뺌
    @NotEmpty
    private String aLocation;
    @NotEmpty
    private String aFoundLocation;
    @NotEmpty
    private String username;
    @NotEmpty
    private String aContent;
    private boolean aIsAdopted;

    public Adoption toEntity(String savedFileName, String loginId) {
      return Adoption.builder().aProfile(savedFileName).aName(aName).aAge(aAge).aGender(aGender).aBreed(aBreed).aCity(aCity).aLocation(aLocation).aFoundLocation(aFoundLocation).username(loginId).aContent(aContent).aIsAdopted(aIsAdopted).build();
    }
  }

//  // 글 작성Test
//  @Data
//  @AllArgsConstructor
//  @NoArgsConstructor
//  public static class WriteTest {
//    private String aName;
//    @NotNull
//    private int aAge;
//    @NotNull
//    private AGender aGender;
//    @NotEmpty
//    private String aBreed;
//    @NotNull
//    private ACity aCity;  // 상수로 뺌
//    @NotEmpty
//    private String aLocation;
//    @NotEmpty
//    private String aFoundLocation;
//    @NotEmpty
//    private String username;
//    @NotEmpty
//    private String aContent;
//    private boolean aIsAdopted;
//
//    public Adoption toEntity(String savedFileName) {
//      return Adoption.builder().aProfile(savedFileName).aName(aName).aAge(aAge).aGender(aGender).aBreed(aBreed).aCity(aCity).aLocation(aLocation).aFoundLocation(aFoundLocation).username(username).aContent(aContent).aIsAdopted(aIsAdopted).build();
//    }
//  }

  // 글 수정
  @Data
  public static class Update {
    private int ano;  // 글 수정하려면 글번호로 찾을거니까 글 번호 있어야해
// not null 빼고 해보기
    private String aProfile;  // write에는 안넣고 왜 여기에는 넣어? 얘는 기존 값 있으니까
    @NotNull
    private String aName;
    @Min(0)  // 0이상의 값 입력
    private int aAge;
    @NotNull
    private AGender aGender;
    @NotEmpty
    private String aBreed;
    @NotNull
    private ACity aCity;  // 상수로 뺌
    @NotEmpty
    private String aLocation;
    @NotEmpty
    private String aFoundLocation;
    @NotEmpty
    private String aContent;
    private boolean aIsAdopted;

    public Adoption toEntity(String savedFileName) {
      return Adoption.builder().aProfile(savedFileName).aName(aName).aAge(aAge).aGender(aGender).aBreed(aBreed).aCity(aCity).aLocation(aLocation).aFoundLocation(aFoundLocation).aContent(aContent).aIsAdopted(aIsAdopted).build();
    }
  }

}
