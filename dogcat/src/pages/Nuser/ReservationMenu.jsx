import React, {useEffect, useState} from 'react';
import HeaderUser from "../../fragments/nuser/HeaderUser";
import NavUserMenu from "../../fragments/nuser/NavUserMenu";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const BLOCK_SIZE = 5; // 한페이지당 예약 개수

// 예약 내역 화면
function ReservationMenu() {
    const [page, setPage] = useState(1);
    const [reservation, setReservation] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState('ALL');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const navigate = useNavigate();
    const checkAuth = useAuthStore(state => state.checkAuth);

    useEffect(() => {
      checkAuth();
    }, []);


    // 총 페이지
    const totalPages = Math.ceil(reservation.length/BLOCK_SIZE);
    const countOfPage = reservation.slice((page-1) * BLOCK_SIZE, page * BLOCK_SIZE);

    // 로그인 정보 저장
    const { username, resetUserInfo } = useAuthStore();
    console.log("Booking username:", username);

    // 필터 핸들러
    const handleStatusChange = e => setStatus(e.target.value);
    const handleDateChange = e => setDateRange({ ...dateRange, [e.target.name]: e.target.value });

    useEffect(() => {
        const fetch= async ()=>{
            try {
                const response = await axios.get("http://localhost:8080/reservation/info",{withCredentials:true});
                console.log(response.data);
                setReservation(response.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetch();
    }, []);

    // 기간 버튼 핸들러 예시
    const setPeriod = days => {
        const today = new Date();
        const from = new Date(today);
        from.setDate(today.getDate() - days + 1);
        setDateRange({
            from: from.toISOString().slice(0, 10),
            to: today.toISOString().slice(0, 10)
        });
    };

    return (
        <div>
            <HeaderUser />
            <main  style={{ display: 'flex', minHeight: '100vh' }}>
                <NavUserMenu activeTab="nuser-reservations" />
                <div style={{ padding: "40px 60px" }}>
                    <h2 style={{ marginBottom: 32, fontWeight: 700, textAlign: 'center' }}>예약내역</h2>
                    {/* 결과 테이블 */}
                    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 100, minHeight: 200 }}>
                        {countOfPage.length === 0 ? (
                            <div style={{ color: '#888', textAlign: 'center', padding: 40 }}>조회 결과가 없습니다.</div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                <tr style={{ background: '#f2e9e1' }}>
                                    <th style={{ padding: "14px 10px", textAlign: "center" }}>예약번호</th>
                                    <th style={{ padding: "14px 10px", textAlign: "center" }}>반려동물번호</th>
                                    <th style={{ padding: "14px 10px", textAlign: "center" }}>병원명</th>
                                    <th style={{ padding: "14px 10px", textAlign: "center" }}>예약자</th>
                                    <th style={{ padding: "14px 10px", textAlign: "center" }}>진료일시</th>
                                    <th style={{ padding: "14px 10px", textAlign: "center" }}>예약상태</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    countOfPage.map(reservation => (
                                        <tr key={reservation.rno}>
                                            <td style={{ padding: "14px 10px", textAlign: "center" }}>{reservation.rno}</td>
                                            <td style={{ padding: "14px 10px", textAlign: "center" }}>{reservation.pno}</td>
                                            <td style={{ padding: "14px 10px", textAlign: "center" }}>{reservation. husername}</td>
                                            {/* 예약자명 버튼 → 리뷰작성하기로 */}
                                            <td><button onClick={() => navigate(`/review-write/${reservation.rno}`)} className="btn btn-dark" style={{ marginBottom: "5px" }}>{reservation.nusername}</button></td>
                                            <td style={{ padding: "14px 10px", textAlign: "center" }}>{reservation.schedule}</td>
                                            <td style={{ padding: "14px 10px", textAlign: "center" }}>{reservation.rstatus}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        console.log("Navigating to CancelPaymentPage with:", {
                                                            paymentKey: reservation.paymentKey,
                                                            orderId: reservation.orderNo,
                                                            amount: reservation.amount, // <--- 이 로그를 추가하세요!
                                                            rno: reservation.rno
                                                        });
                                                        navigate(`/toss/cancel/${reservation.rno}`, {
                                                            state: {
                                                                paymentKey: reservation.paymentKey,
                                                                orderId: reservation.orderNo,
                                                                amount: reservation.amount,
                                                                rno: reservation.rno
                                                            }
                                                        });
                                                    }} className="btn btn-danger">취소</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        )}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 10, padding: 0, fontSize: "18px" }}>
                            {/* 현재페이지에서 1을 빼서 이전페이지로 이동, disabled -> 현재 첫페이지 일때는 버튼 비활성화 */}
                            <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ marginRight: 8, background: "#f2e9e1", color: "#333", border: "none", borderRadius: "6px", padding: "8px 16px"}}>이전</button>
                            {/* Array.from -> 각페이지 번호에 대한 버튼, "bold" : "normal" 글씨 굷게 */}
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <button key={idx + 1} onClick={() => setPage(idx + 1)} style={{ background: page === idx + 1 ? "#ff5f2e" : "#fff", color: page === idx + 1 ? "#fff" : "#ff5f2e", border: "1px solid #ff5f2e",
                                    borderRadius: "6px", padding: "8px 16px", cursor: "pointer", margin: "1px", fontWeight: page === idx + 1 ? "bold" : "normal" }}>{idx + 1}</button>
                            ))}
                            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} style={{ marginLeft: 8, background: "#f2e9e1", color: "#333", border: "none", borderRadius: "6px", padding: "8px 16px" }}>다음</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ReservationMenu;