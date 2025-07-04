package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.Nuser;
import com.example.dogcatserver.entity.NuserInfo;
import org.apache.ibatis.annotations.*;

@Mapper
public interface NuserDao {

    @Insert("insert into NORMAL_MEMBER(N_USERNAME, N_NAME, zip, N_ADDRESS, N_TEL, n_birthday, N_LOCATION, N_LONGITUDE) values (#{nid}, #{nname}, #{zip}, #{naddr}," +
           "#{ntel}, #{nbirth}, #{nlocation}, #{nlongitude})")
    int save(Nuser nuser);

    @Select("select n.*, m.email from NORMAL_MEMBER n left join USER_MEMBER m on n.N_USERNAME = m.USERNAME where n.N_USERNAME = #{loginId}")
    int findBynUsername(String loginId);

    @Select("select n.n_username as nid, n.n_name as nname, n_tel as ntel, n_address as naddr, n_birthday as nbirth, m.email from NORMAL_MEMBER n left join USER_MEMBER m on n.N_USERNAME = m.USERNAME where n.N_USERNAME = #{loginId}")
    NuserInfo getBynUsername(String loginId);

    @Update("update NORMAL_MEMBER set N_TEL=#{ntel}, N_ADDRESS=#{naddr}, N_LONGITUDE=#{nlongitude}, N_LOCATION=#{nlocation} where N_USERNAME=#{nid}")
    void nchangeInfo(Nuser nuser);

    @Delete("delete from NORMAL_MEMBER where N_USERNAME=#{loginId}")
    int delete(String loginId);
}
