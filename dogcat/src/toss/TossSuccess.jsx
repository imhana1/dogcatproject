// src/pages/TossSuccess.js (rno 콘솔 로그 추가)
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReservationHeader from '../fragments/reservation/ReservationHeader';
import StepIndicator from '../components/reservation/StepIndicator';
import useAuthStore from '../stores/useAuthStore';
import './TossSuccess.css';
import ReservationFooter from '../fragments/reservation/ReservationFooter';

const TossSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const checkAuth = useAuthStore(state => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentKey = queryParams.get('paymentKey');
        const tossOrderId = queryParams.get('orderId');
        const amount = queryParams.get('amount');

        const reservationInfo = JSON.parse(sessionStorage.getItem('reservationInfo'));

        if (!reservationInfo || !paymentKey || !tossOrderId || !amount) {
            alert('필수 정보가 누락되었습니다. 예약 또는 결제 과정에 문제가 있습니다.');
            navigate('/toss/fail');
            return;
        }

        axios.post('http://localhost:8080/reservation', reservationInfo, { withCredentials: true })
            .then(reservationRes => {
                // ✅ 여기에 rno 콘솔 로그 추가
                console.log("백엔드 /reservation API 응답 데이터:", reservationRes.data);

                const rno = reservationRes.data.rno;
                if (!rno) {
                    // rno가 없는 경우를 명확히 로그로 남깁니다.
                    console.error("오류: 예약 저장 후 rno를 받지 못했습니다. 백엔드 /reservation API 응답에 rno 필드가 없습니다.");
                    throw new Error("예약 저장 후 rno를 받지 못했습니다.");
                }
                console.log("예약 정보 저장 성공, 받은 rno:", rno); // ✅ rno가 제대로 파싱되었는지 확인

                const confirmData = {
                    paymentKey,
                    orderId: tossOrderId,
                    amount: parseInt(amount),
                    rno: rno
                };

                return axios.post('http://localhost:8080/api/toss/confirm', confirmData, { withCredentials: true });
            })
            .then(confirmRes => {
                console.log("결제 승인 및 pay 저장 성공:", confirmRes.data);
                alert('예약 및 결제가 완료되었습니다!');
                sessionStorage.removeItem('reservationInfo');
                navigate('/toss/success');
            })
            .catch(err => {
                console.error('예약 또는 결제 처리 중 오류 발생:', err.response ? err.response.data : err.message);
                alert('예약 및 결제 처리 중 오류가 발생했습니다: ' + (err.response?.data?.message || err.message));
                navigate('/toss/fail');
            });
    }, []);

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
                    <button className='go-to-mypage-button' onClick={() => navigate('/nuser-mypage')}>
                        마이 페이지로 이동
                    </button>
                </>
            </div>
            <ReservationFooter />
        </>
    )
};

export default TossSuccess;