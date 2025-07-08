import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAppStore from "../../stores/useAppStore";
import axios from "axios";
import useAuthStore from "../../stores/useAuthStore";

function HospitalCheckPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 상태 업데이트
  const setPasswordVerified = useAppStore(state => state.setPasswordVerified);

  // 로그인 정보 저장
  const { username, resetUserInfo } = useAuthStore();
  console.log("Booking username:", username);

  const checkAuth = useAuthStore(state => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 서버에서 받는 key 이름이 password가 맞는지 확인
      const res = await axios.get('http://localhost:8080/checkPassword', {params: { password }, withCredentials: true} );

      if (res.data === "확인 성공") {
        setPasswordVerified(true);
        navigate('/hospital-mypage');
      } else {
        setError('비밀번호가 일치하지 않습니다');
      }
    } catch (err) {
      // 409 등 에러 응답은 여기로 들어옴
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('서버 오류가 발생했습니다');
      }
      console.log(err);
    }
  };

  // 취소 버튼 클릭 시 이전 페이지로 이동
  const handleCancel = () => {
    navigate(-1);
  };

  return (
        <>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥 동물병원</div>
            <nav>
              <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
                <li><Link to="/hospital-mypage" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>내정보 보기</span></Link></li>
                <li><Link to="/hospital-time" style={{ color: "#333", textDecoration: "none" }}>병원예약 시간설정</Link></li>
                <li><Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
                <li><Link to="/notice" style={{ color: "#333", textDecoration: "none" }}>공지사항</Link></li>
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
          <div className="formContainer">
            <form>
              <div className="mb-3 mt-3">
                <label htmlFor="password" className="form-label" style={{fontSize: "30px"}}>Password:</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="비밀번호를 입력해주세요"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       style={{marginBottom: "18px", padding: "15px", width: "950px"}}
                       required/>
              </div>
              {error && <p className="error" style={{color: "red", marginTop: "10px"}}>{error}</p>}
              <button type="submit" className="btn btn-success" style={{marginTop: "1px"}} onClick={handleSubmit}>확인
              </button>
              <button type="submit" className="btn btn-danger" onClick={handleCancel} style={{marginLeft: "20px"}}>취소
              </button>
            </form>
          </div>
        </>
  );
}

export default HospitalCheckPassword;