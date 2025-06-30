package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;
import org.springframework.transaction.annotation.*;

@SpringBootTest
public class MemberManageTest {
  @Autowired
  private NMemberManageDao normalDao;
  @Autowired
  private HMemberManageDao hospitaldao;
  @Autowired
  private MemberWarningDao warningDao;

  @Test
  public void findAllNormalMemberTest() {
    normalDao.findAllNormalMember(1, 20);
  }

//  @Test
  public void findAllNormalMemberByStatusTest() {
    normalDao.findAllNormalMemberByStatus(1, 20, "일반");
  }

//  @Test
  public void findNormalMemberByWordTest1() {
    normalDao.findNormalMemberByWord(1, 20, "wi", "both");
  }

//  @Test
  public void findNormalMemberByWordTest2_1() {
    normalDao.findNormalMemberByWord(1, 20, "wi", "id");
  }

//  @Test
  public void findNormalMemberByWordTest2_2() {
    normalDao.findNormalMemberByWord(1, 20, "wn", "id");  // 안뜸
  }

//  @Test
  public void findNormalMemberByWordTest3_1() {
    normalDao.findNormalMemberByWord(1, 20, "겨", "name");
  }

//  @Test
  public void findNormalMemberByWordTest3_2() {
    normalDao.findNormalMemberByWord(1, 20, "겨", "name");  // 안뜸
  }

  //  @Test
  public void countAllNormalMemberTest(){
    normalDao.countAllNormalMember();
  }

  //  @Test
  public void findNormalMemberByUsernameTest() {
    normalDao.findNormalMemberByUsername("winter");
  }

  //  @Test
  public void findNormalMemberByUsernameFailTest() {
    normalDao.findNormalMemberByUsername("spring");
  }

//  @Test
  @Transactional
  public void incCountTest() {
    warningDao.incWarningCount("winter");
  }

//  @Test
  @Transactional
  public void decCountTest() {
    warningDao.decWarningCount("winter");
  }

//  @Test
  @Transactional
  public void countWarningTest() {
    warningDao.countWarning("winter");
  }

//  @Test
  @Transactional
  public void blockOnTest() {
    warningDao.blockOn("winter");
  }

//  @Test
  @Transactional
  public void blockOffTest() {
    warningDao.blockOff("winter");
  }

//    @Test
  public void findAllHospitalMemberTest() {
      hospitaldao.findAllHospitalMember(1, 20);
  }

//    @Test
  public void findAllHospitalMemberByStatusTest() {
    hospitaldao.findAllHospitalMemberByStatus(1, 20, "일반");  // 다른 상태도 바꿔서 확인함
  }

//    @Test
  public void findHospitalMemberByWordTest1() {
    hospitaldao.findHospitalMemberByWord(1, 20, "ho", "both");
  }

//    @Test
  public void findHospitalMemberByWordTest2() {
    hospitaldao.findHospitalMemberByWord(1, 20, "ho", "id");
  }

//    @Test
  public void findHospitalMemberByWordTest3() {
    hospitaldao.findHospitalMemberByWord(1, 20, "wn", "id");  // 안뜸
  }

//    @Test
  public void findHospitalMemberByWordTest4() {
    hospitaldao.findHospitalMemberByWord(1, 20, "원", "name");
  }

//    @Test
  public void findHospitalMemberByWordTest5() {
    hospitaldao.findHospitalMemberByWord(1, 20, "겨", "name");  // 안뜸
  }

//    @Test
  public void findHospitalMemberByUsernameTest() {
    hospitaldao.findHospitalMemberByUsername("hosmember");
  }

//    @Test
  public void findHospitalMemberByUsernameFailTest() {
    hospitaldao.findHospitalMemberByUsername("spring");
  }

}
