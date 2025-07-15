import React from 'react'
import './reservationComponents.css'

// 시간 선택 버튼 컴포넌트
// props:
// - reservationType: 예약 종류 ('medical' 또는 'beauty')
// - selectedDate: 선택된 날짜
// - selectedTime: 현재 선택된 시간
// - onTimeChange: 시간 선택 시 실행할 함수
function TimeSelector({ reservationType, selectedDate, selectedTime, onTimeChange, unavailableTimes = [] }) {

  // 날짜가 선택되지 않았을 경우 안내 메시지를 보여줌 (시간 버튼 비활성화)
  if (!selectedDate) {
    return (
      <div className="time-selector disabled">
        <h4 className="section-title">🕒 시간 선택</h4>
        <p className="disabled-text">먼저 날짜를 선택해 주세요.</p>
      </div>
    )
  }

  // 예약 종류에 따라 시간 리스트 분기
  // - 진료: 오전/오후 1시간 시간
  // - 미용: 오전/오후 3시간 간격
  const times = reservationType === 'medical'
    ? ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    : ['09:00', '11:00', '15:00', '17:00', '19:00']

  return (
    <div className="time-selector">
      {/* 제목 */}
      <h4 className="section-title">🕒 시간 선택</h4>

      {/* 시간 버튼 목록 */}
      <div className="time-list">
        {times.map((time, idx) => (
          <button
            key={idx}  // 각 버튼에 고유 key 부여
            className={`time-item ${selectedTime === time ? 'selected' : ''}`} // 현재 선택된 시간에만 'selected' 클래스 추가
            onClick={() => onTimeChange(time)}  // 클릭 시 부모 컴포넌트에 선택된 시간 전달
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimeSelector
