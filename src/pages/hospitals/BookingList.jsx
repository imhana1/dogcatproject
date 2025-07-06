import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

// 진료결과 읽기 목록(게시판 형태)
const treat = [
    { id: 1, title: "변비" },
    { id: 2, title: "설사" },
    { id: 3, title: "배탈" },
    { id: 4, title: "급성장염" },
    { id: 5, title: "기침" },
    { id: 6, title: "배탈" },
];

const BLOCK_SIZE = 5; // 한페이지당 예약 개수

function BookingList() {
    const [treats, setTreats] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState(treat);

    useEffect(() => {
        axios.get('/hospital/tread-read')
            .then(res =>
            setTreats(res.data))
            .catch(err => alert('진료기록을 찾을 수 없습니다'));
    }, []);

    // 총 페이지
    const totalPages = Math.ceil(bookings.length/BLOCK_SIZE);
    const countOfPage = bookings.slice((page-1) * BLOCK_SIZE, page * BLOCK_SIZE);

    return (
   <div style={{ display: "flex", marginTop: "38px" }} >
      <div style={{ flex: 1, background: "#fff", border: "1.7px solid #222", borderRadius: "20px", padding: "60px 60px 58px 58px", marginRight: "54px" }}>
        <table style={{ margin: "0 auto", width: "90%", borderCollapse: "collapse", textAlign: "center", fontSize: "20px" }}>
            <thead>
              <tr>
                  <th>예약번호</th>
                  <th>진단명</th>
                  <th>작성자</th>
              </tr>
            </thead>
            <tbody>
            {
                countOfPage.map(treat => (
                    <tr key={treat.id}>
                        <td>{treat.id}</td>
                        {/* 진단명 버튼 → 고객에게 보내기 */}
                        <td><button onClick={() => navigate(`/result-read`)} className="btn btn-dark" style={{ marginBottom: "5px" }}>{treat.title}</button></td>
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
   </div>
    );
}

export default BookingList;