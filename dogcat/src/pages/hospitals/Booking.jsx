import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";

const BLOCK_SIZE = 5; // 한페이지당 예약 개수

// 예약 내역
function Booking() {
  const [reservation, setReservation]= useState([])
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch= async ()=>{
      try {
        const response = await axios.get("http://localhost:8080/hospital/reservation/info",{withCredentials:true});
        console.log(response.data);
        setReservation(response.data);
      } catch (e) {
        console.log(e)
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    setBookings(reservation);
  }, [reservation]);

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

  // 진료결과 작성했던 목록으로 이동
  const handlelist = e => {
    navigate('/result-list');
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
        <div style={{ display: "flex", alignItems: "center", marginLeft: '10px' }}>
          <img src="/dogcat_logo.png" alt="너도멍냥 동물병원" style={{ height: '100px', width:'100px' , cursor:'pointer', marginLeft: '0px', marginRight: '6px' }} onClick={()=>navigate('/')} />
          <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d", marginLeft: '0px', marginRight: '0px' }}>너도멍냥 동물병원</div>
        </div>
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
              <tr key={reservation.rno}>
                <td>{reservation.rno}</td>
                <td>{reservation.hospital}</td>
                {/* 예약내용 클릭 → 상세보기로 이동 */}
                <td><Link to={`/booking/${reservation.rno}`}>{reservation.schoice}</Link></td>
                <td>{reservation.schedule}</td>
                {/* 예약자명 버튼 → 진료결과 보내기 페이지로 이동 */}
                <td><button onClick={() => navigate(`/result/${reservation.rno}`)} className="btn btn-dark" style={{ marginBottom: "5px" }}>{reservation.nname}</button></td>
                {/* 예약이면 주황색, 아니면 기본색*/}
                <td style={{ color: reservation.rstatus === "예약" ? "#ff5f2e" : "#333", fontWeight: reservation.rstatus === "예약" ? "bold" : "normal"}}>
                  {reservation.rstatus}
                </td>
                <td>
                  <button className="btn btn-success"  style={{ marginRight: "4px" }} onClick={()=>handleAdd(reservation.rno)} >승인</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(reservation.rno)}>취소</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 5, padding: 0, fontSize: "18px" }}>
        <button onClick={handlelist} style={{ marginLeft: 8, background: "#f2e9e1", color: "#333", border: "none", borderRadius: "6px", padding: "8px 16px" }}>진료결과 작성목록</button>
      </div>
    </div>
  );
}

export default Booking;