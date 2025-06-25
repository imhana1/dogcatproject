package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

public class AdoptionDao {
  // 전체 글 목록 불러오기
  List<Adoption> findAllAdoption(int pageno, int pagesize);

  // 지역분류 글 목록 불러오기

  // 글 등록 (+ 사진)

  // 단일 글 읽어오기

  // 찜하기

  // 찜취소
}
