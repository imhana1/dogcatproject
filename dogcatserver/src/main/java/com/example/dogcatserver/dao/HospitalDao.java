package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

@Mapper
public interface HospitalDao {
    // 같은 이름의 아이디 찾기
    @Select("Select count(*) from user_member where username=#{username}")
    boolean existsByUsername(String username);


    @Insert("insert into user_member(username, e_code, email)values(#{username}, #{eCode}, #{email})")
    int emailSave(UseMember useMember);

}
