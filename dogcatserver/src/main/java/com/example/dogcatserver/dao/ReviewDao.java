package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface ReviewDao {

    @Select("select count(*) from review")
    int count();

    @Select("select rev_no, rno, rev_writer, rev_content, h_username from review\n" +
            "order by rev_no desc offset (#{pageno}-1)*#{pagesize} rows fetch next #{pagesize} rows only")
    List<Review> findAll(int pageno, int pagesize);

    @SelectKey(statement = "select review_seq.nextval from dual", keyProperty = "revNo", before = true , resultType = int.class)
    @Insert("insert into review(rev_no, rno, rev_writer, rev_write_day, rev_content, h_username)\n" +
            "values (#{revNo}, #{rno}, #{revWriter}, #{revWriteDay}, #{revContent}, #{hUsername})")

    int save(Review review);

    @Select("select * from review where rev_no = #{revNo}")
    @Results({
            @Result(property = "revNo", column = "rev_no"),
            @Result(property = "rno", column = "rno"),
            @Result(property = "rWriter", column = "rev_writer"),
            @Result(property = "writeDay", column = "rev_write_day"),
            @Result(property = "content", column = "rev_content"),
            @Result(property = "hUsername", column = "h_username")
    })
    Optional<Review> findByRevNo(int revNo);

    @Update("update review set content=#{content} where rev_no=#{revNo}")
    int update(ReviewDto.update dto);

    @Delete("delete from review where rev_no=#{revNo}")
    int delete(Integer revNo);

    @Delete("delete from review where h_username=#{loginId}")
    int AllDelete(String loginId);

    @Delete("delete from review where rev_writer=#{loginId}")
    int deleterv(String loginId);
}
