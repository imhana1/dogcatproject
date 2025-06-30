package com.example.dogcatserver.service;

import org.springframework.http.*;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.*;
import java.nio.charset.*;
import java.util.*;

public class TossPaymentApiCaller {
  // 시크릿 키
  private static final String SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

  public ResponseEntity<String> confirmPayment (String paymentKey, String orderId, String amount) throws Exception {
    String apiUrl = "https://pay.toss.im/api/v2/payments";

    // 인증 헤더
      // 왜? 인증 정보를 간단하고 표준화된 방법으로 서버에 전달하기 위해서
    String auth = SECRET_KEY + ":";
    String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));

    // 데이터 준비
    String requestBody = String.format("{\"paymentKey\":\"%s\",\"orderId\":\"%s\",\"amount\":%s}", paymentKey, orderId, amount);

    // 헤더 설정
      // "Basic " 에 공백이 없으면 에러
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Basic " + encodedAuth);
    headers.setContentType(MediaType.APPLICATION_JSON);

    // 요청 객체 생성
    HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

    // api 호출
    RestTemplate restTemplate = new RestTemplate();
    return restTemplate.postForEntity(apiUrl, request, String.class);
  }
}
