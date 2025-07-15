import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const CancelPaymentPage =()=> {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentKey = '', orderId = '', amount = 0 } = location.state || {};

  // 값이 제대로 넘어오는지 로그로 확인
  console.log('CancelPaymentPage loaded with:', { paymentKey, orderId, amount });

  const [cancelReason, setCancelReason] = useState('');
  const [cancelAmount, setCancelAmount] = useState(amount);     // 결제 금액이 기본값

  const handleCancel = async()=> {
    if(!cancelReason) {
      alert('취소 사유를 입력해주세요');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/toss/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          cancelReason,
          cancelAmount: Number(cancelAmount),
        }),
      });

      if (response.ok) {
        alert("결제 취소가 완료 되었습니다");
        navigate('/nuser-mypage');
      } else {
        const errorText = await response.text();
        alert('결제 취소 실패: ' + errorText);
      } 
    } catch(err) {
      console.error('취소 중 오류 발생', err);
      alert("서버에서 오류가 발생했습니다");
    }
  }

    return(
      <div style={{ padding: '30px' }}>
        <div>
          <label>paymentKey: </label>
          <input type="text" value={paymentKey} readOnly />
        </div>

        <div>
          <label>orderId: </label>
          <input type="text" value={orderId} readOnly />
        </div>

        <div>
          <label>취소 사유: </label>
          <input
            type="text"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="취소 사유를 입력하세요"
          />
        </div>

        <div>
          <label>취소 금액: </label>
          <input
            type="number"
            value={cancelAmount}
            onChange={(e) => setCancelAmount(e.target.value)}
            min="0"
            max={amount}
          />
        </div>

        <button onClick={handleCancel} style={{ marginTop: '15px' }}>
          결제 취소하기
        </button>
      </div>
    )
}

export default CancelPaymentPage;