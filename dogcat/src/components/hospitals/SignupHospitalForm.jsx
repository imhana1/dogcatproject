import React, {useState} from 'react';
import { VscLocation } from "react-icons/vsc";
import './SignupHospitalForm.css';
import { useNavigate } from "react-router-dom";

// 병원 회원가입 화면 입력창 컴포넌트
function SignupHospitalForm() {
    const [form, setForm] = useState({
        hospital: "",
        director: "",
        zip: "",
        address1: "",
        address2: "",
        id: "",
        password: "",
        passwordCheck: "",
        ceoName: "",
        ceoGender: "",
        ceoBirth: "",
        ceoPhone1: "",
        ceoPhone2: "",
        ceoPhone3: "",
        managerName: "",
        managerPhone1: "",
        managerPhone2: "",
        managerPhone3: "",
        email: "",
        emailCheck: ""
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validate = () => {
      const newErrors = {};

      if (!form.hospital) newErrors.hospital = "병원 명은 필수 입력입니다";
      if (!form.address1) newErrors.address1 = "주소는 필수 입력입니다";
      if (!form.id) newErrors.id = "ID는 필수 입력입니다";
      if (!form.password) newErrors.password = "비밀번호는 필수 입력입니다";
      if (!form.passwordCheck) newErrors.passwordCheck = "비밀번호 확인은 필수 입력입니다";
      if (!form.ceoName) newErrors.ceoName = "대표자 이름은 필수 입력입니다";
      if (!form.ceoGender) newErrors.ceoGender = "미용여부 선택은 필수입니다";
      if (!form.ceoBirth) newErrors.ceoBirth = "생년월일은 필수 입력입니다";
      if (!form.ceoPhone1 || !form.ceoPhone2 || !form.ceoPhone3) newErrors.ceoPhone = "전화번호는 필수 입력입니다";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSignup = () => {
      if (validate()) {
        // 가입 처리 및 페이지 이동
        navigate("/login");
      }
    }
    const handleChange = e => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
        // 입력할 때 해당 필드의 에러 메시지만 제거
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    return (
      <form>
            <h2 style={{ textAlign: "center" }}>JOIN</h2>
        <div className="formContainer">
          <div>
            <div style={{ marginBottom: "15px", textAlign: "left", fontWeight: "bold" }}><span style={{ color: "red"  }}>*</span> 표시 필수 입력</div>
            <div>
                {/* 왼쪽 컬럼 */}
                <label className="labelStyle">
                    병원 명 <span style={{ color: "red" }}>*</span>
                </label>
                <input className="inputStyle" type="text" name="hospital" onChange={handleChange} placeholder="병원 명을 입력해주세요" value={form.hospital} required />
                {errors.hospital && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.hospital}</div>}
            </div>
            <div>
                <label className="labelStyle">
                    주소 <span style={{ color: "red" }}>*</span>
                </label>
              <div>
                <input className="inputStyle" type="text" name="zip" onChange={handleChange} placeholder="우편번호" value={form.zip} style={{ width: "160px" }} required />
                <button type="button" className="mb-2 mt-2 btn btn-dark">
                    <span role="img" aria-label="search"><VscLocation size="20" /></span>
                </button>
              </div>
              <div>
                <input className="inputStyle" type="text" name="address1" onChange={handleChange} placeholder="사업자 주소 입력해주세요" value={form.address1} required />
                <input className="inputStyle" type="text" name="address2" onChange={handleChange} placeholder="상세 주소를 입력해주세요" value={form.address2} required />
                {errors.address1 && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.address1}</div>}
              </div>
            </div>
            <div>
                <label className="labelStyle">
                    ID <span style={{ color: "red" }}>*   <button type="button" className="buttonStyle">ID 중복 확인</button></span>
                </label>
                <input className="inputStyle" type="text" name="id" onChange={handleChange} placeholder="아이디를 입력해주세요" value={form.id} required />
                {errors.id && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.id}</div>}
            </div>
            <div>
                <label className="labelStyle">
                    Password <span style={{ color: "red" }}>*</span>
                </label>
                <input className="inputStyle" type="text" name="password" onChange={handleChange} placeholder="비밀번호를 입력해주세요" value={form.password} required />
                {errors.password && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.password}</div>}
            </div>
            <div>
                <label className="labelStyle">
                    비밀번호확인 <span style={{ color: "red" }}>*</span>
                </label>
                <input className="inputStyle" type="text" name="passwordCheck" onChange={handleChange} placeholder="6~10자로 입력해주세요" value={form.passwordCheck} required />
                {errors.passwordCheck && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.passwordCheck}</div>}
            </div>
          </div>
           <div>
             <div>
              {/* 오른쪽 컬럼 */}
               <div style={{ marginBottom: "15px", textAlign: "left" }}><span></span></div>
              <label className="labelStyle">
              대표자 이름 <span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" name="ceoName" onChange={handleChange} placeholder="대표자이름을 입력해주세요" value={form.ceoName} style={{ width: "120%", padding: "8px 10px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px", boxSizing: "border-box"}} required />
               {errors.ceoName && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.ceoName}</div>}
             </div>
             <div>
              <label className="labelStyle">
              미용여부 <span style={{ color: "red" }}>*</span>
              </label>
              <input type="radio" name="ceoGender" onChange={handleChange} value="예" checked={form.ceoGender === "예"} required />예
              <input type="radio" name="ceoGender" onChange={handleChange} value="아니요" checked={form.ceoGender === "아니요"} required />아니요
               {errors.ceoGender && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.ceoGender}</div>}
             </div>
             <div>
              <label className="labelStyle">
              대표자 생년월일 <span style={{ color: "red" }}>*</span>
              </label>
              <input className="inputStyle" type="date" name="ceoBirth" onChange={handleChange} placeholder="YYYY-DD-MM" value={form.ceoBirth} required />
               {errors.ceoBirth && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.ceoBirth}</div>}
             </div>
             <label className="labelStyle">
               대표자 전화번호 <span style={{ color: "red" }}>*</span>
             </label>
              <div className="phone-row" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
              <select name="ceoPhone1" onChange={handleChange} value={form.ceoPhone1}  style={{ width: "80px", padding: "8px 10px", fontSize: "1rem", flexGrow: 1, border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }} required>
                <option value="">선택</option>
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="02">02</option>
              </select>
               <span>-</span>
               <input type="text" name="ceoPhone2" onChange={handleChange} value={form.ceoPhone2} style={{ width: "80px", padding: "8px 10px", fontSize: "1rem", flexGrow: 1, border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box"}} required />
               <span>-</span>
               <input type="text" name="ceoPhone3" onChange={handleChange} value={form.ceoPhone3} style={{ width: "80px", padding: "8px 10px", fontSize: "1rem", flexGrow: 1, border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box"}} required />
              </div>
             {errors.ceoPhone && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.ceoPhone}</div>}
            <div>
              {/* 버튼 일부러 이렇게 한거임 ! 옆에 공간 스페이스바로 주고 옆에 딱 나오게 */}
              <label className="labelStyle">Email  <button type="button" className="buttonStyle">Email 발송</button></label>
              <input type="email" name="email" onChange={handleChange} placeholder="you@example.com" value={form.email} style={{ width: "120%", padding: "8px 10px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px", boxSizing: "border-box"}} required />
            </div>
            <div>
              <label className="labelStyle">코드 인증</label>
              <input type="text" name="emailCheck" onChange={handleChange} placeholder="이메일에 받은 코드를 입력해주세요" value={form.emailCheck} style={{ width: "120%", padding: "8px 10px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px", boxSizing: "border-box"}} required />
              <button type="button" className="buttonStyle">확인</button>
            </div>
           </div>
        </div>
        <div className="d-grid">
          <button type="button" className="btn btn-outline-dark btn-block" onClick={handleSignup}>가입하기</button>
        </div>
      </form>
    );
}

export default SignupHospitalForm;