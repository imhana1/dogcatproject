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

  @Autowired
  private PayDao payDao;

  @Autowired
  private TossPaymentApiCaller tossPaymentApiCaller;

  @Autowired
  private ReservationDao reservationDao;

  // 결제 생성
  public TossPaymentCreateResponseDto createPayment(TossPaymentCreateRequestDto dto) {
    // orderId 에 예약 번호 포함 시키기
    String orderNoWithRno = dto.getOrderNo() + "_rno_" + dto.getRno();
    return tossPaymentApiCaller.createPayment(
      orderNoWithRno,
      dto.getAmount(),
      dto.getProductDesc(),
      dto.getRetUrl(),
      dto.getRetCancelUrl()
    );
  }

  // 결제 승인
  public TossPaymentConfirmResponseDto confirmPayment(String paymentKey, String orderNo, int amount) {
    System.out.println(">>> confirmPayment 호출됨");
    System.out.println("paymentKey = " + paymentKey);
    System.out.println("orderNo = " + orderNo);
    System.out.println("amount = " + amount);

    // 예약 번호  + 예외처리
    int rno = 0;
    try {
      String[] parts = orderNo.split("_rno_");
      if(parts.length < 2) {
        throw new IllegalArgumentException("orderId 에 rno 가 포함되어 있지 않습니다." + orderNo);
      }
      rno = Integer.parseInt(parts[1]);
    } catch (NumberFormatException e) {
      throw new IllegalArgumentException("rno 파싱 실패" + orderNo, e);
    }


    // 예약 번호로 예약 정보 조회
    Reservation reservation = reservationDao.selectReservationByRno(rno);
      // 예외처리
    if (reservation == null) {
      throw new IllegalArgumentException("예약 정보를 찾을 수 없습니다: " + rno);
    }

    // 예약 정보에서 병원 아이디와 고객 아이디 가져오기
    String hUsername = reservation.getHUsername();
    String nUsername = reservation.getNUsername();

    // 토스 API에 결제 승인 요청
    TossPaymentConfirmResponseDto responseDto;
    // 예외 처리
    try {
      responseDto = tossPaymentApiCaller.confirmPayment(paymentKey, orderNo, amount);
    } catch (Exception e) {
      throw new RuntimeException("토스 결제 승인 중 오류 발생" + e.getMessage(), e);
    }

    // Pay 엔티티 생성 및 DB 저장
    Pay pay = Pay.builder()
      .rno(rno)
      .hUsername(hUsername)
      .nUsername(nUsername)
      .orderNo(orderNo)
      .paymentKey(paymentKey)
      .amount(amount)
      .pStatus(responseDto.getPStatus())
      .build();
    service.savePay(pay);

    return responseDto;
  }

  // 결제 실패
  public void updateFailStatus(String orderId) {
    service.updateFailStatus(orderId);
  }

  // 결제 성공
  public void updateSuccessStatus (String orderId) {
    service.updateSuccessStatus(orderId);
  }

  // 결제 취소 상태 업데이트
  public void updateCancelStatus (String orderId) {
    payDao.updatePayByStatus(orderId, PaymentStatus.CANCELLED);
  }

  // 결제 취소
  public void cancelPayment(TossPaymentCancelRequestDto dto) {
    tossPaymentApiCaller.cancelPayment(
      dto.getPaymentKey(),
      dto.getCancelReason(),
      dto.getCancelAmount()
    );

    // db 상태 업데이트
    service.updateCancelStatus(orderId);
  }
}