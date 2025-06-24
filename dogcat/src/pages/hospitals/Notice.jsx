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
      <nav>
        <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 10, padding: 0, fontSize: "18px" }}>
          <li>
            <Link to="/hospital-mypage" style={{ textDecoration: "none", color: "black" }}>내정보 보기</Link>
          </li>
          <li>
            <Link to="/hospital-time" style={{ textDecoration: "none" , color: "black" }} >병원 예약 시간 설정</Link>
          </li>
          <li>
            <Link to="/booking" style={{ textDecoration: "none" , color: "black" }}>예약내역</Link>
          </li>
          <li>
            <Link to="/notice" style={{ textDecoration: "none", color: "black" }}>공지사항</Link>
          </li>
          <button type="submit" className="btn btn-light">로그아웃</button>
        </ul>
      </nav>
      <div>
        <h2 style={{ textAlign: "center" }}>공지사항 작성/수정</h2>
        <textarea style={{ width: 1300, height: 500, fontSize: 16, marginBottom: 16, padding: 10 }} value={input} onChange={e => setInput(e.target.value)} placeholder="공지사항을 입력하세요"/>
        <br />
        <button onClick={handleChange}>수정하기</button>
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