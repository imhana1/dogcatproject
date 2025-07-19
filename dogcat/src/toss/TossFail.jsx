import React from 'react';
import {useNavigate} from "react-router-dom";
import ReservationHeader from '../fragments/reservation/ReservationHeader';
import ReservationFooter from '../fragments/reservation/ReservationFooter';
import './TossSuccess.css';

const TossFail = () => {
    const navigate = useNavigate();
  const handleRetry = () => {
    // window.history.back(); // 이전 페이지로 이동
      navigate('/reservation/write')
  };

  return (
    <>
      <ReservationHeader />
      <div className='toss-success-container'>
        <>
        <div className='fail-icon-wrapper'>
          &#10060;
        </div>
        <h2 className='success-title'>
          결제에 실패했습니다. 다시 시도해주세요
        </h2>
        <br />
        <button className='go-to-reservation-write-button' onClick={handleRetry} style={{ marginTop: '10px' }}>
          다시 시도하기
        </button>
        </>
      </div>
      <ReservationFooter />
    </>
  );
};

export default TossFail;