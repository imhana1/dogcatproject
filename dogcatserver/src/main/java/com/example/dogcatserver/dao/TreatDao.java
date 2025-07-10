package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface TreatDao {

    // 행의 개수
    @Select("select count(*) from treat")
    int count();
    // 리스트 전체를 불러오는 기능
    @Select("select * from treat\n" +
            "order by rno desc offset (#{pageno}-1)*#{pagesize} rows fetch next #{pagesize} rows only")
    List<Treat> findAll(int pageno, int pagesize);

    // 진료 내역 작성
    @Insert("insert into treat (tno,rno, t_title, t_writer, t_content, n_username) values(#{tno},#{rno} ,#{tTitle}, #{tWriter}, #{tContent}, #{nUsername})")
    @SelectKey(statement = "select treat_seq.nextval from dual", keyProperty = "tno", before = true , resultType = int.class)
    int save(Treat treat);

    // rno에 해당하는 진료내역 읽기
    @Select("select * from treat where rno=#{rno}")
    Optional<Treat> findByRno(int rno);

    @Select("select count(*) from treat where rno=#{rno} ")
    int countRnoTreat(Integer rno);

    @Delete("delete from treat where t_writer=#{loginId}")
    int deleteTreat(String loginId);

    @Delete("delete from treat where n_username=#{loginId}")
    int deleteNtreat(String loginId);

}
