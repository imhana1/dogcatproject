package com.example.dogcatserver.hosDao;

import org.apache.ibatis.annotations.*;

@Mapper
public interface HospitalDao {
    @Select("Select count(*) from bmember where username=#{username}")
    boolean existsByUsername(String username);
}
