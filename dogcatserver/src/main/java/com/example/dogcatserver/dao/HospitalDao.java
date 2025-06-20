package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

@Mapper
public interface HospitalDao {


    @Insert("insert into hospital_member(h_username,director,hospital,h_tel,h_reptel,h_address,h_choice) values(#{hUsername}, #{director},#{hospital}," +
            "#{hTel}, #{hReptel}, #{hAddress},#{hChoice})")
    int save(Hospital hospital);
}
