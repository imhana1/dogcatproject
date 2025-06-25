import React, {useState} from 'react';
import {useParams} from "react-router-dom";

// 진료 결과
function BookingResult() {
  const { id } = useParams();

  const [results, setResults] = useState({
    1: { diagnosis: "감기", prescription: "약 처방", note: "특이사항 없음" },
    2: { diagnosis: "피부병", prescription: "연고 처방", note: "재진 필요" },
    // ... 등등
  });

  return (
    <div>
      <br />
      <h3 style={{ textAlign: "center" }}>ㅇㅇㅇ 고객님 6월 25일 진료결과 알려드립니다</h3>
      {results ? (
        <>
          <div>진단명: {results.diagnosis}</div>
          <div>처방: {results.prescription}</div>
          <div>특이사항: {results.note}</div>
        </>
      ) : (
        <div>아직 진료결과가 등록되지 않았습니다.</div>
      )}
    </div>
  );
}

export default BookingResult;