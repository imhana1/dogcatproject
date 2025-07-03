import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const TossCheckout =()=> {
    const handlePayment =()=> {
        const tossPayments = window.TossPayments('test_ck_d46qopOB89RP21PQWjDO3ZmM75y0');

        const orderId = 'Order_' + uuidv4();
        tossPayments.requestPayment('카드', {
            amount : 5000,
            orderId : 'Order0500',
            orderName : '예약금',
            constomerName : '김모모',
            successUrl : 'http://localhost:3000/toss/success',
            failUrl : 'http://localhost:3000/toss/fail',
        })
            .catch(function (error) {
                if (error.code === 'USER_CANCEL') {
                    alert("결제를 취소하였습니다")
                } else {
                    alert("결제 실패", error.message);
                }
            });
        };

    return (
        <div style={{padding:'20px'}}>
            <h2>테스트 결제</h2>
            <button onClick ={handlePayment}>결제하기</button>
        </div>
    );
};

export default TossCheckout;
