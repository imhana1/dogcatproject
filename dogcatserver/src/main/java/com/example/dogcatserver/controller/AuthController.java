package com.example.dogcatserver.controller;

import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import lombok.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.security.*;
import java.util.*;

@RequiredArgsConstructor
@RestController
public class AuthController {
  @Autowired
  private AuthCheckService authCheckService;

  // username, role 내보냄
  @GetMapping("/api/auth/check")
  public ResponseEntity<Map<String, Object>> checkLogin(Principal principal) {
    if(principal!=null) {
      String username = principal.getName();
      Role role = authCheckService.findUsernameAndRoleByUsername(username).getRole();
      return ResponseEntity.ok(Map.of("username", username, "role", role));
    }
    return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
  }
}
