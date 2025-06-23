import React from 'react';
import {Link, useNavigate} from "react-router-dom";

// 병원 마이페이지
function MyPage() {
  const navigate = useNavigate();

  const user = {
    hospitalName: "",
    address: "",
    id: "",
    ceo: "",
    email: "",
    birth: "",
    phone: ""
  };

  const handleEdit = () => {
    navigate("/change-mypage")
  }

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
      <div style={{ display: "flex", marginTop: "38px" }}>
        {/* 왼쪽: 병원 정보 */}
        <div style={{ flex: 1, background: "#fff", border: "1.7px solid #222", borderRadius: "20px", padding: "60px 60px 58px 58px", marginRight: "54px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "42px", textAlign: "center" }}>
            <span>(사업자 회원)</span>님 회원정보
          </div>
          <div style={{ display: "flex", gap: "38px" }}>
            {/* 왼쪽: 병원명, 주소 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>병원이름</div>
              <div style={{ marginBottom: "32px" }}>{user.hospitalName}</div>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>주소</div>
              <div>{user.address}</div>
            </div>
            {/* 오른쪽: 아이디 및 상세정보 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>아이디</div>
              <div style={{ marginBottom: "22px" }}>{user.id}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>이름</div>
              <div style={{ marginBottom: "18px" }}>{user.ceo}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>생년월일</div>
              <div style={{ marginBottom: "18px" }}>{user.birth}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>전화번호</div>
              <div style={{ marginBottom: "18px" }}>{user.phone}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>Email</div>
              <div>{user.email}</div>
            </div>
          </div>
        </div>
        {/* 오른쪽: 회원정보 변경 */}
        <aside style={{ width: "180px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
          <div style={{ marginBottom: "30px" }}>회원정보변경</div>
          <button className="btn btn-dark" onClick={handleEdit}>수정하기</button>
        </aside>
      </div>
    </div>
  );
}

export default MyPage;