import React, {useState} from 'react';
import HeaderUser from "../../fragments/nuser/HeaderUser";
import NavUserMenu from "../../fragments/nuser/NavUserMenu";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import styles from "../notice/Notice.module.css";

// 고객이 리뷰 작성하는 화면
function ReviewWrite() {
    // 로그인 정보 저장
    const { username } = useAuthStore();

    const rno = Number(useParams().rno);
    if (isNaN(rno)) {
        console.error("유효하지 않은 예약번호입니다.");
    }
    // 예약번호, 작성자, 작성일, 내용
    const [form, setForm] = useState({rno: rno ||'', content:''});
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("rno", form.rno);
        formData.append("content", form.revContent);
        console.log("🟩 최종 payload 전송 데이터:", formData);
        console.log("🟩 최종 payload 전송 데이터:", formData);
        try {
            await axios.post('http://localhost:8080/review/new', formData, {withCredentials: true});
            alert('리뷰가 작성되었습니다');
            navigate('/hospital-review');
            // 입력 폼 초기화 등 추가 동작
        } catch (error) {
            alert('같은 번호로는 여러번의 리뷰를 작성 할 수 없습니다');
        }
    };

    return (
        <div className={styles.ntcWrapper}>
            <HeaderUser />
            <main style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
                <NavUserMenu activeTab="nuser-reservations" />
                <form onSubmit={handleSubmit} style={{maxWidth: "700px", width: "100%", margin: "60px auto", padding: "40px 36px", background: "#fff",
                    borderRadius: "14px", boxShadow: "0 2px 16px rgba(0,0,0,0.11)", display: "flex", flexDirection: "column", alignItems: "center"}} >
                    <h3 style={{ textAlign: "center" }}>리뷰 작성하기</h3>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ fontWeight: "bold", display: "block", marginBottom: 4 }}>예약번호</label>
                        <input name="rno" className="inputStyle" value={form.rno} onChange={handleChange} readOnly={true} style={{width: '500px', padding: '14px', fontSize: '1.08rem', borderRadius: '7px', border: '1px solid #bbb'}} />
                    </div>
                    <div>
                        <label style={{ fontWeight: "bold", display: "block", marginBottom: 4 }}>리뷰내용을 작성해주세요</label>
                        <textarea name="revContent" className="inputStyle" value={form.revContent} onChange={handleChange} style={{width: '500px', height: '200px', padding: '14px', fontSize: '1.08rem', borderRadius: '7px', border: '1px solid #bbb'}} />
                    </div>
                    <div className="d-grid mb-3 mt-3">
                        <button type="submit" className="btn btn-outline-dark btn-block">작성하기</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default ReviewWrite;