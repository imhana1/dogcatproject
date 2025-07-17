import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StepIndicator from '../../components/reservation/StepIndicator'
import HospitalNotice from '../../components/reservation/HospitalNotice'
import DateSelector from '../../components/reservation/DateSelector'
import TimeSelector from '../../components/reservation/TimeSelector'
import PriceNotice from '../../components/reservation/PriceNotice'
import SubmitReservationButton from '../../components/reservation/SubmitReservationButton'
import ReservationHeader from '../../fragments/reservation/ReservationHeader'
import ReservationFooter from '../../fragments/reservation/ReservationFooter'
import useAuthStore from '../../stores/useAuthStore'
import { v4 as uuidv4 } from 'uuid'

// 미용 예약 페이지 
function BeautyReservation() {
  const location = useLocation();
  const checkAuth = useAuthStore(state => state.checkAuth);

   useEffect(() => {
      checkAuth();
   }, []);
  const { username, pName, rCondition, remark, hUsername } = location.state || {};
  console.log("병원 아이디 : ", hUsername);
  // 날짜 및 시간 선택 상태
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // 블락된 시간 목록 상태
  const [unavailableTimes, setUnavailableTimes] = useState([]);

  // 결제 상태
  const [paymentStatus, setPaymentStatus] = useState('PENDING');

  // 날짜와 병원 아이디가 선택되면 해당 날짜의 예약 불가능한 시간 목록 요청
  useEffect(() => {
    if (selectedDate && hUsername) {
      fetch(`/api/reservation/unavailable-times?date=${selectedDate}&hUsername=${hUsername}`, { credentials : 'include'})
        .then(res => res.json())
        .then(data => setUnavailableTimes(data.unavailableTimes || []))
        .catch(err => console.error('시간 블락 정보 불러오기 실패', err));
    }
  }, [selectedDate, hUsername]);

  // 예약 및 결제 처리
  const handleReservationSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해 주세요.');
      return;
    }

    // TossPayments 객체 호출 (테스트 키 사용)
    const tossPayments = window.TossPayments('test_ck_d46qopOB89RP21PQWjDO3ZmM75y0');
    const orderId = 'Order_' + uuidv4();

    // 예약 정보 저장
    sessionStorage.setItem('reservationInfo', JSON.stringify({
      nUsername: username,
      pName: pName,
      hUsername,
      rCondition,
      remark,
      sChoice:'진료',
      schedule: `${selectedDate}T${selectedTime}:00`
    }));

    // 결제 요청
    tossPayments.requestPayment('카드', {
      amount: 5000,
      orderId,
      orderName: '예약금',
      customerName: username,
      successUrl: `http://localhost:3000/toss/success?orderId=${orderId}&amount=5000`,
      failUrl: `http://localhost:3000/toss/fail`,
    })
    .catch(error => {
      if (error.code === 'USER_CANCEL') {
        alert("결제를 취소하였습니다");
      } else {
        alert("결제 실패: " + error.message);
      }
    });
  };

  return (
    <>
      <ReservationHeader />
      <div style={{ padding: '20px' }}>
        <StepIndicator currentStep={2} />
        <HospitalNotice />
        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <TimeSelector
          reservationType="medical"
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
          unavailableTimes={unavailableTimes}
        />
        <PriceNotice />
        <div style={{ marginTop: '20px' }}>
          <strong>예약 금액: 5,000원</strong>
        </div>
        <SubmitReservationButton
          disabled={paymentStatus === 'DONE'}
          onClick={handleReservationSubmit}
        />
      </div>
      <ReservationFooter />
    </>
  )
}

export default BeautyReservation
