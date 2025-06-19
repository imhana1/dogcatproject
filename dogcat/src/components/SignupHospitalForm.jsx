import React, {useState} from 'react';
import { VscLocation } from "react-icons/vsc";

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
        email: ""
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    }

    const formColStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    };

    return (
        <form>
            <h2 className="text-center">JOIN</h2>
            <p><span style={{ color: "red" }}>*</span> 표시 필수 입력</p>
            <div style={formColStyle}>
                <label>
                    병원 명 <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" name="hospital" onChange={handleChange} placeholder="병원 명을 입력해주세요" value={form.hospital} required />
            </div>
            <div >
                <label>
                    주소 <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" name="zip" onChange={handleChange} placeholder="우편주소" value={form.zip} required />
                <button type="button">
                    <span role="img" aria-label="search"><VscLocation size="20" /></span>
                </button>
            </div>
        </form>
    );
}

export default SignupHospitalForm;