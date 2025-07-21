import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CancelPaymentPage.css';
import TossHeader from '../fragments/toss/TossHeader';
import ReservationFooter from '../fragments/reservation/ReservationFooter';

const CancelPaymentPage =()=> {
  const location = useLocation();
  const navigate = useNavigate();

  // 중요한 부분: 구조 분해 할당 시 초기 amount 값 확인
  const { paymentKey = '', orderNo = '', amount: initialAmount = 0 ,rno=null } = location.state || {};

  // 이 로그는 컴포넌트가 처음 마운트될 때 찍힙니다.
  useEffect(() => {
    console.log('CancelPaymentPage useEffect (initial mount):', { paymentKey, orderNo, amount: initialAmount });
  }, []);

  const [cancelReason, setCancelReason] = useState('');
  const [cancelAmount, setCancelAmount] = useState(initialAmount); // 초기값을 initialAmount로 사용

  // cancelAmount 값이 변경될 때마다 로그 출력
  useEffect(() => {
    console.log('cancelAmount state changed to:', cancelAmount);
  }, [cancelAmount]); // cancelAmount가 변경될 때마다 실행

  // amount 값이 변경될 때마다 로그 출력 (만약 amount가 useEffect 외부에서 변경될 여지가 있다면)
  // 현재 코드에서는 amount가 props나 state가 아니라 location.state에서 한 번만 가져오므로 이 useEffect는 필요 없을 수 있습니다.
  // useEffect(() => {
  //   console.log('Amount from location.state might have changed (unlikely for location.state):', initialAmount);
  // }, [initialAmount]);


  const handleCancel = async()=> {
    if(!cancelReason) {
      alert('취소 사유를 입력해주세요');
      return;
    }

    console.log('Sending cancel request with:', { paymentKey, orderNo, cancelReason, cancelAmount: Number(cancelAmount) }); // <-- 백엔드로 보낼 최종 값 확인

    try {
      const response = await fetch('http://localhost:8080/api/toss/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderNo,
          cancelReason,
          cancelAmount: Number(cancelAmount), // 백엔드로 보낼 값
          rno
        }),
        credentials: 'include',
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
    <>
      <TossHeader />
      <div className="cancel-payment-container"> 
        <h2>결제 취소</h2>
        <div>
          <label>paymentKey: </label>
          <input type="text" value={paymentKey} readOnly />
        </div>

        <div>
          <label>orderId: </label>
          <input type="text" value={orderNo} readOnly />
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
            onChange={(e) => setCancelAmount(Number(e.target.value))}
            min="0"
            max={initialAmount}
          />
        </div>

        <button onClick={handleCancel}>
          결제 취소하기
        </button>
      </div>
      <ReservationFooter />
    </>
  )
}

export default CancelPaymentPage;