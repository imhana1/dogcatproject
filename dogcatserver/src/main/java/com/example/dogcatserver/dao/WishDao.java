package com.example.dogcatserver.dao;

import org.apache.ibatis.annotations.*;

@Mapper
public interface WishDao {
  // 테이블에 존재하는지 찾아
  @Select("select * from wish where ano=#{ano} and username=#{username}")
  int findFromWish(int ano, String username);

  // 찜하기
  @Insert("insert into wish values(#{ano}, #{username})")
  int addWishByAno(int ano, String username);

  // 찜취소
  @Delete("delete from wish where ano=#{ano} and username=#{username}")
  int removeWishByAno(int ano, String username);
}
