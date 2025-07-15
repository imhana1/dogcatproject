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

// 미용 예약 페이지 
function BeautyReservation() {
  const location = useLocation();
  const navigate = useNavigate();

  // ReservationWrite에서 받은 정보
  const { username, petName, rCondition, remark, hUsername } = location.state || {};

  // 날짜, 시간 선택 상태
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // 시간 블락 가져오기
  const [unavailableTimes, setUnavailableTimes] = useState([]);

  // 블락된 시간 가져오기
  useEffect(()=> {
    if(selectedDate && hUsername) {
      fetch(`/reservation/unavailable-times?date=${selectedDate}&hUsername=${hUsername}`)
      .then((res)=> res.json())
      .then((data)=> {
        setUnavailableTimes(data.unavailableTimes)
      })
      .catch((err)=> {
        console.log('시간 블락 정보 불러오기 실패', err);
      })
    }
  },[selectedDate, hUsername]);

  // 예약금 결제 상태 (예: 'PENDING', 'DONE' 등)
  const [paymentStatus, setPaymentStatus] = useState('PENDING')

const handleReservationSubmit = () => {
  if (!selectedDate || !selectedTime) {
    alert('날짜와 시간을 선택해 주세요.');
    return;
  }

  // 예약 정보 백엔드에 저장
  fetch('/reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,         // 보호자 ID
      petName,
      rCondition,
      remark,
      hUsername,
      sChoice: '진료', 
      schedule: `${selectedDate}T${selectedTime}`, // ← LocalDateTime 형식
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error('예약 저장 실패');
      return res.text(); // ex: "예약번호: 102"
    })
    .then(result => {
      console.log(result);
      // 여기서 결제 API가 성공했다고 가정한 후 예약 저장을 시도함
      setPaymentStatus('DONE');
      navigate('/reservation/complete', {
        state: { username, petName, rCondition, remark, selectedDate, selectedTime },
      });
    })
    .catch(err => {
      alert('예약 처리 실패: ' + err.message);
    });
};

  return (
    <>
      <ReservationHeader />
      <div style={{ padding: '20px' }}>
        
        {/* 단계 표시 : 2단계 */}
        <StepIndicator currentStep={2} />

        <HospitalNotice />

        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />

        <TimeSelector
          reservationType="beauty"
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
