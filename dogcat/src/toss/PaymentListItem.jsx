import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentListItem =({ payment })=> {
  const navigate = useNavigate();

  const handelCancelClick =()=> {
    // 결제 취소페이지로 paymentKey, orderId 전달
    console.log('PaymentListItem payment: ', payment);
    navigate('/toss/cancel', {
      state: {
        paymentKey : payment.paymentKey,
        orderId: payment.orderId,
        amount: payment.amount,
      },
    });
  }
  return (
    <div style={{ marginBottom: '10px'}}>
      <div>주문 번호: {payment.paymentKey}</div>
      <div>금액: {payment.amount}</div>
      <button onClick ={handelCancelClick}>결제 취소</button>
    </div>
  )
}

export default PaymentListItem;