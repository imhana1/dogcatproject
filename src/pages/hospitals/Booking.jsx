import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const reservation = [
  { id: 1, hospital: "너도멍냥병원", content: "진료", date: "2025-06-25", time: "13:00", name: "신짱구", status: "대기중" },
  { id: 2, hospital: "너도멍냥병원", content: "미용", date: "2025-06-26",time: "09:00", name: "신형만", status: "대기중" },
  { id: 3, hospital: "너도멍냥병원", content: "진료", date: "2025-06-27",time: "11:00", name: "봉미선", status: "대기중" },
  { id: 4, hospital: "너도멍냥병원", content: "미용", date: "2025-06-28",time: "18:00", name: "신짱아", status: "대기중" },
  { id: 5, hospital: "너도멍냥병원", content: "진료", date: "2025-06-29",time: "10:00", name: "김철수", status: "대기중" },
  { id: 6, hospital: "너도멍냥병원", content: "미용", date: "2025-06-30",time: "16:00", name: "나미리", status: "대기중" },
];

const BLOCK_SIZE = 5; // 한페이지당 예약 개수

// 예약 내역
function Booking() {
  const [bookings, setBookings] = useState(reservation);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // 로그인 정보 저장
  const { username, resetUserInfo } = useAuthStore();
  console.log("Booking username:", username);

  const checkAuth = useAuthStore(state => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 총 페이지
  const totalPages = Math.ceil(bookings.length/BLOCK_SIZE);
  const countOfPage = bookings.slice((page-1) * BLOCK_SIZE, page * BLOCK_SIZE);

  // 승인 버튼 누르면 예약완료
  const handleAdd = (id) => {
    setBookings(bookings =>
      bookings.map(reservation => reservation.id===id? {...reservation, status: "예약"}: reservation)
    );
    alert("예약으로 예약상태가 변경되었습니다");
  }

  // 취소 버튼 누르면 삭제
  const handleDelete = (id) => {
    if(window.confirm("정말로 예약을 취소하시겠습니까?")) {
      setBookings(bookings => bookings.filter(reservation => reservation.id!==id));
    }
  }

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥 동물병원</div>
        <nav>
          <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
            <li><Link to="/hospital-mypage" style={{ color: "#333", textDecoration: "none" }}>내정보 보기</Link></li>
            <li><Link to="/hospital-time" style={{ color: "#333", textDecoration: "none" }}>병원예약 시간설정</Link></li>
            <li><Link to="#" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>예약내역</span></Link></li>
            <li><Link to="/hospital-notice" style={{ color: "#333", textDecoration: "none" }}>공지사항</Link></li>
          </ul>
        </nav>
        {username ? (
            <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}
                onClick={() => {resetUserInfo(); window.location.href = "/"; // 로그아웃 후 홈으로 이동
                }}>로그아웃</button>
        ) : (
            <Link to="/login">
              <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                로그인
              </button>
            </Link>
        )}
      </header>
      <br />
      <table style={{ margin: "0 auto", width: "90%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr>
            <th>예약번호</th>
            <th>병원명</th>
            <th>예약내용</th>
            <th>예약일시</th>
            <th>예약자명</th>
            <th>예약상태</th>
            <th>승인버튼</th>
          </tr>
        </thead>
        <tbody>
          {
            countOfPage.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.hospital}</td>
                {/* 예약내용 클릭 → 상세보기로 이동 */}
                <td><Link to={`/booking/${reservation.id}`}>{reservation.content}</Link></td>
                <td>{reservation.date} {reservation.time}</td>
                {/* 예약자명 버튼 → 진료결과 보내기 페이지로 이동 */}
                <td><button onClick={() => navigate(`/result/${reservation.id}`)} className="btn btn-dark" style={{ marginBottom: "5px" }}>{reservation.name}</button></td>
                {/* 예약이면 주황색, 아니면 기본색*/}
                <td style={{ color: reservation.status === "예약" ? "#ff5f2e" : "#333", fontWeight: reservation.status === "예약" ? "bold" : "normal"}}>
                  {reservation.status}
                </td>
                <td>
                  <button className="btn btn-success"  style={{ marginRight: "4px" }} onClick={()=>handleAdd(reservation.id)} >승인</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(reservation.id)}>취소</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 30, padding: 0, fontSize: "18px" }}>
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
  );
}

export default Booking;