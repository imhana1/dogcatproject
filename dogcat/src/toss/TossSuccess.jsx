import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TossSuccess = () => {
  const navigate = useNavigate();

useEffect(() => {
  const reservationInfo = JSON.parse(sessionStorage.getItem('reservationInfo'));
  if (!reservationInfo) {
    alert('예약 정보가 없습니다.');
    return;
  }

  axios.post('http://localhost:8080/reservation', reservationInfo)
    .then(() => {
      alert('예약이 완료되었습니다!');
      sessionStorage.removeItem('reservationInfo');
      navigate('/mypage'); // 또는 원하는 페이지로 이동
    })
    .catch((err) => {
      alert('예약 저장 실패: ' + err.message);
      console.error(err);
    });
}, []);


  return <div>예약 및 결제를 처리 중입니다...</div>;
};

export default TossSuccess;