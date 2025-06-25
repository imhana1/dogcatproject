import React, {useState} from 'react';
import {Link} from "react-router-dom";

// 병원 공지사항
function Notice() {
  const [notice, setNotice] = useState("초기 공지사항입니다.");
  const [input, setInput] = useState(notice);

  const handleChange = () => {
    setNotice(input);
    alert('공지사항이 변경되었습니다');
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥 동물병원</div>
        <nav>
          <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
            <li><Link to="/hospital-mypage" style={{ color: "#333", textDecoration: "none" }}>내정보 보기</Link></li>
            <li><Link to="/hospital-time" style={{ color: "#333", textDecoration: "none" }}>병원예약 시간설정</Link></li>
            <li><Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
            <li><Link to="#" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>공지사항</span></Link></li>
          </ul>
        </nav>
        <Link to="/login">
          <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>로그인</button>
        </Link>
      </header>
      <br />
      <div>
        <h2 style={{ textAlign: "center" }}>공지사항 작성/수정</h2>
        <textarea style={{ width: 1300, height: 500, fontSize: 16, marginBottom: 16, padding: 10 }} value={input} onChange={e => setInput(e.target.value)} placeholder="공지사항을 입력하세요"/>
        <br />
        <button onClick={handleChange} className="btn btn-dark">수정하기</button>
        <div style={{ marginTop: 30, color: "#888" }}>
          <strong>미리보기:</strong>
          <br />
          {input}
        </div>
      </div>
    </div>
  );
}

export default Notice;