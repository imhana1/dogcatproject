import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReservationHeader from '../../fragments/reservation/ReservationHeader';
import ReservationFooter from '../../fragments/reservation/ReservationFooter';
import StepIndicator from '../../components/reservation/StepIndicator';
import './reservationWrite.css';

function ReservationWrite() {
  const navigate = useNavigate();
  const location = useLocation();

  const { hUsername: initHUsername, hospitalName: initHospitalName } = location.state || {};
  // 상태 정의
  const [petList, setPetList] = useState([]);
  const [selectedPno, setSelectedPno] = useState('');
  const [petName, setPetName] = useState('');
  const [reservationType, setReservationType] = useState('');
  const [rCondition, setRCondition] = useState('');
  const [remark, setRemark] = useState('');
  const [hUsername, setHUsername] = useState(''); // 병원 아이디
  const [hospitalName, setHospitalName] = useState(''); // 병원 이름
  const [username, setUsername] = useState(''); // 보호자 이름

  // 병원 정보 가져오기
  useEffect(() => {
    if (initHUsername) setHUsername(initHUsername);
    if (initHospitalName) setHospitalName(initHospitalName);
  }, [initHUsername, initHospitalName]);

  // 펫 목록 불러오기
  useEffect(() => {
    fetch(`/nuser-pet`) // 로그인 정보에 따라 자신의 펫 목록
      .then(res => res.json())
      .then(data => {
        setPetList(data);
      })
      .catch(err => console.error('펫 목록 불러오기 실패:', err));
  }, []);

  // 다음 단계 이동
  const handleNext = () => {
    if (!username || !selectedPno || !reservationType) {
      alert('보호자 이름, 반려동물 선택, 예약 유형은 필수입니다.');
      return;
    }
    if(!hUsername) {
      alert("병원 정보가 없습니다");
      return;
    }

    navigate(`/reservation/${reservationType}`, {
      state: {
        username,
        petName,         // 단순히 다음 화면에 보여주기 위한 용도
        pno: selectedPno, // 실제 저장용
        rCondition,
        remark,
        hUsername,
        hospitalName
      }
    });
  };

  return (
    <>
      <ReservationHeader />
      <StepIndicator currentStep={1} />

      <div style ={{ marginBottom: '20px', fontWeight:'bold', fontSize:'1.2rem'}}>
        예약 병원: {hospitalName || '병원 정보가 없습니다.'}
      </div>

      <div className='reservation-write'>
        <label className='form-label'>
          보호자 이름<br />
          <input
            className='form-input'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <br /><br />

        <label className='form-label'>
          반려동물 선택 (필수)<br />
          <select
            className='form-select'
            value={selectedPno}
            onChange={(e) => setSelectedPno(e.target.value)}
          >
            <option value=''>-- 선택하세요 --</option>
            {petList.map(pet => (
              <option key={pet.pno} value={pet.pno}>
                {pet.pname} ({pet.ptype})
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <label className='form-label'>
          동물 이름 입력 <br />
          <input
            className='form-input'
            type='text'
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder='예: 두부, 뽀삐 등'
          />
        </label>

        <br /><br />

        <label className='form-label'>
          예약 유형 선택<br />
          <select
            className='form-select'
            value={reservationType}
            onChange={(e) => setReservationType(e.target.value)}
          >
            <option value=''>-- 선택하세요 --</option>
            <option value='medical'>진료</option>
            <option value='beauty'>미용</option>
          </select>
        </label>

        <br /><br />

        <label className='form-label'>
          증상<br />
          <textarea
            className='form-textarea'
            value={rCondition}
            onChange={(e) => setRCondition(e.target.value)}
            placeholder='간단한 증상을 입력하세요'
          />
        </label>

        <br /><br />

        <label className='form-label'>
          추가 메시지<br />
          <textarea
            className='form-textarea'
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder='추가로 전달할 내용을 입력하세요'
          />
        </label>

        <br /><br />

        <button className='btn-submit' onClick={handleNext}>
          다음 단계
        </button>
      </div>

      <ReservationFooter />
    </>
  );
}

export default ReservationWrite;
