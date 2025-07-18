package com.example.dogcatserver.toss.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import com.example.dogcatserver.toss.dto.*;
import com.example.dogcatserver.toss.exception.AlreadyCanceledException;
import com.example.dogcatserver.toss.exception.PaymentNotFoundException;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

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

  @Transactional // 트랜잭션 관리
  public TossPaymentConfirmResponseDto confirmPayment(String paymentKey, String orderNo, int amount, int rno) { // ✅ rno 매개변수 추가
    System.out.println(">>> confirmPayment 호출됨");
    System.out.println("paymentKey = " + paymentKey);
    System.out.println("orderNo = " + orderNo); // Toss API 호출에 필요한 orderNo 유지
    System.out.println("amount = " + amount);
    System.out.println("rno (받은 값) = " + rno); // 받은 rno 값 로그

    // rno를 orderNo에서 파싱하는 로직 제거
    // int rno = 0;
    // try { ... }

    // 예약 번호로 예약 정보 조회
    Reservation reservation = reservationDao.selectReservationByRno(rno);
    if (reservation == null) {
      throw new IllegalArgumentException("예약 정보를 찾을 수 없습니다: " + rno);
    }

    String hUsername = reservation.getHUsername();
    String nUsername = reservation.getNUsername();

    // 토스 API에 결제 승인 요청
    TossPaymentConfirmResponseDto responseDto;
    try {
      responseDto = tossPaymentApiCaller.confirmPayment(paymentKey, orderNo, amount);
    } catch (Exception e) {
      // 결제 승인 실패 시 롤백 (만약 예약 정보 저장 및 기타 DB 작업이 이 트랜잭션 내에 있다면)
      throw new RuntimeException("토스 결제 승인 중 오류 발생: " + e.getMessage(), e);
    }

    // Pay 엔티티 생성 및 DB 저장
    // Pay.builder()를 사용할 때 모든 필드에 값을 설정하는 것이 안전합니다.
    // TossPaymentConfirmResponseDto에서 가져올 수 있는 정보는 가져오고, 나머지는 null/기본값으로 설정
    Pay pay = Pay.builder()
            .rno(rno)
            .hUsername(hUsername)
            .nUsername(nUsername)
            .orderNo(orderNo)
            .paymentKey(paymentKey)
            .amount(amount)
            // ✅ 이 부분에서 사용됩니다!
            .pStatus(responseDto.getPStatus()) // Toss 응답의 PaymentStatus Enum을 String으로 변환하여 저장
            // .pStatus(responseDto.getPStatus().name()) // 또는 이렇게 직접 Enum의 name() 메서드를 호출할 수도 있습니다.
            .pUsername(responseDto.getOrderName())
            .productDesc(responseDto.getOrderName())
            .amountTaxFree((int) (responseDto.getTotalAmount() - amount))
            .autoExecute(null)
            .resultCallback(null)
            .retUrl(null)
            .retCancelUrl(null)
            .build();
     service.savePay(pay); // Pay 저장 로직 호출

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
    // 결제 내역 확인
    Pay pay = payDao.selectPayByOrderId(dto.getOrderId());
    if (pay == null) {
      throw new PaymentNotFoundException();
    }
    if(pay.getPStatus() == PaymentStatus.CANCELLED) {
      throw new AlreadyCanceledException();
    }

    // 토스 API 에 결제 취소 요청
    tossPaymentApiCaller.cancelPayment(
      dto.getPaymentKey(),
      dto.getCancelReason(),
      dto.getCancelAmount()
    );

    // db 상태 업데이트
    updateCancelStatus(dto.getOrderId());
  }
}