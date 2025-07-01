import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

// 공통
// LOGIN 화면 입력창 컴포넌트
function LoginForm({ onLogin }) {
    const [form, setForm] = useState({id:'', password:''});
  const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    }

    // 로그인 버튼 누르면 실행
    const handleSignup = async (e) => {
        e.preventDefault(); // 새로고침 막아
    };

    const handleFind = e => {
      navigate("/find-account");
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append("username", form.id);
        params.append("password", form.password);
        try {
            const res = await axios.post("http://localhost:8080/login", params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            const userRole = res.data.role;
            const username = res.data.id; // 또는 res.data.username

            // Zustand에 로그인 정보 저장
            useAuthStore.getState().setUserInfo(username, userRole);
            console.log("로그인 응답:", res.data);
            navigate('/');
        } catch (error) {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }


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
                <input type="password" name='password' placeholder="비밀번호를 입력하세요" className='form-control' value={form.password} onChange={handleChange} required />
            </div>
            <div className="d-grid mb-3 mt-3">
                <button type="submit" className="btn btn-outline-dark btn-block" onClick={handleLogin}>로그인</button>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button type="button" className="btn btn-outline-light text-dark" style={{ fontSize: "1.1rem", padding: "7px 80px" }} onClick={handleFind}>아이디/비밀번호 찾기</button>
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