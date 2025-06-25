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
    @NotNull
    private String aProfile;
    @NotNull
    private String aName;
    @Min(0)  // 0이상의 값 입력
    private int aAge;
    @NotNull
    private String aGender;
    @NotNull
    private String aBreed;
    @NotNull
    private ACity aCity;  // 상수로 뺌
    @NotNull
    private String aLocation;
    @NotNull
    private String aFoundLocation;
    @NotNull
    private String aContent;
    private boolean aIsAdopted;

    public Adoption toEntity(String loginId, String savedFileName) {
      return Adoption.builder().aProfile(aProfile).aName(aName).aAge(aAge).aBreed(aBreed).aCity(aCity).aLocation(aLocation).aFoundLocation(aFoundLocation).username(loginId).aContent(aContent).aIsAdopted(aIsAdopted).build();
    }
  }

  // 글 수정
  @Data
  public static class Update {
    private int ano;  // 글 수정하려면 글번호로 찾을거니까 글 번호 있어야해
    @NotNull
    private String aProfile;
    @NotNull
    private String aName;
    @Min(0)  // 0이상의 값 입력
    private int aAge;
    @NotNull
    private String aGender;
    @NotNull
    private String aBreed;
    @NotNull
    private ACity aCity;  // 상수로 뺌
    @NotNull
    private String aLocation;
    @NotNull
    private String aFoundLocation;
    @NotNull
    private String aContent;
    private boolean aIsAdopted;
  }

}
