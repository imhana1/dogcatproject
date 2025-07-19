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
      System.out.println("[TossPaymentApiCaller.confirmPayment] --- Request Data ---");
      System.out.println("paymentKey: " + paymentKey);
      System.out.println("orderNo: " + orderNo);
      System.out.println("amount: " + amount);
      System.out.println("------------------------------------");


      // JSON 문자열로 변환
      String requestBody = objectMapper.writeValueAsString(requestMap);

      // 요청 엔티티 생성
      HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

      // POST 방식으로 API 호출
      return restTemplate.postForObject(tossProperties.getConfirmUrl(), request, TossPaymentConfirmResponseDto.class);
    } catch (HttpClientErrorException e) {
      System.err.println("[TossPaymentApiCaller.confirmPayment] Error Response from Toss API:");
      System.err.println("HTTP Status Code: " + e.getStatusCode());
      System.err.println("Response Body: " + e.getResponseBodyAsString());
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
      System.err.println("[TossPaymentApiCaller.createPayment] Error calling RestTemplate:");
      System.err.println("Error details: " + e.getMessage());
      if (e instanceof HttpClientErrorException) {
        HttpClientErrorException hce = (HttpClientErrorException) e;
        System.err.println("HTTP Status Code: " + hce.getStatusCode());
        System.err.println("Response Body: " + hce.getResponseBodyAsString());
      }
      throw new RuntimeException("RestTemplate 호출 실패", e);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("JSON 직렬화 실패", e);
    }
  }

  // 결제 취소
  public void cancelPayment(String paymentKey, String cancelReason, int cancelAmount) {
    // 1. 토스 결제 취소 API URL 구성
    String url = tossProperties.getBaseUrl() + "/payments/" + paymentKey + "/cancel";

    // 인자로 받은 값들을 명확히 로그로 남깁니다.
    System.out.println("[TossPaymentApiCaller.cancelPayment] --- Incoming Request Data ---");
    System.out.println("  paymentKey: " + paymentKey);
    System.out.println("  cancelReason: " + cancelReason);
    System.out.println("  cancelAmount: " + cancelAmount);
    System.out.println("------------------------------------");

    // 2. HTTP 요청 헤더 준비
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("Authorization", "Basic " + AuthUtil.encodedBasicAuth(tossProperties.getSecretKey()));
    String encodedAuth = AuthUtil.encodedBasicAuth(tossProperties.getSecretKey());
    System.out.println("DEBUG: Encoded Auth String Prefix: " + (encodedAuth.length() > 20 ? encodedAuth.substring(0, 20) + "..." : encodedAuth));

    // 3. 요청 바디에 담을 데이터 준비 (취소 사유 및 금액)
    Map<String, Object> body = new HashMap<>();
    body.put("cancelReason", cancelReason);
    body.put("cancelAmount", cancelAmount);

    try {
      // 4. 요청 바디를 JSON 문자열로 직렬화
      String requestBody = objectMapper.writeValueAsString(body);

      System.out.println("[TossPaymentApiCaller.cancelPayment] --- Request Body sent to Toss ---");
      System.out.println(requestBody);
      System.out.println("------------------------------------");


      // 5. HTTP 요청 객체 생성 (헤더 + 바디)
      HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

      // 6. RestTemplate을 사용해 POST 요청 전송
      restTemplate.postForObject(url, request, String.class);

      System.out.println("[TossPaymentApiCaller.cancelPayment] Payment cancellation successful with Toss API.");

    } catch (HttpClientErrorException e) { // RestClientException의 하위 클래스로 HTTP 상태 코드를 포함
      System.err.println("[TossPaymentApiCaller.cancelPayment] Error Response from Toss API:");
      System.err.println("HTTP Status Code: " + e.getStatusCode());         // 토스 API가 반환한 HTTP 상태 코드 (예: 400, 401, 404, 500)
      System.err.println("Response Body: " + e.getResponseBodyAsString()); // 토스 API의 상세 에러 메시지 (JSON 형태)
      System.err.println("Exception Message: " + e.getMessage());          // Java 예외의 메시지
      // 토스의 상세 에러 응답을 포함하여 RuntimeException을 던집니다.
      throw new RuntimeException("결제 취소 API 호출 실패: " + e.getResponseBodyAsString(), e);
    } catch (RestClientException e) { // 기타 RestTemplate 관련 오류 (네트워크 문제 등)
      System.err.println("[TossPaymentApiCaller.cancelPayment] Generic RestClientException:");
      System.err.println("Error Message: " + e.getMessage());
      throw new RuntimeException("결제 취소 API 호출 중 네트워크/기타 문제 발생", e);
    } catch (JsonProcessingException e) {
      System.err.println("[TossPaymentApiCaller.cancelPayment] JSON Transformation Failed:");
      System.err.println("Error Message: " + e.getMessage());
      throw new RuntimeException("JSON 변환 실패", e);
    }
  }

}