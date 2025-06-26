package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface AdoptionDao {
  // 전체 글 목록 불러오기
  List<Adoption> findAllAdoption(int pageno, int pagesize);

  // 지역분류 글 목록 불러오기
  List<Adoption> findAllAdoptionByACity(ACity aCity, int pageno, int pagesize);

  // 글 등록 (+ 사진)
  int writeAdoption(Adoption adoption);

  // 단일 글 읽어오기
  @Select("select * from adoption where ano=#{ano}")
  Optional<Adoption> findAdoptionByAno(int ano);

  // 글 수정: 다.. 진짜?
  int updateAdoption(AdoptionDto.Update update);

  // 글 삭제
  @Delete("delete from adoption where ano=#{ano}")
  int deleteAdoptionByAno(int ano);

  // 총 글 개수 세기
  @Select("select count(*) from adoption")
  int countAllAdoption();


}
