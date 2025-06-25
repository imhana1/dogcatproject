import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

// 아이디, 비밀번호 찾기
function FindAccount({ onLogin }) {
  const [form, setForm] = useState({name:'', email:''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSignup = async (e) => {
    e.preventDefault(); // 새로고침 막아
  };

  return (
    <form onSubmit={handleSignup} className="mb-3 mt-3 table table-border">
      <h2 className="text-center">ID, PWD 찾기</h2>
      <hr />
      <div className="mb-3">
        <label htmlFor="name" className="form-label">이름</label>
        {/* required 빈 값 막기 */}
        <input type="text" name='name' placeholder="이름을 입력하세요" className='form-control' value={form.name} onChange={handleChange} required/>
      </div>
      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" name='email' placeholder="이메일을 입력하세요" className='form-control' value={form.email} onChange={handleChange} required />
      </div>
      <div className="d-grid mb-3 mt-3">
        <button type="submit" className="btn btn-outline-dark btn-block">인증메일 보내기</button>
      </div>
    </form>
  );
}

export default FindAccount;