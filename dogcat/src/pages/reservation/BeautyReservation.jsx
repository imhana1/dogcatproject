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
  const location = useLocation()
  const navigate = useNavigate()

  // ReservationWrite.jsx 에서 넘겨받은 예약 정보
  const {
    username,
    petName,
    rCondition,
    remark,
    hUsername, // 병원 아이디
  } = location.state || {}

  // 날짜 및 시간 선택 상태
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  // 예약 불가한 시간 리스트
  const [unavailableTimes, setUnavailableTimes] = useState([])

  // 날짜 선택되면 블락된 시간 불러오기
  useEffect(() => {
    if (selectedDate && hUsername) {
      fetch(`/api/reservation/unavailable-times?date=${selectedDate}&hUsername=${hUsername}`)
        .then((res) => res.json())
        .then((data) => {
          setUnavailableTimes(data.unavailableTimes)
        })
        .catch((err) => {
          console.error('시간 블락 정보 불러오기 실패', err)
        })
    }
  }, [selectedDate, hUsername])

  // 예약금 결제 상태
  const [paymentStatus, setPaymentStatus] = useState('PENDING')

  // 예약 및 결제 처리 함수
  const handleReservationSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해 주세요.')
      return
    }

    // TODO: 결제 API 연동 필요

    setPaymentStatus('DONE')
    navigate('/reservation/complete', {
      state: {
        username,
        petName,
        rCondition,
        remark,
        selectedDate,
        selectedTime,
      },
    })
  }

  return (
    <>
      <ReservationHeader />

      <div style={{ padding: '20px' }}>
        {/* 단계 표시 */}
        <StepIndicator currentStep={2} />

        {/* 병원 공지 */}
        <HospitalNotice />

        {/* 날짜 선택 */}
        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* 시간 선택 - beauty 타입으로 전달 */}
        <TimeSelector
          reservationType="beauty"
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
          unavailableTimes={unavailableTimes}
        />

        {/* 예약금 안내 */}
        <PriceNotice />

        <div style={{ marginTop: '20px' }}>
          <strong>예약 금액: 5,000원</strong>
        </div>

        {/* 예약하기 버튼 */}
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
