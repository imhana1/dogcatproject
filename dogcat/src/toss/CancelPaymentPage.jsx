import React, { useState } from 'react';

const CancelPaymentPage = () => {
  const [paymentKey, setPaymentKey] = useState('');
  const [orderId, setOrderId] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [cancelAmount, setCancelAmount] = useState('');

  const handleCancel = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/toss/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey: paymentKey,
          cancelReason: cancelReason,
          cancelAmount: parseInt(cancelAmount),
          orderId: orderId,
        }),
      });

      if (response.ok) {
        alert('✅ 결제 취소가 완료되었습니다.');
      } else {
        const errorText = await response.text();
        alert('❌ 결제 취소 실패: ' + errorText);
      }
    } catch (error) {
      console.error('취소 중 오류 발생:', error);
      alert('⚠️ 서버에서 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>결제 취소</h2>
      <div>
        <label>paymentKey:</label>
        <input
          type="text"
          value={paymentKey}
          onChange={(e) => setPaymentKey(e.target.value)}
        />
      </div>
      <div>
        <label>orderId:</label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <div>
        <label>취소 사유:</label>
        <input
          type="text"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </div>
      <div>
        <label>취소 금액:</label>
        <input
          type="number"
          value={cancelAmount}
          onChange={(e) => setCancelAmount(e.target.value)}
        />
      </div>
      <button onClick={handleCancel}>결제 취소하기</button>
    </div>
  );
};

export default CancelPaymentPage;