import React from 'react'
import './reservationComponents.css'

// 예약금 안내
function PriceNotice() {
  return (
    <div className="price-notice-box">
      <h4 className="price-notice-title">예약금 환불 안내</h4>
      <p className="price-notice-text">
        예약 후 무단 노쇼 시 예약금은 환불되지 않습니다.  
        예약 변경이나 취소는 최소 24시간 전에 연락해 주세요.
      </p>
      <div className="price-amount">
        예약금 5,000원
      </div>
    </div>
  )
}

export default PriceNotice
