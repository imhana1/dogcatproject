import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

// 아이디, 비밀번호 찾기
function FindAccount() {
  const [form, setForm] = useState({id:''});
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  }

  // const handleSignup = async (e) => {
  //   e.preventDefault(); // 새로고침 막아
  // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('username', form.id);

            await axios.put('http://localhost:8080/getTemporaryPassword', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('임시 비밀번호가 이메일로 발송되었습니다. 메일을 확인해 주세요.');
        } catch (error) {
            setMessage('일치하는 계정이 없거나, 메일 발송에 실패했습니다.');
        }
    };

  return (
    <form onSubmit={handleSubmit} className="mb-3 mt-3 table table-border">
      <h2 className="text-center">PWD 찾기</h2>
      <hr />
      <div className="mb-3">
        <label htmlFor="name" className="form-label">ID</label>
        {/* required 빈 값 막기 */}
        <input type="text" name='id' placeholder="이름을 입력하세요" className='form-control' value={form.id} onChange={handleChange} required/>
      </div>
      <div className="d-grid mb-3 mt-3">
        <button type="submit" className="btn btn-outline-dark btn-block">인증메일 보내기</button>
      </div>
        {message && <div className="alert alert-info mt-2">{message}</div>}
    </form>
  );
}

export default FindAccount;