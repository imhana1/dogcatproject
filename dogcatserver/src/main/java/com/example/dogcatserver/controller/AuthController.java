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
    if(principal != null) {
      String username = principal.getName();

      // authCheckService를 통해 Role Enum 객체를 가져옵니다.
      Role userRoleEnum = authCheckService.findUsernameAndRoleByUsername(username).getRole();

      // ✅ 수정: Role Enum을 String으로 변환하면서 ROLE_ 프리픽스를 붙입니다.
      String roleString = null;
      if (userRoleEnum != null) {
        roleString = "ROLE_" + userRoleEnum.name(); // 예: HOSPITAL -> "ROLE_HOSPITAL"
      }

      // HashMap을 사용하여 응답 Map을 구성합니다.
      Map<String, Object> responseBody = new HashMap<>();
      responseBody.put("username", username);
      responseBody.put("role", roleString); // ✅ 변환된 roleString 사용

      return ResponseEntity.ok(responseBody);
    }
    // principal이 null이면 로그인되지 않은 상태이므로 CONFLICT (또는 UNAUTHORIZED) 반환
    return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
  }
}
