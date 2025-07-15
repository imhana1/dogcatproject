import React, {useEffect, useState} from 'react';
import HeaderUser from "../../fragments/nuser/HeaderUser";
import NavUserMenu from "../../fragments/nuser/NavUserMenu";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";

const BLOCK_SIZE = 5; // 한페이지당 예약 개수

function ReservationMenu() {
    const [page, setPage] = useState(1);
    const [reservation, setReservation] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState('ALL');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    // 총 페이지
    const totalPages = Math.ceil(reservation.length/BLOCK_SIZE);
    const countOfPage = reservation.slice((page-1) * BLOCK_SIZE, page * BLOCK_SIZE);

    // 로그인 정보 저장
    const { username, resetUserInfo } = useAuthStore();
    console.log("Booking username:", username);

    // 필터 핸들러
    const handleStatusChange = e => setStatus(e.target.value);
    const handleDateChange = e => setDateRange({ ...dateRange, [e.target.name]: e.target.value });

    // 예약 내역 불러오기
    const handleSearch = () => {
        axios.get("http://localhost:8080/reservation/info", {
            params: { status, from: dateRange.from, to: dateRange.to}, withCredentials: true})
            .then(res => {
                setReservation(res.data);
                if (res.data.length === 0) setShowAlert(true);
                setPage(1); // 조회 시 첫 페이지로 이동
            })
            .catch(err => {
                console.error("예약내역 불러오기 실패:", err);
            });
    };

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
                    {/* 기간 필터 */}
                    <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 500 }}>조회기간</span>
                        <button onClick={() => setPeriod(1)} className="btn btn-outline-dark btn-block">오늘</button>
                        <button onClick={() => setPeriod(7)} className="btn btn-outline-dark btn-block">7일</button>
                        <button onClick={() => setPeriod(30)} className="btn btn-outline-dark btn-block">1개월</button>
                        <button onClick={() => setPeriod(90)} className="btn btn-outline-dark btn-block">3개월</button>
                        <button onClick={() => setPeriod(365)} className="btn btn-outline-dark btn-block">1년</button>
                        <input type="date" name="from" value={dateRange.from} onChange={handleDateChange} style={{ marginLeft: 12 }} />
                        <span>~</span>
                        <input type="date" name="to" value={dateRange.to} onChange={handleDateChange} />
                        <button style={{ marginLeft: 8 }} onClick={handleSearch} className="btn btn-outline-dark btn-block">조회</button>
                    </div>
                    {/* 상태 필터 */}
                    <div style={{ marginBottom: 24 }}>
                        지난 예약 내역 조회:
                        <label style={{ marginLeft: 10 }}>
                            <input type="radio" name="status" value="ALL" checked={status === "ALL"} onChange={handleStatusChange} /> 전체
                        </label>
                        <label style={{ marginLeft: 10 }}>
                            <input type="radio" name="status" value="확정" checked={status === "확정"} onChange={handleStatusChange} /> 확정
                        </label>
                        <label style={{ marginLeft: 10 }}>
                            <input type="radio" name="status" value="취소" checked={status === "취소"} onChange={handleStatusChange} /> 취소
                        </label>
                    </div>
                    {/* 결과 테이블 */}
                    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 20, minHeight: 200 }}>
                        {countOfPage.length === 0 ? (
                            <div style={{ color: '#888', textAlign: 'center', padding: 40 }}>조회 결과가 없습니다.</div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                <tr style={{ background: '#f2e9e1' }}>
                                    <th style={{ padding: 10 }}>예약번호</th>
                                    <th style={{ padding: 10 }}>병원명</th>
                                    <th style={{ padding: 10 }}>진료일시</th>
                                    <th style={{ padding: 10 }}>상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                {countOfPage.map(item => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: 10, textAlign: 'center' }}>{item.id}</td>
                                        <td style={{ padding: 10, textAlign: 'center' }}>{item.hospitalName}</td>
                                        <td style={{ padding: 10, textAlign: 'center' }}>{item.date}</td>
                                        <td style={{ padding: 10, textAlign: 'center' }}>{item.status}</td>
                                    </tr>
                                ))}
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