import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ChangeMyPage.css';
import {VscLocation} from "react-icons/vsc";
import PostcodeSearch from "../../components/hospitals/PostcodeSearch";

function ChangeMyPage() {
  const navigate = useNavigate();
  const [showPostcode, setShowPostcode] = useState(false);
  const [directorPhoto, setDirectorPhoto] = useState(null);
  const [directorPhotoPreview, setDirectorPhotoPreview] = useState(null); // 미리보기용
  const [directorCareer, setDirectorCareer] = useState(""); // 경력 입력


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
    directorPhoto: "",
    directorCareer: ""
  });

  const handleUpdate = () => {
    navigate("/hospital-mypage");
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

  // 사진 업로드 핸들러
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setDirectorPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDirectorPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setDirectorPhotoPreview(null);
    }
  };

  // 경력 입력 핸들러
  const handleCareerChange = (e) => {
    setDirectorCareer(e.target.value);
  };

  return (
    <form>
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
        <Link to="/login">
          <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>로그인</button>
        </Link>
      </header>
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
                <button type="button" className="mb-2 mt-2 btn btn-dark" onClick={() => setShowPostcode(true)}>우편번호 찾기</button>
              {showPostcode && (
                  <PostcodeSearch onComplete={handleComplete} />
              )}
            </label>
            <input type="text" name="zip" onChange={handleChange} placeholder="우편번호" value={form.zip} style={{ width: "180px", height:"35px", minWidth: 100, display: "inline-block" }} required />
            <input className="inputStyle" type="text" name="address1" onChange={handleChange} placeholder="사업자 주소 입력해주세요" value={form.address1} required />
            <input className="inputStyle" type="text" name="address2" onChange={handleChange} placeholder="상세 주소를 입력해주세요" value={form.address2} required />
          </div>
        </div>
        <div className="columnStyle">
          <label className="labelStyle">의료진 사진</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ marginBottom: "10px" }}/>
          {directorPhotoPreview && (
              <img src={directorPhotoPreview} alt="의료진 미리보기" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />)}
          <label className="labelStyle">의사 경력</label>
          <textarea className="inputStyle" name="doctorCareer" rows={4} placeholder="의사 경력을 입력해주세요" value={directorCareer} onChange={handleCareerChange} style={{ resize: "vertical", minHeight: "80px" }}/>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }} onClick={handleUpdate}>수정하기</button>
        </div>
      </div>
    </form>
  );
}

export default ChangeMyPage;
