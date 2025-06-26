package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;
import org.springframework.transaction.annotation.*;

@SpringBootTest
public class NormalMemberDaoTest {
  @Autowired
  private NMemberManageDao dao;

//  @Test
  public void findAllNormalMemberTest() {
    dao.findAllNormalMember(1, 20);
  }

//  @Test
  public void findAllNormalMemberByStatusTest() {
    dao.findAllNormalMemberByStatus(1, 20, "일반");
  }

//  @Test
  public void findNormalMemberByWordTest1() {
    dao.findNormalMemberByWord(1, 20, "wi", "both");
  }

//  @Test
  public void findNormalMemberByWordTest2_1() {
    dao.findNormalMemberByWord(1, 20, "wi", "id");
  }

//  @Test
  public void findNormalMemberByWordTest2_2() {
    dao.findNormalMemberByWord(1, 20, "wn", "id");  // 안뜸
  }

//  @Test
  public void findNormalMemberByWordTest3_1() {
    dao.findNormalMemberByWord(1, 20, "겨", "name");
  }

//  @Test
  public void findNormalMemberByWordTest3_2() {
    dao.findNormalMemberByWord(1, 20, "겨", "name");  // 안뜸
  }

//  @Test
  @Transactional
  public void incCountTest() {
    dao.incWarningCount("winter");
  }

//  @Test
  @Transactional
  public void decCountTest() {
    dao.decWarningCount("winter");
  }

//  @Test
  @Transactional
  public void countWarningTest() {
    dao.countWarning("winter");
  }

//  @Test
  @Transactional
  public void blockOnTest() {
    dao.blockOn("winter");
  }

//  @Test
  @Transactional
  public void blockOffTest() {
    dao.blockOff("winter");
  }

//  @Test
  public void countAllNormalMemberTest(){
    dao.countAllNormalMember();
  }

//  @Test
  public void findNormalMemberByUsernameTest() {
    dao.findNormalMemberByUsername("winter");
  }

//  @Test
  public void findNormalMemberByUsernameFailTest() {
    dao.findNormalMemberByUsername("spring");
  }
}
