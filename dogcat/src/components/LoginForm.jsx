import React, {useState} from 'react';
import {Link} from "react-router-dom";
import LoginPage from "../pages/LoginPage";

// 공통
// LOGIN 화면 입력창 컴포넌트
function LoginForm({ onLogin }) {
    const [form, setForm] = useState({id:'', password:''});

    const handleChange = e => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    }

    // 로그인 버튼 누르면 실행
    const handleSignup = e => {
        e.preventDefault(); // 새로고침 막아
        onLogin(form); // 부모 컴포넌트에서 로그인 처리
    };

    return (
        <form onSubmit={handleSignup} className="mb-3 mt-3 table table-border">
            <h2 className="text-center">LOGIN</h2>
            <div className="mb-3">
                <label htmlFor="id" className="form-label">ID</label>
                {/* required 빈 값 막기 */}
                <input type="text" name='id' placeholder="아이디를 입력하세요" className='form-control' value={form.id} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="text" name='password' placeholder="비밀번호를 입력하세요" className='form-control' value={form.password} onChange={handleChange} required />
            </div>
            <div className="d-grid mb-3 mt-3">
                <button type="button" className="btn btn-outline-dark btn-block">로그인</button>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button type="button" className="btn btn-outline-light text-dark" style={{ fontSize: "1.1rem", padding: "7px 80px" }}>아이디/비밀번호 찾기</button>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                회원이 아니신가요 ?
                <Link to="/signup">
                    <button type="button" className="btn btn-link">회원가입 하기</button>
                </Link>
            </div>
        </form>
    );
}

export default LoginForm;