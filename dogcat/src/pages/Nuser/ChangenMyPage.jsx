import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ChangenMyPage.css';

function ChangeMyPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nid: "",
    nname: "",
    nbirth: "",
    ntel: "",
    naddr: "",
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

  return (
    <form>
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
      <div className="boxStyle">
        <div style={{ marginBottom: "15px", textAlign: "left", fontWeight: "bold" }}>
          <span style={{ color: "red" }}>*</span> 표시 필수 입력
        </div>
        <div className="formContainerStyle">
          <div className="columnStyle">
            <label className="labelStyle" >
              연락처 <span style={{ color: "red" }}>*</span>
            </label>
            <input className="inputStyle" type="text" name="ceoPhone2" placeholder="000-0000-0000" onChange={handleChange} value={form.ntel} required />
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }} onClick={handleDelete}>회원 탈퇴</button>
        </div>
      </div>
    </form>
  );
}

export default ChangeMyPage;
