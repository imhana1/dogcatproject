import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";

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
        psname: form.psname // 수술 이름
    }
    formData.append("dto", new Blob([JSON.stringify(dto)], { type : "application/json" }));
    formData.append("pprof", petphoto || new Blob([], { type: "application/octet-stream" }));

    formData.append("pprof", petphoto || new Blob([], { type: "application/octet-stream"}));

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
    <form>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 60px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}
        >
          너도멍냥
        </div>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "30px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link
                to="/nuser-mypage"
                style={{ color: "#333", textDecoration: "none" }}
              >
                내 정보 보기
              </Link>
            </li>
            <li>
              <Link
                to="/nuser-pet"
                style={{ color: "#333", textDecoration: "none" }}
              >
                <span style={{ color: "#ff5f2e", fontWeight: "bold" }}>
                  나의 반려동물
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/nuser-booking"
                style={{ color: "#333", textDecoration: "none" }}
              >
                예약내역
              </Link>
            </li>
            <li>
              <Link
                to="/nuser-qna"
                style={{ color: "#333", textDecoration: "none" }}
              >
                문의사항
              </Link>
            </li>
            <li>
              <Link
                to="/nuser-adoption"
                style={{ color: "#333", textDecoration: "none" }}
              >
                유기동물 관심 목록
              </Link>
            </li>
          </ul>
        </nav>
        {username ? (
          <button
            type="button"
            className="btn btn-outline-dark"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              resetUserInfo();
              window.location.href = "/"; // 로그아웃 후 홈으로 이동
            }}
          >
            로그아웃
          </button>
        ) : (
          <Link to="/login">
            <button
              type="button"
              className="btn btn-outline-dark"
              style={{ fontWeight: "bold" }}
            >
              로그인
            </button>
          </Link>
        )}
      </header>
      <div style={{ display: "flex", marginTop: "38px" }}>
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1.7px solid #222",
            borderRadius: "20px",
            padding: "60px 60px 58px 58px",
            marginRight: "54px",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "42px",
              textAlign: "center",
            }}
          >
            <span>나의 반려동물</span>정보
          </div>
          {/* 왼쪽 */}
          <div className="formContainer">
            <label className="labelStyle">동물 번호</label>
            <input
              className="inputStyle"
              type="text"
              onChange={handleChange}
              name="pno"
              placeholder="동물번호를 입력해주세요"
              value={form.pno}
              required
            />
          </div>
          <div>
            <label className="labelStyle">이름</label>
            <input
              className="inputStyle"
              type="text"
              onChange={handleChange}
              name="pname"
              placeholder="이름을 입력해주세요"
              value={form.pname}
              required
            />
          </div>
          <div>
            <label className="labelStyle">종류</label>
            <input
              className="inputStyle"
              type="text"
              onChange={handleChange}
              name="ptype"
              placeholder="동물 종류를 입력해주세요"
              value={form.ptype}
              required
            />
          </div>
          <div>
            <label className="labelStyle">품종</label>
            <input
              className="inputStyle"
              type="text"
              onChange={handleChange}
              name="pbreed"
              placeholder="품종을 입력해주세요"
              value={form.pbreed}
              required
            />
          </div>
          <div>
            <label className="labelStyle">내장칩 유무</label>
            <input
              className="inputStyle"
              type="text"
              name="pmichipe"
              onChange={handleChange}
              placeholder="내장칩 유무를 입력해주세요"
              value={form.pmichipe}
              required
            />
          </div>
          <div>
            <label className="labelStyle">몸무게</label>
            <input
              className="inputStyle"
              type="text"
              name="pweight"
              onChange={handleChange}
              placeholder="몸무게를 입력해주세요"
              value={form.pweight}
              required
            />
          </div>
        </div>
      </div>
      {/* 오른쪽 */}
      <div style={{ minWidth: "220px" }}>
        <div>
          <label className="labelStyle">생년월일</label>
          <input
            className="inputStyle"
            type="text"
            name="page"
            onChange={handleChange}
            placeholder="YYYY-DD-MM"
            value={form.page}
            required
          />
        </div>
        <div>
          <label className="labelStyle">알러지 유무</label>
          <input
            className="inputStyle"
            type="text"
            name="palg"
            onChange={handleChange}
            placeholder="알러지가 있다면 작성해주세요"
            value={form.palg}
            required
          />
        </div>
        <div>
          <label className="labelStyle">펫 보험</label>
          <input
            className="inputStyle"
            type="text"
            name="pins"
            onChange={handleChange}
            placeholder="펫 보험이 가입 되어 있다면 작성해주세요"
            value={form.pins}
            required
          />
        </div>
        <div>
          <label className="labelStyle">선천적 지병</label>
          <input
            className="inputStyle"
            type="text"
            name="pchronic"
            onChange={handleChange}
            placeholder="선천적 지병이 있다면 작성해주세요"
            value={form.pchronic}
            required
          />
        </div>
        <div>
          <label className="labelStyle">수술 이력</label>
          <input
            className="inputStyle"
            type="text"
            name="psname"
            onChange={handleChange}
            placeholder="수술 이력이 있다면 이름을 작성해주세요"
            value={form.psname}
            required
          />
        </div>
        <div>
          <label className="labelStyle">프로필</label>
          <input
            className="inputStyle"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </div>
      </div>
      {/* 오른쪽 */}
      <aside
        style={{
          width: "180px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <button
          className="btn btn-outline-dark"
          onClick={handleEdit}
          style={{ marginBottom: "20px", width: "100%" }}
        >
          저장
        </button>
      </aside>
    </form>
  );
};

export default MyPetWrite;
