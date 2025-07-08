import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

// 진료 결과
function BookingResult({bookingId, userId}) {
    // 진단명, 처방, 특이사항
    const [form, setForm] = useState({rno:'', tTitle:'', tContent:''});
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    // 로그인 정보 저장
    const { username } = useAuthStore();

    // username이 바뀔 때 form.tWriter도 같이 바뀌도록 useEffect 추가
    const checkAuth = useAuthStore(state => state.checkAuth);
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleSubmit = async e => {
        e.preventDefault();
        // 백 입력 dto
        const payload = {
                rno: form.rno,
                title: form.tTitle,
                content: form.tContent,
        };
        console.log("🟩 최종 payload 전송 데이터:", payload);
        try {
            await axios.post('http://localhost:8080/hospital/treat', payload, { withCredentials: true });
            alert('진료결과가 등록되었습니다.');
            navigate('/result-list');
            // 입력 폼 초기화 등 추가 동작
        } catch (error) {
            alert('진료결과 등록에 실패했습니다.');
        }
    };
  return (
    <div className="boxStyle">
      <br />
        <h3 style={{ textAlign: "center" }}>{userId} 고객님 진료결과입니다</h3>
        <form onSubmit={handleSubmit}>
            <input name="rno" className="inputStyle" value={form.rno} onChange={handleChange} placeholder="예약번호" />
            <input name="tTitle" className="inputStyle" value={form.tTitle} onChange={handleChange} placeholder="진단명" />
            <textarea name="tContent" className="inputStyle" value={form.tContent} onChange={handleChange} placeholder="처방내용" />
            <div className="d-grid mb-3 mt-3">
                <button type="submit" className="btn btn-outline-dark btn-block">작성하기</button>
            </div>
        </form>
    </div>
  );
}

export default BookingResult;