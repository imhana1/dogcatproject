import React from 'react'
import './reservationComponents.css'

// 예약 및 예약금 결제하는 버튼
function SubmitReservationButton({ disabled, onClick }) {
  return (
    <button
      className={`submit-reservation-btn ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      예약 및 예약금 결제하기
    </button>
  )
}

export default SubmitReservationButton
