package com.example.dogcatserver.dao;

import org.apache.ibatis.annotations.*;

@Mapper
public interface MemberWarningDao {
  // 경고/차단 기능은 sql문이 완전히 일치해서 dao 따로 뺌
  // 서비스에서는 차단/경고 작업 한 후 해당 유저의 정보를 return해서 service는 각각 생성
  
  // 경고 횟수 증가 (3일때 차단되는건 서비스에서)
  @Update("update user_member set count = count+1 where username=#{username}")
  int incWarningCount(String username);

  // 경고 횟수 감소
  @Update("update user_member set count = count-1 where username=#{username}")
  int decWarningCount(String username);

  // 현재 경고횟수 조회
  @Select("select count from user_member where username=#{username}")
  int countWarning(String username);  // 현재 경고횟수 리턴

  // 강제차단
  @Update("update user_member set is_locked = 1 where username=#{username}")
  int blockOn(String username);

  // 차단해제(경고횟수 3에서 감소시키면
  @Update("update user_member set is_locked = 0 where username=#{username}")
  int blockOff(String username);

  // 일반으로 상태 변경
  @Update("update user_member set status='NORMAL' where username=#{username}")
  int setStatusNormal(String username);

  // 경고로 상태 변경
  @Update("update user_member set status='WARNING' where username=#{username}")
  int setStatusWarning(String username);

  // 차단으로 상태 변경
  @Update("update user_member set status='BLOCK' where username=#{username}")
  int setStatusBlock(String username);

}
