import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ChangeMyPage.css';
import {VscLocation} from "react-icons/vsc";
import PostcodeSearch from "../../components/hospitals/PostcodeSearch";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";

function ChangeMyPage() {
  const navigate = useNavigate();
  const [showPostcode, setShowPostcode] = useState(false);
  const [directorPhoto, setDirectorPhoto] = useState(null);
  const [directorPhotoPreview, setDirectorPhotoPreview] = useState(null); // 미리보기용
  const [hospitalPhoto, setHospitalPhoto] = useState(null);
  const [hospitalPhotoPreview, setHospitalPhotoPreview] = useState(null);// 병원 미리보기
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
    hospitalPhoto:"",
    introtext: "",  // 소개글
    directorPhoto: "",
    directorCareer: "",  // 의사 경력
    treatmentStart: "",  // 진료 시작 시간
    treatmentEnd: ""    // 진료 종료 시간
  });

  useEffect(() => {
    const fetch=async()=>{
      try{
        const response = await axios.get("http://localhost:8080/hospital", {withCredentials:true});
        const data = response.data;
        console.log(data);
        setForm({
          hospitalName: data.hospital,
          address1: data.haddress,
          hospital: data.husername,
          ceoName: data.director,
          zip: data.zip,
          email: data.email,
          ceoBirth: data.hbirthDay,
          ceoPhone2: data.htel,
          directorCareer: data.educational,
          treatmentStart: data.openTime,  // 진료 시작 시간
          treatmentEnd: data.closeTime,
          introtext: data.hintroduction,
          address2: data.hsubaddress
        });
        if (data.dprofile) setDirectorPhotoPreview(data.dprofile);
        if (data.hprofile) setHospitalPhotoPreview(data.hprofile);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const handleUpdate = async() => {
    const formData = new FormData()

    const dto={
      hUsername: form.hospital,             // 병원 아이디
      director: form.ceoName,               // 대표자 이름
      hospital: form.hospitalName,          // 병원 이름
      hTel: form.ceoPhone2,                 // 대표자 전화번호
      hReptel: "",                          // (없으면 빈 문자열 또는 null)
      zip: form.zip ? Number(form.zip) : null, // 우편번호 (Integer로 매핑)
      hAddress: form.address1,              // 주소
      openTime: form.treatmentStart,                         // (시간 입력 없으므로 빈 문자열)
      closeTime: form.treatmentEnd,                        // (시간 입력 없으므로 빈 문자열)
      hIntroduction: form.introtext,                    // (병원 소개 없으면 빈 문자열)
      educational: form.directorCareer,
      hSubaddress: form.address2
    }
    formData.append("dto", new Blob([JSON.stringify(dto)],{ type: "application/json" }));

    // if (directorPhoto) formData.append("dProfile", directorPhoto || new Blob([], { type: "application/octet-stream" }));
    // if (hospitalPhoto) formData.append("hProfile", hospitalPhoto || new Blob([], { type: "application/octet-stream" }));
    formData.append("dProfile", directorPhoto || new Blob([], { type: "application/octet-stream" }));
    formData.append("hProfile", hospitalPhoto || new Blob([], { type: "application/octet-stream" }));

    try {
      const response = await  axios.post("http://localhost:8080/hospital/change",formData, {
        withCredentials:true,
        headers: {
        "Content-Type": "multipart/form-data"}
      });
      navigate("/hospital-mypage");
    } catch (err) {
      console.error(err);
      alert("정보 변경 중 오류가 발생했습니다: " + err.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 로그인 정보 저장
  const { username, resetUserInfo } = useAuthStore();
  console.log("Booking username:", username);

  const checkAuth = useAuthStore(state => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
    if (file) {
      setDirectorPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDirectorPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setDirectorPhoto(null);
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
            <label className="labelStyle">
              병원 아이디 <span style={{ color: "red" }}>*</span>
            </label>
            <input className="inputStyle" type="text" name="hospital" onChange={handleChange} placeholder="병원 아이디를 입력해주세요" value={form.hospital} required readOnly={true} />
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
            <label className="labelStyle">
              진료시간 <span style={{ color: "red" }}>*</span>
            </label>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input className="inputStyle" type="time" name="treatmentStart" onChange={handleChange} value={form.treatmentStart} style={{ width: 140 }} required/>
              ~
              <input className="inputStyle" type="time" name="treatmentEnd" onChange={handleChange} value={form.treatmentEnd} style={{ width: 140 }} required />
            </div>

          </div>
          {/* 오른쪽 컬럼 */}
          <div className="columnStyle">
            <label className="labelStyle">Email</label>
            <input className="inputStyle" type="email" name="email" onChange={handleChange} placeholder="you@example.com" value={form.email} required readOnly={true} />
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
            <label className="labelStyle">
              의료진 사진
            </label>
            <input className="inputStyle" type="file" accept="image/*" onChange={handlePhotoChange} />
            {directorPhotoPreview && (
                <div style={{ margin: "10px 0" }}>
                  <img src={directorPhotoPreview} alt="의사 사진 미리보기" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 10, border: "1px solid #ddd" }} />
                </div>
            )}
            <label className="labelStyle">
              원장이력
            </label>
            <textarea className="inputStyle" name="directorCareer" onChange={handleChange} placeholder="소개글 내용을 작성해주세요" value={form.directorCareer} required />
            <label className="labelStyle">
            소개글
          </label>
            <textarea className="inputStyle" name="introtext" onChange={handleChange} placeholder="소개글 내용을 작성해주세요" value={form.introtext} required />
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
