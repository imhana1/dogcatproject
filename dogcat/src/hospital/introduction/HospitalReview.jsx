import React, {useEffect, useState} from 'react';
import axios from "axios";
import useAuthStore from "../../stores/useAuthStore";

// 리뷰보기 화면
async function fetchReviews() {
  const response = await axios.get("http://localhost:8080/review?pageno=1&pagesize=10", {
    withCredentials: true
  });
  return response.data.reviews || [];
}

function HospitalReview() {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetchReviews()
        .then(data => {
          console.log("리뷰 응답:", data);
          setReview(data);
        })
        .catch(err => {
          console.error("리뷰 불러오기 실패:", err);
          setReview([]);
        });
  }, []);

    // 로그인 정보 저장
    const { username, resetUserInfo } = useAuthStore();
    console.log("Booking username:", username);

  // 리뷰 삭제
    const handleDelete = async (revNo) => {
        const confirmed = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");
        if (!confirmed) return;
        try {
            await axios.delete(`http://localhost:8080/review/delete`, {
                params: { revNo },
                withCredentials: true
            });
            alert("리뷰가 삭제되었습니다!");

            // 삭제 후 목록 새로고침
            const reviews = await fetchReviews();
            setReview(reviews);
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제 권한이 없거나 오류가 발생했습니다.");
        }
    };


    return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>리뷰 보기</h2>
      {review.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>아직 등록된 리뷰가 없습니다.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {review.map((review, idx) => (
            <li key={review.revNo || idx} style={{ borderBottom: "1px solid #eee", padding: "18px 0" }}>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{review.revWriter || "작성자 없음"}</div>
              <div style={{ color: "#999", fontSize: "0.95rem", marginBottom: 6 }}>{new Date(review.revWriteDay).toLocaleDateString() || "날짜 없음"}</div>
              <div style={{ fontSize: "1.05rem", color: "#333" }}>{review.revContent || "내용 없음"}</div>
                {/* 본인이 작성한 리뷰일 때만 삭제 버튼 노출 */}
                {review.revWriter === username && (
                    <button className="btn btn-danger" onClick={() => handleDelete(review.revNo)} style={{ marginTop: 8, padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer",}}>삭제</button>
                )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HospitalReview;