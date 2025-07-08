package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface TreatDao {

    @Select("select count(*) from treat")
    int count();

    @Select("select * from treat\n" +
            "order by rno desc offset (#{pageno}-1)*#{pagesize} rows fetch next #{pagesize} rows only")
    List<Treat> findAll(int pageno, int pagesize);

    @Insert("insert into treat (tno,rno, t_title, t_writer, t_content, n_username) values(#{tno},#{rno} ,#{tTitle}, #{tWriter}, #{tContent}, #{nUsername})")
    @SelectKey(statement = "select treat_seq.nextval from dual", keyProperty = "tno", before = true , resultType = int.class)
    int save(Treat treat);

    @Select("select * from treat where rno=#{rno}")
    Optional<Treat> findByRno(int rno);

    @Delete("delete from treat where h_username=#{loginId}")
    int deleteTreat(String loginId);
}
