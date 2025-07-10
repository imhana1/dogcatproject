package com.example.dogcatserver.service;

import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.toss.dto.*;
import com.example.dogcatserver.toss.util.*;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.client.*;

import java.util.*;

@Component
public class TossPaymentApiCaller {

  // 필요한 객체 불러와서 객체 초기화
  private final RestTemplate restTemplate;
  private final ObjectMapper objectMapper;
  private final TossProperties tossProperties;

  public TossPaymentApiCaller(TossProperties tossProperties) {
    this.restTemplate = new RestTemplate();
    this.objectMapper = new ObjectMapper();
    this.tossProperties = tossProperties;
  }

  public TossPaymentConfirmResponseDto confirmPayment(String paymentKey, String orderNo, int amount) {
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      headers.set("Authorization", "Basic " + AuthUtil.encodedBasicAuth(tossProperties.getSecretKey()));

      // 요청 보낼 데이터 생성
      Map<String, Object> requestMap = new HashMap<>();
      requestMap.put("paymentKey", paymentKey);
      requestMap.put("orderId", orderNo);
      requestMap.put("amount", amount);

      // 데이터 보낸 거 확인하는 용도
      System.out.println("paymentKey: " + paymentKey);
      System.out.println("orderNo: " + orderNo);
      System.out.println("amount: " + amount);

      // JSON 문자열로 변환
      String requestBody = objectMapper.writeValueAsString(requestMap);

      // 요청 엔티티 생성
      HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

      // POST 방식으로 API 호출
      return restTemplate.postForObject(tossProperties.getConfirmUrl(), request, TossPaymentConfirmResponseDto.class);
    } catch (HttpClientErrorException e) {
      System.out.println("응답 상태 : " + e.getStatusCode());
      System.out.println("응답 본문 :" + e.getResponseBodyAsString());
      throw new RuntimeException("토스 결제 실패", e);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("JSON 직렬화 실패", e);
    }
  }

  // 결제 생성 API 호출하기
  public TossPaymentCreateResponseDto createPayment(String orderId, int amount, String productDesc, String successUrl, String failUrl) {
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      headers.set("Authorization", "Basic " + AuthUtil.encodedBasicAuth(tossProperties.getSecretKey()));

      Map<String, Object> requestMap = new HashMap<>();
      requestMap.put("orderId", orderId);
      requestMap.put("amount", amount);
      requestMap.put("orderName", productDesc);
      requestMap.put("successUrl", successUrl);
      requestMap.put("failUrl", failUrl);

      String requestBody = objectMapper.writeValueAsString(requestMap);
      HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

      return restTemplate.postForObject(tossProperties.getCreateUrl(), request, TossPaymentCreateResponseDto.class);
    } catch (RestClientException e) {
      throw new RuntimeException("RestTemplate 호출 실패", e);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("JSON 직렬화 실패", e);
    }
  }

  // 결제 취소
  public void cancelPayment(String paymentKey, String cancelReason, int cancelAmount) {
    String url = "http://api.tosspayments.com/v1/payments/" + paymentKey + "/cancel";

    HttpHeaders headers = new HttpHeaders();
    headers.setBasicAuth(Base64.getEncoder().encodeToString((tossProperties.getSecretKey() + ":").getBytes()));
    headers.setContentType(MediaType.APPLICATION_JSON);

    Map<String, Object> body = new HashMap<>();
    body.put("cancelReason", cancelReason);
    body.put("cancelAmount", cancelAmount);
  }
}
