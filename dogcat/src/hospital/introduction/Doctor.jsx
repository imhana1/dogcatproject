import React from 'react';
import {Link} from "react-router-dom";

// 의료진 소개
const director  = [
  {
    name: "안정원",
    position: "대표원장",
    photo: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F076%2F2020%2F04%2F16%2F2020041701001313800081452_20200416211912354.jpg&type=sc960_832",
    specialty: "종합진료",
    career: [
      "서울대학교 의과대학 졸업",
      "서울대학교 의과대학 99학번",
      "너도멍냥병원 대표원장"
    ],
    intro: "환자와의 소통을 최우선으로 생각합니다."
  }
];

function Doctor() {
  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥 동물병원</div>
        <nav>
          <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
            <li><Link to="/hospital" style={{ color: "#333", textDecoration: "none" }}>병원소개</Link></li>
            <li><Link to="#" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>의료진 소개</span></Link></li>
            <li><Link to="/hospital-reservation" style={{ color: "#333", textDecoration: "none" }}>예약</Link></li>
          </ul>
        </nav>
        <Link to="/login">
          <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>로그인</button>
        </Link>
      </header>
      <section style={{ background: "#f9f9f9", padding: "40px 0" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem", marginBottom: 30 }}>의료진 소개</h2>
        <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
          {director.map((dir, idx) => (
            <div key={idx} style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", width: 400, padding: 28, textAlign: "center" }}>
              <img src={dir.photo} alt={dir.name}
                   style={{ width: 280, height: 280, borderRadius: "50%", objectFit: "cover", marginBottom: 18, border: "3px solid #ff5f2e" }} />
              <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: 4 }}>{dir.position} {dir.name}</div>
              <div style={{ color: "#ff5f2e", fontWeight: "bold", marginBottom: 12 }}>{dir.specialty}</div>
              <ul style={{ textAlign: "left", fontSize: "0.98rem", margin: "0 0 12px 0", padding: 0, listStyle: "none" }}>
                {dir.career.map((c, i) => <li key={i} style={{ marginBottom: 3 }}>- {c}</li>)}
              </ul>
              <div style={{ color: "#444", fontSize: "0.97rem" }}>{dir.intro}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Doctor;