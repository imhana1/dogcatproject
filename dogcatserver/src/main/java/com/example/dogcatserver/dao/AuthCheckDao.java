package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

@Mapper
public interface AuthCheckDao {
  @Select("select username, role from user_member where username=#{username}")
  UseMember findUsernameAndRoleByUsername(String username);
}
