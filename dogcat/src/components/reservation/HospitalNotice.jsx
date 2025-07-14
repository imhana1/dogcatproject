import React from 'react'
import './reservationComponents.css'

// 병원 공지사항 불러오는 레이아웃
function HospitalNotice() {
  return (
    <div className="notice-box">
      <h4 className="notice-title">📢 병원 공지사항</h4>
      <ul className="notice-list">
        <li>진료/미용 예약 시 예약금 5,000원이 발생합니다.</li>
        <li>예약 시간 10분 전까지 도착해 주세요.</li>
        <li>무단 노쇼 시 예약금 환불이 불가능합니다.</li>
      </ul>
    </div>
  )
}

export default HospitalNotice