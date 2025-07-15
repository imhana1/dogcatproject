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
    // 1. 토스 결제 취소 API URL 구성
    //    paymentKey를 URL 경로에 넣어서 특정 결제를 취소 요청함
    String url = tossProperties.getBaseUrl() + "/payments/" + paymentKey + "/cancel";

    // 2. HTTP 요청 헤더 준비
    HttpHeaders headers = new HttpHeaders();
    // 2-1. JSON 형식의 요청임을 명시
    headers.setContentType(MediaType.APPLICATION_JSON);
    // 2-2. 토스 API 인증을 위한 Basic Auth 헤더 설정
    //     tossProperties.getSecretKey() : 시크릿 키
    //     AuthUtil.encodedBasicAuth() : Base64 인코딩된 인증 문자열 반환
    headers.set("Authorization", "Basic " + AuthUtil.encodedBasicAuth(tossProperties.getSecretKey()));

    // 3. 요청 바디에 담을 데이터 준비 (취소 사유 및 금액)
    Map<String, Object> body = new HashMap<>();
    body.put("cancelReason", cancelReason);
    // 전체 취소라면 cancelAmount를 0으로 보내거나 제외 가능
    body.put("cancelAmount", cancelAmount);

    try {
      // 4. 요청 바디를 JSON 문자열로 직렬화
      String requestBody = objectMapper.writeValueAsString(body);

      // 5. HTTP 요청 객체 생성 (헤더 + 바디)
      HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

      // 6. RestTemplate을 사용해 POST 요청 전송
      //    반환값이 필요 없다면 String.class 사용
      restTemplate.postForObject(url, request, String.class);

      // 7. (필요 시) 정상 응답 후 추가 작업 가능

    } catch (RestClientException e) {
      // 8. HTTP 호출 중 에러 발생 시 예외 처리
      throw new RuntimeException("결제 취소 API 호출 실패", e);
    } catch (JsonProcessingException e) {
      // 9. JSON 직렬화 오류 처리
      throw new RuntimeException("JSON 변환 실패", e);
    }
  }

}
