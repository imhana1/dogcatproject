package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.Nuser;
import com.example.dogcatserver.entity.NuserInfo;
import org.apache.ibatis.annotations.*;

@Mapper
public interface NuserDao {

    @Insert("insert into NOMAL_MEMBER(N_USERNAME, N_NAME, N_ADDRESS, N_TEL, n_birthday, N_LOCATION, N_LONGITUDE) values (#{nid}, #{nname}, #{naddr}," +
           "#{ntel}, #{nbirth}, #{nlocation}, #{nlongitude})")
    int save(Nuser nuser);

    @Select("select n.*, m.email from NOMAL_MEMBER n left join USER_MEMBER m on n.N_USERNAME = m.USERNAME where n.N_USERNAME = #{loginId}")
    int findBynUsername(String loginId);

    @Select("select n.*, m.email from NOMAL_MEMBER n left join USER_MEMBER m on n.N_USERNAME = m.USERNAME where n.N_USERNAME = #{loginId}")
    NuserInfo getBynUsername(String loginId);

    @Update("update NOMAL_MEMBER set N_TEL=#{ntel}, N_ADDRESS=#{naddr}, N_LONGITUDE=#{nlongitude}, N_LOCATION=#{nlocation}")
    void nchangeInfo(Nuser nuser);
}
