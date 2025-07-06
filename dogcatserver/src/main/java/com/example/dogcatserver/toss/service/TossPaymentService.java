package com.example.dogcatserver.toss.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import com.example.dogcatserver.toss.dto.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class TossPaymentService {
  @Autowired
  private PayService service;
  // 생성자 주입
  private final PayDao payDao;
  private final TossPaymentApiCaller tossPaymentApiCaller;

  // 의존성 초기화
  public TossPaymentService(PayDao payDao, TossPaymentApiCaller tossPaymentApiCaller) {
    this.payDao = payDao;
    this.tossPaymentApiCaller = tossPaymentApiCaller;
  }

  // 결제 생성
  public TossPaymentCreateResponseDto createPayment(TossPaymentCreateRequestDto dto) {
    return tossPaymentApiCaller.createPayment(
      dto.getOrderNo(),
      dto.getAmount(),
      dto.getProductDesc(),
      dto.getRetUrl(),
      dto.getRetCancelUrl()
    );
  }

  // 결제 승인
  public TossPaymentConfirmResponseDto confirmPayment (String paymentKey, String orderNo, int amount) {
    TossPaymentConfirmResponseDto responseDto = tossPaymentApiCaller.confirmPayment(paymentKey, orderNo, amount);

    // 응답 정보를 Pay 엔티티로 변환해서 DB 저장
    Pay pay = Pay.builder()
      .orderNo(orderNo)
      .paymentKey(paymentKey)
      .amount(amount)
      .pStatus(PaymentStatus.PENDING)
      .build();

    // db 저장
    service.savePay(pay);

    return responseDto;
  }

  // 결제 실패
  public void updateFailStatus(String orderId) {
    payDao.updatePayByStatus(orderId, PaymentStatus.FAILED);
  }

  // 결제 성공
  public void updateSuccessStatus (String orderId) {
    payDao.updatePayByStatus(orderId, PaymentStatus.COMPLETED);
  }
}