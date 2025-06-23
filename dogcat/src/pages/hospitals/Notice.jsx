import React from 'react';
import {Link} from "react-router-dom";

// 병원 공지사항
function Notice() {
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
        <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "32px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: "1400px", margin: "40px auto" }}>
          <textarea className="font-control" placeholder="공지사항을 작성해주세요" style={{ width: "100%", height: "240px" }} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "30%", padding: "10px", fontSize: "1.1rem" }}>작성하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notice;