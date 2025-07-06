import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAppStore from "../../stores/useAppStore";
import axios from "axios";

function HospitalCheckPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 상태 업데이트
  const setPasswordVerified = useAppStore(state => state.setPasswordVerified);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/hospital/check-password', {password}); // 백엔드에 비밀번호 확인 요청

      if (res.data.success) {
        setPasswordVerified(true); // 인증 상태 저장
        navigate('/hospital-mypage'); // 정보 변경 페이지로 이동
      } else {
        setError('비밀번호가 일치하지 않습니다');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다');
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
                <li><Link to="/hospital-mypage" style={{ color: "#333", textDecoration: "none" }}>내정보 보기</Link></li>
                <li><Link to="/hospital-time" style={{ color: "#333", textDecoration: "none" }}>병원예약 시간설정</Link></li>
                <li><Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
                <li><Link to="/notice" style={{ color: "#333", textDecoration: "none" }}>공지사항</Link></li>
              </ul>
            </nav>
            <Link to="/login">
              <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>로그인</button>
            </Link>
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