import React, {useEffect, useState} from 'react';
import axios from "axios";
import useAuthStore from "../../stores/useAuthStore";
import {useNavigate, useParams} from "react-router-dom";

function ReviewUpdate() {
    const navigate = useNavigate();
    const [review, setReview] = useState({ revContent: '' });
    const { revNo } = useParams(); // 리뷰번호 가져오기

    // 로그인 정보 저장
    const { username } = useAuthStore();
    console.log("Booking username:", username);

    // 리뷰 불러오기
    useEffect(() => {
        if (!revNo) return;
        axios.get("http://localhost:8080/review/review", { params: { revNo }, withCredentials: true
        })
            .then(res => {
                console.log("불러온 리뷰:", res.data);
                setReview({
                    revNo: res.data.revNo,
                    revContent: res.data.revContent
                });
            })
            .catch(err => {
                console.error("리뷰 불러오기 실패:", err);
                alert("리뷰를 불러올 수 없습니다.");
            });
    }, [revNo]);

    // 리뷰 수정 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("수정 요청 보냄:", review);
            await axios.put("http://localhost:8080/review/update", review, { withCredentials: true }
            );
            alert("리뷰가 수정되었습니다.");
            navigate("/hospital-review");
        } catch (err) {
            console.error("수정 실패:", err);
            console.error("서버 응답:", err.response?.data);
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 24 }}>
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>리뷰 수정</h2>
            <form onSubmit={handleSubmit}>
        <textarea value={review.revContent} onChange={(e) => setReview(prev => ({ ...prev, revContent: e.target.value }))}
                  style={{width: '650px', height: '200px', padding: '14px', fontSize: '1.08rem', borderRadius: '7px', border: '1px solid #bbb'}} />
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <button className="btn btn-success" type="submit">수정하기</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewUpdate;