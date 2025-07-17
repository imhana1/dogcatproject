import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReservationHeader from '../fragments/reservation/ReservationHeader';
import StepIndicator from '../components/reservation/StepIndicator';
import useAuthStore from '../stores/useAuthStore';
import './TossSuccess.css';
import ReservationFooter from '../fragments/reservation/ReservationFooter';

const TossSuccess = () => {
  const navigate = useNavigate();
  const checkAuth = useAuthStore(state => state.checkAuth);

   useEffect(() => {
      checkAuth();
   }, []);

useEffect(() => {
  const reservationInfo = JSON.parse(sessionStorage.getItem('reservationInfo'));
  if (!reservationInfo) {
    alert('예약 정보가 없습니다.');
    return;
  }

  axios.post('http://localhost:8080/reservation', reservationInfo, {withCredentials : true})
    .then(() => {
      alert('예약이 완료되었습니다!');
      sessionStorage.removeItem('reservationInfo');
    })
    .catch((err) => {
      alert('예약 저장 실패: ' + err.message);
      console.error(err);
    });
  }, []);
  // 마이 페이지 이동 버튼 핸들러
  const handleToMyPage =()=> {
    navigate('/nuser-mypage');
  }


  return (
    <>
      <ReservationHeader />
      <div className='toss-success-container'>
        <StepIndicator currentStep={3} />
          <>
            <div className='success-icon-wrapper'>
              &#10003;
            </div>
            <h2 className='success-title'>
              예약이 완료되었습니다.
            </h2>
            <p className='success-description'>
              자세한 사항은 마이 페이지를 확인해주세요.
            </p>
            <button className='go-to-mypage-button' onClick={handleToMyPage}>
              마이 페이지로 이동
            </button>
          </>
      </div>
      <ReservationFooter />
    </>
  )
};

export default TossSuccess;