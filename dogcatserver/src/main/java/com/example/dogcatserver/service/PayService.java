package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class PayService {
  @Autowired
  private PayDao payDao;

  // 결제 정보 저장
  public void savePay (Pay pay) {
    // pStatus 가 null 이면 기본값 PENDING 설정
    if (pay.getPStatus()==null) {
      pay.setPStatus(PaymentStatus.PENDING);
    }
    payDao.insertPay(pay);
  }

  // 주문번호 (orderNo) 로 결제 정보 조회
  public Pay selectPayByOrderId (String orderNo) {
    Pay pay = payDao.selectPayByOrderId(orderNo);
    if (pay == null){
      throw new PayNotFoundException("결제 정보를 찾을 수 없습니다." + orderNo);
    }
    return pay;
  }

  // 결제 실패 상태로 업데이트
  public void updateFailStatus(String orderNo) {
    payDao.updatePayByStatus(orderNo, PaymentStatus.FAILED);
  }

  // 결제 성공 상태로 업데이트
  public void updateSuccessStatus(String orderNo) {
    payDao.updatePayByStatus(orderNo, PaymentStatus.COMPLETED);
  }

  // 병원 아이디로 결제 내역 조회
  public List<Pay> getPayByHospitalId(String hUsername) {
    return payDao.selectPayByHospitalId(hUsername);
  }

}
