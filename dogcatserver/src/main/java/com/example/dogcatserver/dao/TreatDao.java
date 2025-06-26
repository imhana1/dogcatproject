package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface TreatDao {

    @Insert("insert into treat (tno, t_title, t_writer, t_content) values(#{tno},#{tTitle},#{tWriter}, #{tContent})")
    @SelectKey(statement = "select treat_seq.nextval from dual", keyProperty = "tno", before = true , resultType = int.class)
    int save(Treat treat);

    @Select("select * from treat where tno=#{tno}")
    Optional<Treat> findbyTno(int tno);
}
