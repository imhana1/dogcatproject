import React from 'react'
import './reservationComponents.css'

// 상단에 있는 단계 표시하는 레이아웃
function StepIndicator({ currentStep }) {
  // currentStep: 현재 단계 (1, 2, 3 중 하나)

  // 단계 정보 배열 - 각 단계마다 이모지와 텍스트를 정의
  const steps = [
    { emoji: '🐱', label: 'Step1. 정보 입력' },
    { emoji: '🛒', label: 'Step2. 시간 선택 및 예약금 결제' },
    { emoji: '✅', label: 'Step3. 예약 완료' },
  ]

  return (
    // 단계 전체 컨테이너
    <div className="step-indicator">
      {steps.map((step, index) => {
        const stepNumber = index + 1                // 1부터 시작하는 단계 번호
        const isActive = stepNumber === currentStep  // 현재 단계와 일치 여부 체크

        return (
          // 각 단계 아이템 (이모지 + 텍스트 + 구분자)
          <div
            key={stepNumber}                         // React 렌더링 키
            className={`step-item ${isActive ? 'active' : ''}`} // 현재 단계면 active 클래스 추가
          >
            {/* 단계별 이모지 표시 */}
            <span className="step-emoji">{step.emoji}</span>

            {/* 단계 텍스트 표시 */}
            <span className="step-label">{step.label}</span>

            {/* 마지막 단계가 아니면 → 화살표 구분자 표시 */}
            {stepNumber < steps.length && (
              <span className="step-separator">→</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator
