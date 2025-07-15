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

// 진료 예약 페이지
function MedicalReservation() {
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
      fetch(`/api/reservation/unavailable-times?date=${selectedDate}&hUsername=${hUsername}`)
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

  // 예약 및 결제 처리 핸들러 (나중에 API 연동 예정)
  const handleReservationSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해 주세요.')
      return;
    }
    // TODO: 결제 API 호출 및 성공 시 setPaymentStatus('DONE') 처리

    // 임시로 결제 완료 상태로 변경 및 완료 페이지 이동
    setPaymentStatus('DONE')
    navigate('/reservation/complete', {
      state: { username, petName, rCondition, remark, selectedDate, selectedTime },
    })
  }

  return (
    <>
      <ReservationHeader />
      <div style={{ padding: '20px' }}>
        
        {/* 단계 표시 : 2단계 */}
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

export default MedicalReservation
