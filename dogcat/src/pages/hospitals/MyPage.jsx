import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";
import useAppStore from "../../stores/useAppStore";

// 병원 마이페이지
function MyPage() {
  const navigate = useNavigate();
  const isPasswordVerified = useAppStore(state => state.isPasswordVerified);

  // 인증 상태 가져오기
  const passwordVerified = useAppStore(state => state.isPasswordVerified);

  // 인증 안 됐으면 비밀번호 확인 페이지로 이동
  useEffect(() => {
    if (!isPasswordVerified) {
      navigate('/hospital-checkpassword');
    }
  }, [passwordVerified, navigate]);

  const [huser, setUser] = useState({
    hospitalName: "",
    address: "",
    id: "",
    ceo: "",
    email: "",
    birth: "",
    phone: "",
    directorPhotoUrl: "",   // 의사 사진 URL
    directorCareer: "",    // 의사 경력
    treatmentStart: "",  // 진료 시작 시간
    treatmentEnd: ""    // 진료 종료 시간
  })

  useEffect(() => {
    const fetch=async()=>{
      try{
        const response = await axios.get("http://localhost:8080/hospital", {withCredentials:true});
        const data = response.data;
        setUser({
          hospitalName: data.hospital,
          address: data.haddress,
          id: data.husername,
          ceo: data.director,
          email: data.email,
          birth: data.hbirthDay,
          phone: data.htel,
          directorPhotoUrl: data.hprofile,   // 의사 사진 URL
          directorCareer: data.educational,
          treatmentStart: data.openTime,  // 진료 시작 시간
          treatmentEnd: data.closeTime
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
    navigate("/change-mypage")
  }

  // 리뷰보기
  const handlereview = ()=> {
    navigate("/hospital-review")
  }

  const handleDelete = () => {
    navigate("/delete-account");
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", marginLeft: '10px' }}>
          <img src="/dogcat_logo.png" alt="너도멍냥 동물병원" style={{ height: '100px', width:'100px' , cursor:'pointer', marginLeft: '0px', marginRight: '6px' }} onClick={()=>navigate('/')} />
          <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d", marginLeft: '0px', marginRight: '0px' }}>너도멍냥 동물병원</div>
        </div>
        <nav>
          <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
            <li><Link to="#" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>내정보 보기</span></Link></li>
            <li><Link to="/hospital-time" style={{ color: "#333", textDecoration: "none" }}>병원예약 시간설정</Link></li>
            <li><Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
            <li><Link to="/notice" style={{ color: "#333", textDecoration: "none" }}>공지사항</Link></li>
          </ul>
        </nav>
        {username ? (
            <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}
                    onClick={() => {resetUserInfo();useAppStore.getState().setPasswordVerified(false); // 인증 상태 초기화
                      window.location.href = "/";
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
            <span>{huser.id}</span>님 회원정보
          </div>
          <div style={{ display: "flex", gap: "38px" }}>
            {/* 왼쪽: 병원명, 주소 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>병원이름</div>
              <div style={{ marginBottom: "32px" }}>{huser.hospitalName}</div>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>주소</div>
              <div>{huser.address}</div>
              {/* 진료시간 */}
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>진료시간</div>
              <div style={{ marginBottom: "32px" }}>
                {huser.treatmentStart && huser.treatmentEnd
                    ? `${huser.treatmentStart} ~ ${huser.treatmentEnd}`
                    : "등록된 진료시간 없음"}
              </div>
            </div>
            {/* 오른쪽: 아이디 및 상세정보 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px" }}>아이디</div>
              <div style={{ marginBottom: "22px" }}>{huser.id}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>이름</div>
              <div style={{ marginBottom: "18px" }}>{huser.ceo}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>생년월일</div>
              <div style={{ marginBottom: "18px" }}>{huser.birth}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>전화번호</div>
              <div style={{ marginBottom: "18px" }}>{huser.phone}</div>
              <div style={{ fontWeight: 500, marginBottom: "10px" }}>Email</div>
              <div>{huser.email}</div>
            </div>
          </div>
        </div>
          {/* 오른쪽: 회원정보 변경 */}
        <aside style={{ width: "180px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
          <div style={{ marginBottom: "30px" }}>회원정보변경</div>
          <button className="btn btn-outline-dark" onClick={handleEdit} style={{ marginBottom: "20px", width: "100%" }}>수정하기</button>
          <button className="btn btn-outline-dark" onClick={handlereview} style={{ marginBottom: "20px", width: "100%" }}>리뷰보기</button>
          <button className="btn btn-outline-danger" onClick={handleDelete} style={{ marginBottom: "20px", width: "100%" }}>회원탈퇴</button>
        </aside>
      </div>
    </div>
  );
}

export default MyPage;