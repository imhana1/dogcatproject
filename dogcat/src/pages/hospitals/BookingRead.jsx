import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

// 진료 결과
function BookingResult({bookingId, userId}) {
    const [param]= useSearchParams();
    const rno= parseInt(param.get('rno'));
    // 진단명, 처방, 특이사항
    const [form, setForm] = useState({rno:'', tTitle:'', tContent:''});
    const navigate = useNavigate();
    const [treatData, setTreatData] =useState(null);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    console.log("BookingResult 렌더링");
    useEffect(()=>{
        const fetch= async ()=>{
            try {
                const response = await  axios.get(`http://localhost:8080/hospital/treat-read?rno=${rno}`, {withCredentials:true})
                const data = response.data;
                setTreatData(data);
                console.log(data);
                setForm({
                    rno: data.rno,
                    tTitle: data.ttitle,
                    tContent:data.tcontent
                })
            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    },[rno])

    // 로그인 정보 저장
    const { username } = useAuthStore();

    // username이 바뀔 때 form.tWriter도 같이 바뀌도록 useEffect 추가
    const checkAuth = useAuthStore(state => state.checkAuth);
    useEffect(() => {
        // checkAuth();
    }, [checkAuth]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ 기본 동작 방지
        const payload={
            sender:"",
            receiver:treatData.nusername,
            message:"진료결과가 수신되었습니다",
            url:`http://localhost:3000/result-read?rno=${rno}`
        }
        try {
            console.log("🚀 메시지 전송 시도", payload);
            await axios.post("http://localhost:8080/api/message", payload, { withCredentials: true });
            alert("진료결과 메시지를 전송했습니다.");
        } catch (e) {
            console.log(e);
            alert("메시지 전송 실패");
        }
        // e.preventDefault();
        // 백 입력 dto
        // const payload = {
        //         rno: u,
        //         ttitle: form.tTitle,
        //         tcontent: form.tcontent,
        // };
        // console.log("🟩 최종 payload 전송 데이터:", payload);
        // try {
        //     await axios.post('http://localhost:8080/hospital/treat', payload, { withCredentials: true });
        //     alert('진료결과가 등록되었습니다.');
        //     navigate('/result-list');
        //     // 입력 폼 초기화 등 추가 동작
        // } catch (error) {
        //     alert('진료결과 등록에 실패했습니다.');
        // }
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
                <button type="submit" className="btn btn-outline-dark btn-block">고객에게 보내기</button>
            </div>
        </form>
    </div>
  );
}

export default BookingResult;