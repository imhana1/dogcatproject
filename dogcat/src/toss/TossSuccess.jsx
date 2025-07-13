import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const TossSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const rno = 1;
  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = Number(params.get('amount'));

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      alert('필요한 결제 정보가 부족합니다.');
      return;
    }

    axios.post('http://localhost:8080/api/toss/confirm', {
      paymentKey,
      orderId,
      amount,
      rno,
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      alert('결제 승인 완료!');
      // 필요하면 아래 주석 해제하여 페이지 이동 처리 가능
      // navigate('/mypage');
    })
    .catch((err) => {
      alert('결제 승인 실패: ' + err);
      if (err.response) {
        console.error("📛 status:", err.response.status);
        console.error("📛 data:", err.response.data);
        console.error("📛 headers:", err.response.headers);
      } else if (err.request) {
        console.error("📡 요청 보냈지만 응답 없음:", err.request);
      } else {
        console.error("🚨 요청 자체 실패:", err.message);
      }
    });
  }, [paymentKey, orderId, amount, navigate]);

  return <div>결제 승인중입니다...</div>;
};

export default TossSuccess;