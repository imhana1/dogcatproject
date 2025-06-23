package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

@Mapper
public interface HospitalDao {


    @Insert("insert into hospital_member(h_username,director,hospital,h_tel,h_reptel,h_address,h_choice,h_location, h_longitude) values(#{hUsername}, #{director},#{hospital}," +
            "#{hTel}, #{hReptel}, #{hAddress},#{hChoice},#{hLocation},#{hLongitude})")
    int save(Hospital hospital);

    @Select("SELECT h.*, m.email FROM hospital_member h LEFT JOIN user_member m ON h.h_username = m.username WHERE h.h_username = #{loginId}")
    HospitalMemberInfo findByUsername(String loginId);

    @Update("update hospital_memeber set direcrtor=#{director}, hospital=#{hospital}, h_tel=#{hTel}, h_reptel=#{hR},h_address=," +
            "h_choice=, h_profile=,open_time=,close_time=,d_profile=,h_Introduction")
    int changeInfo();

}
