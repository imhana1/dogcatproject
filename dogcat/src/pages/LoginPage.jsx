import React, {useState} from 'react';
import { GoPerson } from "react-icons/go";
import { VscLayout } from "react-icons/vsc";
import LoginForm from "../components/LoginForm";

// 공통화면
// 회원가입 할 때 회원, 병원 선택 페이지
function LoginPage() {
    const handleLogin = (formData) => {
        // formData = { id: "...", password: "..." }
        console.log('로그인 시도:', formData);
    };

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>JOIN</h2>
            <div className="login-container" >
                <div style={{ border: "2px solid #ccc", padding: "90px 90px", display: "flex", justifyContent: "center", gap: "40px", marginTop: "30px"}}>
                    <div style={{ border: "1px solid #ddd", width: "400px", height: "400px",borderRadius: "12px", display: "flex", justifyContent: "center",alignItems: "center", gap: "30px", marginTop: "30px"}}>
                        <GoPerson size={100} />
                        <a href="/nmembersignup" style={{ marginTop: "10px", fontSize: "2.1rem", fontWeight: "500" }}>개인회원</a>
                    </div>
                    <div style={{ border: "1px solid #ddd", width: "400px", height: "400px",borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center", gap: "30px", marginTop: "30px"}}>
                        <VscLayout size={100} />
                        <a href="/hospital-signup" style={{ fontSize: "2.1rem", fontWeight: "500" }}>병원회원</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;