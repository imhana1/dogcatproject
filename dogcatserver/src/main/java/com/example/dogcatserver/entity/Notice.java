package com.example.dogcatserver.entity;

import lombok.*;

import java.util.*;

@Getter
@ToString // 작업 완료 후 삭제
public class Notice {  // 공지사항 글
  private int nno;
  private String nTitle;
  private String username;  // 작성자. user 테이블에서 받아옴
  private Date nWriteDay;
  private String nContent;
  private boolean nIsTop;
}
