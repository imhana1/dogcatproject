package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.*;
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
    int signupNUpdate(RoleUserUsermemberResponse.RoleNormal useMember);

    @Update("update user_member set password=#{password},role=#{role}, status=#{status}, count=#{count}, sign_dt=#{signDt} where username=#{username}")
    int signupHUpdate(RoleUserUsermemberResponse.RoleHospital useMember);

    @Select("select username, password, role, is_locked from user_member where username=#{username}")
    Optional<UseMember>loadLoginData(String username);


    @Select("select username, password, email from user_member where username=#{username}")
    UseMember findUsername(String username);

    @Update("update user_member set password=#{newPassword} where username=#{username}")
    int updatePassword(String username, String newPassword);

    @Select("select password from user_member where username=#{loginId}")
    String findPasswordByUsername(String loginId);

    @Select("select username from user_member where email=#{email} and rownum=1")
    Optional<String> findUsernameByEmail(String email);

    @Delete("delete from USER_MEMBER where USERNAME=#{loginId}")
    int delete(String loginId);

    @Delete("DELETE FROM user_member WHERE password IS NULL AND sign_dt < SYSDATE - (30 / 1440) ")
    int DeleteTemporaryData ();  // 이메일 가입시 저장되는데이터 삭제

}

