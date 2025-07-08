// 회원탈퇴
import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const REASONS = [
  "아이디 변경",
  "개인정보 노출 우려",
  "거래 입/출금 서비스 불안",
  "시스템 에러 및 서비스 속도",
  "회원 혜택 부족",
  "고객 응대 부족"
];

function DeleteAccount() {
  // 헤더는 병원, 고객 헤더에 맞춰서 이름 바꾸기 !
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!reason) {
      alert("회원탈퇴 이유를 선택해야합니다");
      return;
    }
    if (!agree) {
      alert("위 내용을 숙지하고 동의해 주세요");
      return;
    } try {
      await axios.delete('http://localhost:8080/hospital/delete', {withCredentials: true})
      alert("탈퇴가 되었습니다. 이용해주셔서 감사합니다 ")
      // 성공 시 '/' 페이지로 이동
      navigate('/');
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥 동물병원</div>
        <nav>
          <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
            <li><Link to="#" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>내정보 보기</span></Link></li>
            <li><Link to="/hospital-time" style={{ color: "#333", textDecoration: "none" }}>병원예약 시간설정</Link></li>
            <li><Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
            <li><Link to="/hospital-notice" style={{ color: "#333", textDecoration: "none" }}>공지사항</Link></li>
          </ul>
        </nav>
      </header>
      <div style={{ maxWidth: 1300, margin: "60px auto", padding: 100, border: "1px solid #ddd", borderRadius: 10 }}>
        <h3 style={{ marginBottom: 24 }}>회원탈퇴 사유</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 12 }}>탈퇴 사유를 선택해 주세요.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', justifyItems: 'center', alignItems: 'center', maxWidth: 600, margin: '0 auto 8px auto' }}>
              {REASONS.map((item, idx) => (
                <button type="button" key={idx} onClick={() => setReason(item)} style={{ width: '200px', height: '52px', borderRadius: 7, border: reason === item ? '2px solid #ff5f2e' : '1px solid #ccc',
                  background: reason === item ? '#ffede4' : '#fff', color: reason === item ? '#ff5f2e' : '#333', fontWeight: reason === item ? 'bold' : 'normal',
                  cursor: 'pointer', fontSize: 15, boxSizing: 'border-box', transition: 'all 0.1s' }}>{item}
                </button>
              ))}
            </div>
            {/* 선택된 사유 표시 */}
            {reason && (<div style={{ marginTop: 16, color: "#ff5f2e", fontWeight: "bold" }}>선택한 탈퇴 사유: {reason}</div>)}
          </div>
          <div style={{ marginBottom: 24 }}>
            <label>
              개선 사항
            </label>
            <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={4} style={{ width: "100%", marginTop: 8 }} placeholder="의견을 남겨주시면 서비스 개선에 참고하겠습니다." />
            <label style={{ margin: "24px 0"  }}>&nbsp;개인정보 삭제 및 보유 포인트 소멸에 대한 안내를 숙지하고 회원 탈퇴에 대해 동의해 주시기 바랍니다</label>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 15 }}>
              <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} style={{ marginRight: 8, textAlign: "center" }}/>
              위 내용을 모두 숙지했으며, 이에에 동의합니다.
            </label>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" onClick={() => navigate(-1)} style={{ flex: 1, padding: 10, background: "#eee", border: "none", borderRadius: 5 }}>취소</button>
            <button type="submit" style={{ flex: 1, padding: 10, background: "#d00", color: "#fff", border: "none", borderRadius: 5 }}>확인</button>
          </div>
          <label style={{ margin: "24px 0"  }}>
            서비스를 이용해 주셔서 감사합니다. 더욱 더 개선하여 좋은 서비스와 품질로 보답하겠습니다.
          </label>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccount;