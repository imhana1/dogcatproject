import axios from 'axios';
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const TossSuccess=()=> {
  const [params] = useSearchParams();

  useEffect(()=> {
    const paymentKey = params.get('paymentKey');
    const orderId = params.get('orderId');
    const amount = params.get('amount');

    console.log("Confirm API 호출 데이터", { paymentKey, orderId, amount });

    axios.post('http://localhost:8080/api/toss/confirm', {
        paymentKey,
        orderId : orderId,
        amount
      }, {
        headers: {
          "Content-Type":"application/json"
        }
    })
    .then(()=> { alert('결제 승인 완료!')})
    .catch((err)=> {
      alert('결제 승인 실패', + err);
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
  },[params]);

  return <div>결제 승인중입니다...</div>
}

export default TossSuccess;