import React from 'react';
import {Link, useNavigate} from "react-router-dom";

// 병원 마이페이지
function MyPage() {
  const navigate = useNavigate();

  const user = {
    nid: "",
    nname: "",
    nbirth: "",
    ntel: "",
    naddr: "",
    email: ""
  };

  const handleEdit = () => {
    navigate("/change-nmypage")
  }

  return (
    <div>
      <nav>
        <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 10, padding: 0, fontSize: "18px" }}>
          <li>
            <Link to="/nuser-mypage" style={{ textDecoration: "none", color: "black" }}>내 정보 보기</Link>
          </li>
          <li>
            <Link to="/nuser-pet" style={{ textDecoration: "none" , color: "black" }} >나의 반려동물</Link>
          </li>
          <li>
            <Link to="/nuser-booking" style={{ textDecoration: "none" , color: "black" }}>예약 내역</Link>
          </li>
          <li>
            <Link to="/nuser-qna" style={{ textDecoration: "none", color: "black" }}>문의사항</Link>
          </li>
          <li>
            <Link to="/nuser-adoption" style={{ textDecoration: "none", color: "black" }}>유기동물 관심 목록</Link>
          </li>
          <button type="submit" className="btn btn-light">로그아웃</button>
        </ul>
      </nav>
      <div style={{ display: "flex", marginTop: "38px" }}>
        {/* 왼쪽: 병원 정보 */}
        <div style={{ flex: 1, background: "#fff", border: "1.7px solid #222", borderRadius: "20px", padding: "60px 60px 58px 58px", marginRight: "54px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "42px", textAlign: "center" }}>
            <span>(일반 사용자)</span>님 회원정보
          </div>
          <div style={{ display: "flex", gap: "38px" }}>
            {/* 왼쪽: 병원명, 주소 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>ID</div>
              <div style={{ marginBottom: "22px" }}>{user.nid}</div>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>이름</div>
              <div style={{ marginBottom: "18px" }}>{user.nname}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>생년월일</div>
              <div style={{ marginBottom: "18px" }}>{user.nbirth}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>연락처</div>
              <div style={{ marginBottom: "18px" }}>{user.ntel}</div>
            </div>
            {/* 오른쪽: 아이디 및 상세정보 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>주소</div>
              <div>{user.naddr}</div>
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