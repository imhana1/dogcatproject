package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface HospitalDao {


    @Insert("insert into hospital_member(h_username,director,hospital,h_tel,h_reptel,h_address,h_choice,h_location, h_longitude) values(#{hUsername}, #{director},#{hospital}," +
            "#{hTel}, #{hReptel}, #{hAddress},#{hChoice},#{hLocation},#{hLongitude})")
    int save(Hospital hospital);

    @Select("SELECT h.*, m.email FROM hospital_member h LEFT JOIN user_member m ON h.h_username = m.username WHERE h.h_username = #{loginId}")
    int findByUsername(String loginId);

    @Select("SELECT h.*, m.email FROM hospital_member h LEFT JOIN user_member m ON h.h_username = m.username WHERE h.h_username = #{loginId}")
    HospitalMemberInfo getByUsername(String loginId);

    @Update("update hospital_member set director=#{director}, hospital=#{hospital}, h_tel=#{hTel}, h_reptel=#{hReptel},h_address=#{hAddress}," +
            "h_choice=#{hChoice}, h_profile=#{hProfile},open_time=#{openTime},close_time=#{closeTime},d_profile=#{dProfile},h_Introduction=#{hIntroduction}," +
            "h_location=#{hLocation},h_longitude=#{hLongitude} where h_username=#{hUsername}")
    int changeInfo(Hospital hospital);

    @Select("Select h_username from hospital_member")
    List<String> findAllUserNames();

}
