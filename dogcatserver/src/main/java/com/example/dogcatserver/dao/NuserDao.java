package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.Nuser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface NuserDao {
    @Select("select count(*) from NOMAL_MEMBER where NUSERNAME=#{nid}")
    boolean existsBynId(String username);

    int save(Nuser nuser);
}
