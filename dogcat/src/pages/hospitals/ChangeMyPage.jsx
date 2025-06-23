import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ChangeMyPage.css';

function ChangeMyPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    hospital: "",
    hospitalName: "",
    zip: "",
    address1: "",
    address2: "",
    ceoName: "",
    ceoPhone2: "",
    ceoBirth: "",
    email: "",
  });

  const handleUpdate = () => {
    // 가입 성공 시 로그인 페이지로 이동
    navigate("/hospital-mypage");
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form>
      <nav>
        <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 10, padding: 0, fontSize: "18px" }}>
          <li>
            <Link to="/hospital-mypage" style={{ textDecoration: "none", color: "black" }}>내정보 보기</Link>
          </li>
          <li>
            <Link to="/hospital-time" style={{ textDecoration: "none", color: "black" }}>병원 예약 시간 설정</Link>
          </li>
          <li>
            <Link to="/booking" style={{ textDecoration: "none", color: "black" }}>예약내역</Link>
          </li>
          <li>
            <Link to="/notice" style={{ textDecoration: "none", color: "black" }}>공지사항</Link>
          </li>
          <button type="submit" className="btn btn-light">로그아웃</button>
        </ul>
      </nav>
      <div className="boxStyle">
        <div style={{ marginBottom: "15px", textAlign: "left", fontWeight: "bold" }}>
          <span style={{ color: "red" }}>*</span> 표시 필수 입력
        </div>
        <div className="formContainerStyle">
          <div className="columnStyle">
            <label className="labelStyle">
              병원 아이디 <span style={{ color: "red" }}>*</span>
            </label>
            <input className="inputStyle" type="text" name="hospital" onChange={handleChange} placeholder="병원 아이디를 입력해주세요" value={form.hospital} required />
            <label className="labelStyle">
              병원 이름
            </label>
            <input className="inputStyle" type="text" name="hospitalName" onChange={handleChange} placeholder="병원 명을 입력해주세요" value={form.hospitalName} required />
            <label className="labelStyle">
              대표자 이름 <span style={{ color: "red" }}>*</span>
            </label>
            <input className="inputStyle" type="text" name="ceoName" onChange={handleChange} placeholder="대표자이름을 입력해주세요" value={form.ceoName} required />

            <label className="labelStyle">
              대표자 생년월일 <span style={{ color: "red" }}>*</span>
            </label>
            <input className="inputStyle" type="text" name="ceoBirth" onChange={handleChange} placeholder="YYYY-MM-DD" value={form.ceoBirth} required />
            <label className="labelStyle" >
              대표자 전화번호 <span style={{ color: "red" }}>*</span>
            </label>
            <input className="inputStyle" type="text" name="ceoPhone2" placeholder="000-0000-0000" onChange={handleChange} value={form.ceoPhone2} required />
          </div>
          {/* 오른쪽 컬럼 */}
          <div className="columnStyle">
            <label className="labelStyle">Email</label>
            <input className="inputStyle" type="email" name="email" onChange={handleChange} placeholder="you@example.com" value={form.email} required />
            <label className="labelStyle">
              주소 <span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" name="zip" onChange={handleChange} placeholder="우편번호" value={form.zip} style={{ width: "180px", height:"35px", minWidth: 100, display: "inline-block" }} required />
            <input className="inputStyle" type="text" name="address1" onChange={handleChange} placeholder="사업자 주소 입력해주세요" value={form.address1} required />
            <input className="inputStyle" type="text" name="address2" onChange={handleChange} placeholder="상세 주소를 입력해주세요" value={form.address2} required />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }} onClick={handleUpdate}>수정하기</button>
        </div>
      </div>
    </form>
  );
}

export default ChangeMyPage;
