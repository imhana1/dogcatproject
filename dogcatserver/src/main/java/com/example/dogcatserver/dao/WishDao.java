package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface WishDao {
  // 테이블에 존재하는지 찾아
  @Select("select count(*) from wish where ano=#{ano} and username=#{username}")
  int findFromWish(int ano, String username);

  // 찜하기
  @Insert("insert into wish values(#{ano}, #{username})")
  int addWishByAno(int ano, String username);

  // 찜취소
  @Delete("delete from wish where ano=#{ano} and username=#{username}")
  int removeWishByAno(int ano, String username);

  @Select("select count(*) from WISH where USERNAME=#{username}")
  int AdoptionLike();

  @Select("select w.ano, w.username, a.a_profile, a.a_name, a.a_city from WISH w join adoption a on w.ano = a.ano where w.USERNAME=#{loginId} ORDER BY w.ANO DESC\n" +
          "OFFSET (#{pageno} - 1) * #{pagesize} ROWS\n" +
          "FETCH NEXT #{pagesize} ROWS ONLY")
  List<Wish> AdoptionLikeList(int pageno, int pagesize, String loginId);
}
