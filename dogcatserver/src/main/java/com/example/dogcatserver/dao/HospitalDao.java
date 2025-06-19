package com.example.dogcatserver.dao;

import org.apache.ibatis.annotations.*;

@Mapper
public interface HospitalDao {
    @Select("Select count(*) from user_member where username=#{username}")
    boolean existsByUsername(String username);
}
