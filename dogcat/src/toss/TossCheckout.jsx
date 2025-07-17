import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const TossCheckout = ({ rno, amount = 5000, customerName = '김모모' }) => {
  const handlePayment = () => {
    if (!rno) {
      alert('예약 번호가 없습니다.');
      return;
    }

    const tossPayments = window.TossPayments('test_ck_d46qopOB89RP21PQWjDO3ZmM75y0');

    const orderId = 'Order_' + uuidv4() + '_rno_' + rno;
    tossPayments.requestPayment('카드', {
      amount,
      orderId,
      orderName: '예약금',
      customerName,
      successUrl: `http://localhost:3000/toss/success?rno=${rno}`,
      failUrl: `http://localhost:3000/toss/fail`,
    })
    .catch((error) => {
      if (error.code === 'USER_CANCEL') {
        alert("결제를 취소하였습니다");
      } else {
        alert("결제 실패: " + error.message);
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>테스트 결제</h2>
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
};

export default TossCheckout;
