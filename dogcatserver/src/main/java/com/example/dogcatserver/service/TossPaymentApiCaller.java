package com.example.dogcatserver.service;


import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.client.*;

import java.util.*;

// 토스 결제 api 호출을 담당하는 컴포넌트
@Component
public class TossPaymentApiCaller {
  // 시크릿 키
  public static final String SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

  // confirm url 로 넘길 URL
  public static final String API_URL = "https://api.tosspayments.com/v2/payments/confirm";

  // 필요한 객체 불러와서 객체 초기화
  private final RestTemplate restTemplate;
  private final ObjectMapper objectMapper;

  public TossPaymentApiCaller() {
    this.restTemplate = new RestTemplate();
    this.objectMapper = new ObjectMapper();
  }
  public ResponseEntity<String> confirmPayment (String paymentKey, String orderNo, String amount) {
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);

      headers.setBasicAuth(SECRET_KEY,"");

      // 요청 보낼 데이터 생성
      Map<String, Object> requestMap = new HashMap<>();
      requestMap.put("paymentKey", paymentKey);
      requestMap.put("orderNo", orderNo);
      requestMap.put("amount", Integer.parseInt(amount));

      // JSON 문자열로 변환
      String requestBody = objectMapper.writeValueAsString(requestMap);

      // 요청 엔티티 생성
      HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

      // POST 방식으로 API 호출
      return restTemplate.postForEntity(API_URL, request, String.class);
    } catch (RestClientException e) {
      throw new RuntimeException("RestTemplate 호출 실패", e);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("JSON 직렬화 실패", e);}
    }

}
