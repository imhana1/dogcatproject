package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface ReviewDao {

    @Select("select count(*) from review")
    int count();

    @Select("select rev_rno, rno, rev_writer, rev_content, h_username from review" +
            "order by rev_no desc offset (#{pageno}-1)*#{pagesize} rows fetch next #{pagesize} rows only")
    List<Review> findAll(int pageno, int pagesize);

    @SelectKey(statement = "select review_seq.nextval from dual", keyProperty = "rno", before = true , resultType = int.class)
    @Insert("insert into review(rev_rno, rno, rev_writer, write_day, rev_content, h_username) values (#{revNo}" +
            "#{rno}, #{revWriter}, #{writeDay}, #{content}, #{h_username})")
    int save(Review review);

    @Select("select * from review where rev_no #{revNo}")
    Optional<Review> findByRevNo(int revNo);

    @Update("update review set content=#{content} where rev_no=#{revNo}")
    int update(ReviewDto.update dto);

    @Delete("delete from review where rev_no=#{revNo}")
    int delete(Integer revNo);
}
