package com.example.dogcatserver.hosDao;

import org.apache.ibatis.annotations.*;

@Mapper
public interface HospitalDao {
    @Select("Select count(*) from user_member where username=#{username}")
    boolean existsByUsername(String username);
}
