import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ChangenMyPage.css';
import PostcodeSearch from '../../components/hospitals/PostcodeSearch';
import useAuthStore from '../../stores/useAuthStore';

function ChangeMyPage() {
  const navigate = useNavigate();
  const [showPostcode, setShowPostcode] = useState(false);

  // 로그인 정보 저장
  const { username, resetUserInfo } = useAuthStore();

  const [form, setForm] = useState({
    nid: "",
    nname: "",
    zip: "",
    naddr: "",
    address1: "",
    nbirth: "",
    ntel: "",
    email: ""
  });

  const handleUpdate = () => {
    // 가입 성공 시 로그인 페이지로 이동
    navigate("/nuser-mypage");
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  
  // 카카오 우편번호 검색 기능
  const handleComplete = (data) => {
    setForm({
      ...form,
      zip: data.zonecode,
      address1: data.address,
    });
    setShowPostcode(false);
  };

  const handleDelete = {

  }
  

  return (
    <form>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥</div>
          <nav>
            <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
              <li><Link to="/nuser-mypage" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>내 정보 보기</span></Link></li>
              <li><Link to="/nuser-pet" style={{ color: "#333", textDecoration: "none" }}>나의 반려동물</Link></li>
              <li><Link to="/nuser-booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
              <li><Link to="/nuser-qna" style={{ color: "#333", textDecoration: "none" }}>문의사항</Link></li>
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
      <div className="boxStyle">
        <div style={{ marginBottom: "15px", textAlign: "left", fontWeight: "bold" }}>
          <span style={{ color: "red" }}>*</span> 표시 필수 입력
        </div>
        <div className="formContainerStyle">
          <div className="columnStyle">
            <label className="labelStyle" >
              연락처 <span style={{ color: "red" }}>*</span>
            </label>
            <input className="inputStyle" type="text" name="ntel" placeholder="000-0000-0000" onChange={handleChange} value={form.ntel} required />
          </div>
          {/* 오른쪽 컬럼 */}
          <div className="columnStyle">
            <label className="labelStyle">Email</label>
            <input className="inputStyle" type="email" name="email" onChange={handleChange} placeholder="you@example.com" value={form.email} required />
            <label className="labelStyle">
              주소 <span style={{ color: "red" }}>*</span>
                <button type="button" className="mb-2 mt-2 btn btn-dark" onClick={() => setShowPostcode(true)}>우편번호 찾기</button>
              {showPostcode && (
                  <PostcodeSearch onComplete={handleComplete} />
              )}
            </label>
            <input type="text" name="zip" onChange={handleChange} placeholder="우편번호" value={form.zip} style={{ width: "180px", height:"35px", minWidth: 100, display: "inline-block" }} required />
            <input className="inputStyle" type="text" name="naddr" onChange={handleChange} placeholder="주소 입력해주세요" value={form.naddr} required />
            <input className="inputStyle" type="text" name="address1" onChange={handleChange} placeholder="상세 주소를 입력해주세요" value={form.address1} required />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }} onClick={handleUpdate}>수정하기</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }} onClick={handleDelete}>회원 탈퇴</button>
        </div>
      </div>
    </form>
  );
}

export default ChangeMyPage;
