package com.example.dogcatserver.toss.util;

import java.nio.charset.*;
import java.util.*;

// Toss 결제에 필요한 공통 유틸리티 클래스
public class TossUtil {
  // 시크릿 키
  public static final String SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

  // 결제 승인 API URL
  public static final String CONFIRM_URL = "https://api.tosspayments.com/v2/payments/confirm";

  // 결제 생성 API URL
  public static final String CREATE_URL = "https://api.tosspayments.com/v2/payments";

  // Basic 인증 헤더용 Secret Key 인코딩
  public static String getEncodedAuth() {
    String auth = SECRET_KEY + ":";
    return Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));
  }
}
