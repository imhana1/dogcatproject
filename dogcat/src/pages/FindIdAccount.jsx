import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

// 아이디 찾기
function FindIdAccount() {
    const [form, setForm] = useState({email:''});
    const [foundId, setFoundId] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleChange = e => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('username', form.email);

            const response = await axios.get('http://localhost:8080/findUsername', {
                params: { email: form.email }
            });
            setMessage(`id는 ${response.data}`);
        } catch (error) {
            setMessage('계정이 없습니다');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3 mt-3 table table-border">
            <h2 className="text-center">ID 찾기</h2>
            <hr />
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Email</label>
                {/* required 빈 값 막기 */}
                <input type="email" name='email' placeholder="이메일을 입력하세요" className='form-control' value={form.email} onChange={handleChange} required/>
            </div>
            <div className="d-grid mb-3 mt-3">
                <button type="submit" className="btn btn-outline-dark btn-block">아이디 찾기</button>
            </div>
            {message && <div className="alert alert-info mt-2">{message}</div>}
        </form>
    );
}

export default FindIdAccount;