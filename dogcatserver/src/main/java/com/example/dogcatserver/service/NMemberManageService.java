package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import com.example.dogcatserver.util.*;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class NMemberManageService {
  @Autowired
  private NMemberManageDao manageDao;

  // 블록 사이즈는 5로 고정
  private static final int BLOCK_SIZE = 5;

  // 전체 목록 출력
  public NMemberManageDto.Pages findAllNormalMember(int pageno, int pagesize) {
    int totalCount = manageDao.countAllNormalMember();
    List<NMemberManageDto.NormalMemberList> normalMemberList = manageDao.findAllNormalMember(pageno, pagesize);
    return NMemberManageUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, normalMemberList);
  }

  // 상태별 목록 출력
  public NMemberManageDto.Pages findAllNormalMemberByStatus(int pageno, int pagesize, String status) {
    int totalCount = manageDao.countAllNormalMember();
    List<NMemberManageDto.NormalMemberList> normalMemberList = manageDao.findAllNormalMemberByStatus(pageno, pagesize, status);
    return NMemberManageUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, normalMemberList);
  }

  // 회원 검색결과에 따른 목록 출력
  public NMemberManageDto.Pages findNormalMemberByWord(int pageno, int pagesize, String searchWord, String searchType) {
    int totalCount = manageDao.countSearchMember(searchWord, searchType);
    List<NMemberManageDto.NormalMemberList> searchMemberList = manageDao.findNormalMemberByWord(pageno, pagesize, searchWord, searchType);
    return NMemberManageUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, searchMemberList);
  }

  // 회원 상세보기
  public NMemberManageDto.NormalMemberDetails findNormalMemberByUsername(String username) {
    NMemberManageDto.NormalMemberDetails normalMemberDetails = manageDao.findNormalMemberByUsername(username);
    if (normalMemberDetails == null) {
      throw new EntityNotFoundException("사용자를 찾을 수 없습니다.");  // 이상한 username 입력 에러처리
    }
    return normalMemberDetails;
  }

  // 경고 횟수 증가 (3 이상일 때 막는 건 프론트)
  public NMemberManageDto.NormalMemberDetails incWarningCount(String username) {
    // 경고횟수 증가 먼저
    manageDao.incWarningCount(username);

    // 경고 횟수 증가 후 횟수가 3 이상이면 차단으로 바꿀거야
    int currentCount = manageDao.countWarning(username);
    if (currentCount >= 3) {
      manageDao.blockOn(username);
    }

    // 해당 회원의 상세정보 반환
    return manageDao.findNormalMemberByUsername(username);
  }

  // 경고 횟수 감소 (0 이하일 때 막는 건 프로트)
  public NMemberManageDto.NormalMemberDetails decWarningCount(String username) {
    // 현재 경고횟수 파악
    int currentCount = manageDao.countWarning(username);
    // 경고횟수가 3 이상이면 감소 후 차단 해제
    if (currentCount >= 3) {
      manageDao.decWarningCount(username);
      manageDao.blockOff(username);  // 이 경우는 경고 횟수 증가로 인해 차단되었던 회원의 경고 횟수 감소시킬때를 생각해서 넣음
    } else {  // 3 미만이면 감소만 하고 끝
      manageDao.decWarningCount(username);
    }
    // 해당 회원의 상세정보 반환
    return manageDao.findNormalMemberByUsername(username);
  }

  // 강제 차단
  public NMemberManageDto.NormalMemberDetails blockOn(String username) {
    int result = manageDao.blockOn(username);
    // 실패했으면 예외
    if (result == 0) {
      throw new JobFailException("차단에 실패하였습니다");
    }
    return manageDao.findNormalMemberByUsername(username);
  }

  // 차단 해제
  public NMemberManageDto.NormalMemberDetails blockOff(String username) {
    int result = manageDao.blockOff(username);
    // 실패했으면 예외
    if(result==0) {
      throw new JobFailException("차단 해제에 실패하였습니다.");
    }
    return manageDao.findNormalMemberByUsername(username);
  }
}
