package com.example.dogcatserver.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface NuserDao {
    @Select("select count(*) from NOMAL_MEMBER where NUSERNAME=#{nid}")
    boolean existsBynId(String nid);
}
