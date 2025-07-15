import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/reservation/StepIndicator';
import ReservationHeader from '../../fragments/reservation/ReservationHeader';
import ReservationFooter from '../../fragments/reservation/ReservationFooter';
import './ReservationComplete.css';

const ReservationComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { rno, username, petName, selectedDate, selectedTime } = location.state || {};

  return (
    <>
      <ReservationHeader />
      <div className="reservation-complete-container">
        <StepIndicator currentStep={3} />

        <h2>예약이 완료되었습니다 🎉</h2>
        <div className="reservation-complete-info">
          <p>예약 번호: <strong>{rno}</strong></p>
          <p>보호자: {username}</p>
          <p>반려동물: {petName}</p>
          <p>예약 일시: {selectedDate} {selectedTime}</p>
        </div>

        <div className="reservation-complete-buttons">
          <button
            className="reservation-complete-button"
            onClick={() => navigate('/')}
          >
            홈으로 가기
          </button>
          <button
            className="reservation-complete-button"
            onClick={() => navigate('/mypage')}
          >
            마이페이지로 가기
          </button>
        </div>
      </div>
      <ReservationFooter />
    </>
  );
};

export default ReservationComplete;