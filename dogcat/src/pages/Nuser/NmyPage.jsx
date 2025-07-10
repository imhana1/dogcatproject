import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from '../../stores/useAuthStore';

// 병원 마이페이지
function MyPage() {
  const navigate = useNavigate();

  const [nuser, setNuser] = useState({
    nid: "",
    nname: "",
    nbirth: "",
    ntel: "",
    address: "",
    email: "",
    nsubaddr: ""
  });

    useEffect(() => {
      const fetch = async()=>{
        try{
          const response = await axios.get("http://localhost:8080/nuser-mypage", {withCredentials:true});
          const data = response.data;
          console.log(data);
          setNuser({
            nid : data.nid,
            nname : data.nname,
            nbirth : data.nbirth,
            ntel : data.ntel,
            address : data.naddr,
            email : data.email,
            nsubaddr: data.nsubaddr
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetch();
    }, []);
  
    // 로그인 정보 저장
    const { username, resetUserInfo } = useAuthStore();
    console.log("Booking username:", username);

    const checkAuth = useAuthStore(state => state.checkAuth);
      useEffect(() => {
        checkAuth();
      }, [checkAuth]);
    

  const handleEdit = () => {
    navigate("/change-nmypage")
  }

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥</div>
          <nav>
            <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
              <li><Link to="/nuser-mypage" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>내 정보 보기</span></Link></li>
              <li><Link to="/nuser-pet" style={{ color: "#333", textDecoration: "none" }}>나의 반려동물</Link></li>
              <li><Link to="/nuser-booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
              <li><Link to="/nuser-adoption" style={{ color: "#333", textDecoration: "none" }}>유기동물 관심 목록</Link></li>
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
      <div style={{ display: "flex", marginTop: "38px" }}>
        {/* 왼쪽: 병원 정보 */}
        <div style={{ flex: 1, background: "#fff", border: "1.7px solid #222", borderRadius: "20px", padding: "60px 60px 58px 58px", marginRight: "54px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "42px", textAlign: "center" }}>
            <span>(일반 사용자)</span>님 회원정보
          </div>
          <div style={{ display: "flex", gap: "38px" }}>
            {/* 왼쪽: 병원명, 주소 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>ID</div>
              <div style={{ marginBottom: "22px" }}>{nuser.nid}</div>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>이름</div>
              <div style={{ marginBottom: "18px" }}>{nuser.nname}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px", fontWeight: "bold" }}>생년월일</div>
              <div style={{ marginBottom: "18px" }}>{nuser.nbirth}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px", fontWeight: "bold" }}>연락처</div>
              <div style={{ marginBottom: "18px" }}>{nuser.ntel}</div>
            </div>
            {/* 오른쪽: 아이디 및 상세정보 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>주소</div>
              <div>{nuser.address} {nuser.nsubaddr && `(${nuser.nsubaddr})`}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px", fontWeight: "bold" }}>Email</div>
              <div>{nuser.email}</div>
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