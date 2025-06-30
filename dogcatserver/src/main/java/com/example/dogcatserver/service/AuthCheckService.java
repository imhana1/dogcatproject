package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class AuthCheckService {
  @Autowired
  private AuthCheckDao authCheckDao;

  public UseMember findUsernameAndRoleByUsername(String username) {
    return authCheckDao.findUsernameAndRoleByUsername(username);
  }
}
