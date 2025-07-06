package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;
import org.springframework.web.multipart.*;

import java.util.*;

@Mapper
public interface HospitalDao {


    @Insert("insert into hospital_member(h_username,director,hospital,h_tel,h_reptel, ZIP, h_address,h_choice,h_location, h_longitude, h_birthday, h_subaddress) values(#{hUsername}, #{director},#{hospital}," +
            "#{hTel}, #{hReptel},#{zip}, #{hAddress},#{hChoice},#{hLocation},#{hLongitude}, #{hBirthDay}, #{hSubaddress})")
    int save(Hospital hospital);

    @Select("SELECT h.*, m.email FROM hospital_member h LEFT JOIN user_member m ON h.h_username = m.username WHERE h.h_username = #{loginId}")
    int findByUsername(String loginId);

    @Select("SELECT h.*, m.email FROM hospital_member h LEFT JOIN user_member m ON h.h_username = m.username WHERE h.h_username = #{loginId}")
    HospitalMemberInfo getByUsername(String loginId);

    @Select("select h_username from hospital_member where hospital=#{hospital}")
    String findhUsername(String hospital);

    int changeInfo(HospitalMemberInfo hospitalMemberInfo);

    @Select("Select h_username from hospital_member")
    List<String> findAllUserNames();

    @Select("select h_location, h_longitude from hospital_member where h_address=#{hAddress}")
    Hospital findAddress(String hAddress);



    @Delete("delete from hospital_member where h_username=#{loginId}")
    int deletehospital(String loginId);

}
