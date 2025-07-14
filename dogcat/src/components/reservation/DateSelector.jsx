import React, { useEffect } from 'react'
import './reservationComponents.css'

// 날짜 선택
function DateSelector({ selectedDate, onDateChange }) {
  // 오늘 날짜 구하기 (YYYY-MM-DD 형식)
  const today = new Date().toISOString().split('T')[0]

  // 컴포넌트가 처음 렌더링될 때 오늘 날짜 자동 선택
  useEffect(() => {
    if (!selectedDate) {
      onDateChange(today)
    }
  }, [selectedDate, onDateChange, today])

  // 앞으로 7일치 날짜 만들기
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  return (
    <div className="date-selector">
      <h4 className="section-title">📅 날짜 선택</h4>
      <div className="date-list">
        {dates.map((date, idx) => {
          const dateStr = date.toISOString().split('T')[0]
          const isSelected = selectedDate === dateStr

          return (
            <button
              key={idx}
              className={`date-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onDateChange(dateStr)}
            >
              {date.getMonth() + 1}월 {date.getDate()}일
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DateSelector
