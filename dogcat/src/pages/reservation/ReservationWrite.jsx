import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReservationHeader from '../../fragments/reservation/ReservationHeader'
import ReservationFooter from '../../fragments/reservation/ReservationFooter';

// 예약 정보 작성하는 페이지
  // 여기서 진료 선택하면 진료 예약 페이지로
  // 미용 선택하면 미용 예약 페이지로

function ReservationWrite() {
  const navigate = useNavigate();

  // 기본 예약 정보 상태
  const [username, setUsername] = useState('');               // 보호자 이름
  const [petName, setPetName] = useState('');                 // 반려동물 이름
  const [reservationType, setReservationType] = useState(''); // 예약할 종류 선택 medical or beauty
  const [rCondition, setRCondition] = useState('');           // 증상
  const [remark, setRemark] = useState('');                   // 추가 메시지
  const [hUsername, setHUsername] = useState('');             // 병원 이름

  // 페이지 이동 시키는 핸들러 등록
  const handleNext =()=> {
    if(!username || !petName || !reservationType) {
      alert ('보호자 이름, 반려동물 이름, 예약 유형은 필수입니다.');
      return;
    }
    // 작성한 데이터를 진료/미용 예약 페이지로 넘기기
    navigate(`/reservation/${reservationType}`, {
      state: { username, petName, rCondition, remark, hUsername},
    })
  }

  return (
    <>
      <ReservationHeader />
        <div style={{ padding: '20px' }}>
         <label>
            보호자 이름<br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <br /><br />

          <label>
            반려 동물 이름<br />
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />
          </label>

          <br /><br />

          <label>
            예약 유형 선택<br />
            <select
              value={reservationType}
              onChange={(e) => setReservationType(e.target.value)}
            >
              <option value="">-- 선택하세요 --</option>
              <option value="medical">진료</option>
              <option value="beauty">미용</option>
            </select>
          </label>

          <br /><br />

          <label>
            증상<br />
            <textarea
              value={rCondition}
              onChange={(e) => setRCondition(e.target.value)}
              placeholder="간단한 증상을 입력하세요"
            />
          </label>

          <br /><br />

          <label>
            추가 메시지<br />
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="추가로 전달할 내용을 입력하세요"
            />
          </label>

          <br /><br />

          <button onClick={handleNext}>다음 단계 (예약 상세 페이지로 이동)</button>
        </div>
        <ReservationFooter />
    </>
  )
}

export default ReservationWrite