package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface UseMemberDao {
    // 같은 이름의 아이디 찾기
    @Select("Select count(*) from user_member where username=#{username}")
    boolean existsByUsername(String username);


    @Insert("insert into user_member(username, e_code, email)values(#{username}, #{eCode}, #{email})")
    int emailSave(UseMember useMember);

    @Select("Select count(*) from user_member where e_code=#{code}")
    boolean existsByCode(String code);

    @Update("update user_member set is_locked=0 where username=#{username}")
    int changeIsLocked(String username);

    @Select("select username from user_member where e_code=#{code}")
    String findUsernameByCode(String code);

    @Update("update user_member set password=#{password},role=#{role}, status=#{status}, count=#{count}, sign_dt=#{signDt} where username=#{username}")
    int signupUpdate(UseMember useMember);

    @Select("select username, password, role, is_locked from user_name where username=#{username}")
    Optional<UseMember>loadLoginData(String username);
}

