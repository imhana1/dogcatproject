package com.example.dogcatserver.toss.controller;

import com.example.dogcatserver.entity.Pay;
import com.example.dogcatserver.entity.PaymentStatus;
import com.example.dogcatserver.service.PayService;
import com.example.dogcatserver.service.ReservationService;
import com.example.dogcatserver.toss.dto.*;
import com.example.dogcatserver.toss.exception.AlreadyCanceledException;
import com.example.dogcatserver.toss.exception.PaymentNotFoundException;
import com.example.dogcatserver.toss.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import lombok.Getter;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.security.core.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TossPaymentController {

  @Autowired
  private TossPaymentService service;
  @Autowired
  private PayService payService;
  @Autowired
  private ReservationService reservationService;

  // 결제 생성 api
  @Operation(summary = "결제 생성 요청", description = "결제를 위한 토스 API 생성")
  @PostMapping("/api/toss/create")
  public ResponseEntity<TossPaymentCreateResponseDto> createPayment (@Valid @RequestBody TossPaymentCreateRequestDto dto) {
    return ResponseEntity.ok(service.createPayment(dto));
  }

  // 결제 승인 api
  @Operation(summary = "결제 승인 요청", description = "결제를 보내고 승인을 받기 위한 API 호출")
  @PostMapping("/api/toss/confirm")
  public ResponseEntity<TossPaymentConfirmResponseDto> confirmPayment (@RequestBody TossPaymentConfirmRequestDto dto) {

    // 이거 콘솔에 찍어보자!
    System.out.println("✔ paymentKey: " + dto.getPaymentKey());
    System.out.println("✔ orderId: " + dto.getOrderId());
    System.out.println("✔ amount: " + dto.getAmount());
    System.out.println("✔ rno: " + dto.getRno());

    TossPaymentConfirmResponseDto response = service.confirmPayment(
        dto.getPaymentKey(),
        dto.getOrderId(),
        dto.getAmount()
    );

    // 토스 승인 성공 시 Pay 테이블과 Reservation 테이블 업데이트
    if(response !=null && "DONE".equals(response.getPStatus())) {
      try {
        int rno = dto.getRno();

        reservationService.processPaymentConfirmation(
                rno,
                dto.getOrderId(),
                dto.getPaymentKey(),
                dto.getAmount()
        );
      } catch(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
    } else {
//      payService.updateFailStatus(dto.getOrderId(), PaymentStatus.FAILED);
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    return ResponseEntity.ok(response);
  }

  // 결제 실패 상태 업데이트 (토스 쪽에서 실패 콜백을 줄 때 호출 가능)
  // void 인 이유 : HTTP 응답 본문이 없다는 뜻 (결제 실패나 성공을 알리는 단순한 응답이라 별도의 데이터가 필요하지 않음)
  // ResponseEntity<Void> : 응답 본문 없이 상태 코드만 반환
  // ResponseEntity<무언가> : 응답 본문과 함께 상태 코드 반환
  @Operation(summary = "결제 실패 리턴", description = "결제 실패 되면 돌아오는 리턴 값 노출")
  @PostMapping("/api/toss/fail/{orderNo}")
  public ResponseEntity<Void> updateFailStatus(@PathVariable String orderNo) {
    service.updateFailStatus(orderNo);
    return ResponseEntity.ok().build();
  }

  @Operation(summary = "결제 성공 리턴", description = "결제가 성공되면 성공한 메시지 출력")
  @PostMapping("/api/toss/success/{orderNo}")
  public ResponseEntity<Void> updateSuccessStatus (@PathVariable String orderNo) {
    service.updateSuccessStatus(orderNo);
    return ResponseEntity.ok().build();
  }

  @Operation(summary = "결제 취소 요청", description = "paymentKey 와 사유를 기반으로 결제 취소 요청하기")
  @PostMapping("/api/toss/cancel")
  public ResponseEntity<String> cancelPayment(@Valid @RequestBody TossPaymentCancelRequestDto dto) {
    System.out.println("취소 요청 도착");
    System.out.println("paymentKey = " + dto.getPaymentKey());
    System.out.println("orderId = " + dto.getOrderId());
    System.out.println("amount = " + dto.getCancelAmount());
    System.out.println("rno = " + dto.getRno());
    service.cancelPayment(dto);
    return ResponseEntity.ok("결제가 정상적으로 취소되었습니다");
  }

  @Operation(summary = "결제 내역 불러오기", description = "마이페이지에서 사용자 결제 내역 조회")
  @GetMapping("/api/toss/payments/user/{nUsername}")
  public ResponseEntity<List<Pay>> getPaymentsByUser(@PathVariable String nUsername) {
    List<Pay> payments = payService.getPayByNUsername(nUsername);
    return ResponseEntity.ok(payments);
  }
}
