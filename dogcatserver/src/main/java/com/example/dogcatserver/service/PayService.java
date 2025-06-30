//package com.example.dogcatserver.service;
//
//import com.example.dogcatserver.dao.*;
//import com.example.dogcatserver.dto.*;
//import lombok.*;
//import lombok.extern.slf4j.*;
//import org.json.simple.*;
//import org.springframework.http.*;
//import org.springframework.stereotype.*;
//
//import java.net.*;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class PayService {
//  private PayDao payDao;
//  private TossPaymentApiCaller caller;
//
//  // 결제 확인 및 저장
//  public PayResponseDto confirmPay (PayRequestDto request) {
//    // 결제 api 호출 및 응답 처리
//      // 1. 결제 승인 api 호출
//    ResponseEntity<String> apiResponse = caller.confirmPayment(
//      request.getPaymentKey(),
//      request.getOrderId(),
//      request.getP_price()
//    );
//      // 2. 응답 결과 처리
//    String responseBody = apiResponse.getBody();
//    log.info("결제 승인 응답: {}", responseBody);
//
//      // 3. db 저장
//
//  }
//}
