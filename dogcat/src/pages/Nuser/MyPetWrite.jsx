import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna';
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna';
import styles from '../notice/Notice.module.css';
import NavUserMenu from "../../fragments/nuser/NavUserMenu";
import HeaderUser from "../../fragments/nuser/HeaderUser";

const MyPetWrite = () => {
  const navigate = useNavigate();
  const [petphoto, setPetphoto] = useState(null);
  const [petphotoUrl, setPetphotoUrl] = useState(null);

  const [form, setForm] = useState({
    pno: "", // 동물 번호
    ptype: "", // 동물 종류
    pmichipe: "", // 내장칩 유무
    pbreed: "", // 품종
    pname: "", // 이름
    pweight: "", // 몸무게
    page: "", // 나이
    palg: "", // 알러지 유무
    pins: "", // 펫보험 여부
    pchronic: "", // 선천적 지병
    psname: "", // 수술 이름
    pprof: "", // 펫프사
    pprofUrl: ""  // 펫 프사 Url
  });

  // 프로필 사진 업로드
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPetphoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPetphotoUrl(reader.result);
    } else {
      setPetphotoUrl(null);
    }
  };

  // 로그인 정보 저장
  const { username, resetUserInfo } = useAuthStore();
  console.log("username:", username);

  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 등록 완료시 정보페이지로 이동
  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    const dto = {
        pno: form.pno, // 동물 번호
        nid: username,
        ptype: form.ptype, // 동물 종류
        pmichipe: form.pmichipe, // 내장칩 유무
        pbreed: form.pbreed, // 품종
        pname: form.pname, // 이름
        pweight: form.pweight, // 몸무게
        page: form.page, // 나이
        palg: form.palg, // 알러지 유무
        pins: form.pins, // 펫보험 여부
        pchronic: form.pchronic, // 선천적 지병
        psname: form.psname, // 수술 이름
    }
    formData.append("dto", new Blob([JSON.stringify(dto)], { type : "application/json" }));
    formData.append("pprof", petphoto || new Blob([], { type: "application/octet-stream" }));

    try {
        const response = await axios.post("http://localhost:8080/nuser-petsave", formData, {
            withCredentials : true,
            headers: {
              "Content-Type": "multipart/form-data"}
        });
        navigate("/nuser-pet");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className={styles.ntcWrapper}>
      <HeaderUser />
      <main style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
        <NavUserMenu activeTab="nuser-petsave" />
        <div className="boxStyle" style={{ width: '100%', maxWidth: '1000px' }}>
          <div style={{ marginBottom: "15px", textAlign: "left", fontWeight: "bold" }}>
            {/* 제목 또는 빈 공간 */}
            <div style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "42px", textAlign: "center" }}>
                    <span>나의 반려동물</span>정보
              </div>
          </div>
          <div className="formContainerStyle" style={{ display: "flex" }}>
            {/* 왼쪽 컬럼 */}
            <div className="columnStyle" style={{ flex: 1, paddingRight: "30px" }}>
              <label className="labelStyle">프로필 사진</label>
              <input
                className="inputStyle"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />

              <label className="labelStyle">동물 번호</label>
              <input
                className="inputStyle"
                type="text"
                onChange={handleChange}
                name="pno"
                placeholder="동물번호를 입력해주세요"
                value={form.pno}
              />

              <label className="labelStyle">이름</label>
              <input
                className="inputStyle"
                type="text"
                onChange={handleChange}
                name="pname"
                placeholder="이름을 입력해주세요"
                value={form.pname}
              />

              <label className="labelStyle">종류</label>
              <input
                className="inputStyle"
                type="text"
                onChange={handleChange}
                name="ptype"
                placeholder="동물 종류를 입력해주세요"
                value={form.ptype}
              />

              <label className="labelStyle">품종</label>
              <input
                className="inputStyle"
                type="text"
                onChange={handleChange}
                name="pbreed"
                placeholder="품종을 입력해주세요"
                value={form.pbreed}
              />

              <label className="labelStyle">내장칩 유무</label>
              <input
                className="inputStyle"
                type="text"
                name="pmichipe"
                onChange={handleChange}
                placeholder="내장칩 유무를 입력해주세요"
                value={form.pmichipe}
              />
            </div>

            {/* 오른쪽 컬럼 */}
            <div className="columnStyle" style={{ flex: 1, paddingLeft: "30px" }}>
              <label className="labelStyle">몸무게</label>
              <input
                className="inputStyle"
                type="text"
                name="pweight"
                onChange={handleChange}
                placeholder="몸무게를 입력해주세요"
                value={form.pweight}
              />

              <label className="labelStyle">생년월일</label>
              <input
                className="inputStyle"
                type="date"
                name="page"
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
                value={form.page}
              />

              <label className="labelStyle">알러지 유무</label>
              <input
                className="inputStyle"
                type="text"
                name="palg"
                onChange={handleChange}
                placeholder="알러지가 있다면 입력해주세요"
                value={form.palg}
              />

              <label className="labelStyle">펫 보험</label>
              <input
                className="inputStyle"
                type="text"
                name="pins"
                onChange={handleChange}
                placeholder="펫보험이 있다면 입력해주세요"
                value={form.pins}
              />

              <label className="labelStyle">선천적 지병</label>
              <input
                className="inputStyle"
                type="text"
                name="pchronic"
                onChange={handleChange}
                placeholder="선천적지병이 있다면 입력해주세요"
                value={form.pchronic}
              />

              <label className="labelStyle">수술 이력</label>
              <input
                className="inputStyle"
                type="text"
                name="psname"
                onChange={handleChange}
                placeholder="수술 이력이 있다면 이름을 입력해주세요"
                value={form.psname}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button
              type="button"
              className="btn btn-outline-dark btn-block"
              style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }}
              onClick={handleEdit}
            >
              저장
            </button>
          </div>
        </div>
      </main>
    </form>
  );
};

export default MyPetWrite;
