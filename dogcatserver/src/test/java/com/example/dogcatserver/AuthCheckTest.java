package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;

@SpringBootTest
public class AuthCheckTest {
  @Autowired
  private AuthCheckDao authCheckDao;

//  @Test
  public void findUsernameAndRoleByUsernameTest1() {
    authCheckDao.findUsernameAndRoleByUsername("winter");
  }

//  @Test
  public void findUsernameAndRoleByUsernameTest2() {
    authCheckDao.findUsernameAndRoleByUsername("admin");
  }
}
