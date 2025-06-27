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
  @Autowired
  private MemberWarningDao warningDao;

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
    int currentCount = warningDao.countWarning(username);
    // 지금 경고횟수가 2면 횟수 증가 후 상태를 차단으로
    if (currentCount >= 2) {
      warningDao.incWarningCount(username);  // 경고횟수 증가
      warningDao.blockOn(username);  // isLocked를 true로
      warningDao.setStatusBlock(username);  // status를 차단으로
    } else if(currentCount>=0) { // 지금 경고횟수가 0이면 횟수 증가 후 상태를 경고로 변경
      warningDao.incWarningCount(username);  // 경고횟수 증가
      warningDao.setStatusWarning(username);  // 여기는 isLocked 안건드리고 status만 변경
    } else { // 아니면(= 지금 경고횟수가 1이면) 증가만 하고 끝(이미 상태는 경고니까)
      warningDao.incWarningCount(username);
    }

    // 해당 회원의 상세정보 반환
    return manageDao.findNormalMemberByUsername(username);
  }

  // 경고 횟수 감소 (0 이하일 때 막는 건 프로트)
  public NMemberManageDto.NormalMemberDetails decWarningCount(String username) {
    // 현재 경고횟수 파악
    int currentCount = warningDao.countWarning(username);
    if(currentCount<=0) {
      throw new JobFailException("경고 횟수가 이미 0입니다.");
    }
    // 경고횟수가 3 이상이면 감소 후 차단 해제
    if (currentCount >= 3) {
      warningDao.decWarningCount(username);  // 경고횟수 감소
      warningDao.setStatusWarning(username);  // 상태를 차단에서 경고로 바꿈
      warningDao.blockOff(username);  // 이 경우는 경고 횟수 증가로 인해 차단되었던 회원의 경고 횟수 감소시킬때를 생각해서 넣음
    } else if(currentCount<=1) {  // 감소 전 경고 횟수가 1이면 감소 후 상태 일반으로 변경
      warningDao.decWarningCount(username);  // 경고 횟수 감소
      warningDao.setStatusNormal(username);  // 상태를 일반으로 변경
    }else {  // 3 미만이면 감소만 하고 끝
      warningDao.decWarningCount(username);
    }
    // 해당 회원의 상세정보 반환
    return manageDao.findNormalMemberByUsername(username);
  }

  // 횟수를 사용하지 않는 강제차단/차단해제는 상태 변경 안건드릴거야

  // 강제 차단
  public NMemberManageDto.NormalMemberDetails blockOn(String username) {
    int result = warningDao.blockOn(username);
    // 실패했으면 예외
    if (result == 0) {
      throw new JobFailException("차단에 실패하였습니다");
    }
    return manageDao.findNormalMemberByUsername(username);
  }

  // 차단 해제
  public NMemberManageDto.NormalMemberDetails blockOff(String username) {
    int result = warningDao.blockOff(username);
    // 실패했으면 예외
    if(result==0) {
      throw new JobFailException("차단 해제에 실패하였습니다.");
    }
    return manageDao.findNormalMemberByUsername(username);
  }
}
