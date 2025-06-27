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
    phone: "",
    directorPhotoUrl: "",   // 의사 사진 URL
    directorCareer: ""    // 의사 경력
  };

  const handleEdit = () => {
    navigate("/change-mypage")
  }

  const handleDelete = () => {
    navigate("/delete-account");
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥 동물병원</div>
        <nav>
          <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
            <li><Link to="#" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>내정보 보기</span></Link></li>
            <li><Link to="/hospital-time" style={{ color: "#333", textDecoration: "none" }}>병원예약 시간설정</Link></li>
            <li><Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
            <li><Link to="/notice" style={{ color: "#333", textDecoration: "none" }}>공지사항</Link></li>
          </ul>
        </nav>
        <Link to="/login">
          <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>로그인</button>
        </Link>
      </header>
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
              {/* 의료진 사진, 의료진 경력 */}
              <div style={{ minWidth: "220px" }}>
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>의료진 사진</div>
                {user.directorPhotoUrl ? (
                    <img src={"https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F076%2F2020%2F04%2F16%2F2020041701001313800081452_20200416211912354.jpg&type=sc960_832"} alt="의료진 사진" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "18px" }} />
                ) : (<div style={{ marginBottom: "18px" }}>등록된 사진이 없습니다</div> )}
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>의사 경력</div>
                <div style={{ marginBottom: "18px", whiteSpace: "pre-line" }}>{user.directorCareer}</div>
              </div>

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
          <button className="btn btn-outline-dark" onClick={handleEdit} style={{ marginBottom: "20px", width: "100%" }}>수정하기</button>
          <button className="btn btn-outline-danger" onClick={handleDelete} style={{ marginBottom: "20px", width: "100%" }}>회원탈퇴</button>
        </aside>
      </div>
    </div>
  );
}

export default MyPage;