import React, {useEffect, useState} from 'react';

// 리뷰보기 화면
async function fetchReviews() {
  return [
    {
      id:1,
      author: "신짱구",
      date: "2025-06-25",
      content: "의사선생님이 잘생겼어요"
    },
    {
      id:1,
      author: "봉미선",
      date: "2025-06-25",
      content: "예약도 편하고, 대기시간도 짧고 친절하세요 !"
    }
  ]
}

function HospitalReview() {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetchReviews().then(setReview);
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>리뷰 보기</h2>
      {review.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>아직 등록된 리뷰가 없습니다.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {review.map((review) => (
            <li key={review.id} style={{ borderBottom: "1px solid #eee", padding: "18px 0" }}>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{review.author}</div>
              <div style={{ color: "#999", fontSize: "0.95rem", marginBottom: 6 }}>{review.date}</div>
              <div style={{ fontSize: "1.05rem", color: "#333" }}>{review.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HospitalReview;