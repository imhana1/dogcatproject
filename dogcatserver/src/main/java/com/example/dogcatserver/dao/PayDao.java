package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface PayDao {
  // pay 에 정보 넣기
  void insertPay (Pay pay);

  // orderId 를 사용해 pay 찾기
  Pay selectPayByOrderId (String orderNo);

  // 결제 상태를 orderId 를 이용해 업데이트 하기
  void updatePayByStatus (String orderNo, PaymentStatus p_status);

  // hUsername 을 사용해 병원 쪽에서도 pay 정보 검색
  List<Pay> selectPayByHospitalId (String hUsername);

}
