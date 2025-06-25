import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigate} from "react-router-dom";

// 예약페이지
function HospitalReservation() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(""); // 예약 종류
  const [selectedDate, setSelectedDate] = useState(null); // 예약 날짜
  const [selectedTime, setSelectedTime] = useState(''); // 예약시간
  const [name, setName] = useState(''); // 예약자 이름
  const [phone, setPhone] = useState(''); // 예약자 전화번호
  const [content, setContent] = useState(''); // 예약 내용

  const timeSlots = {
    진료: [
      "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
    ],
    미용: [
      "09:00", "12:00", "15:00", "18:00"
    ]
  };

  // 예약 종류에 따라 시간 옵션 제공
  const getTimes = () => {
    if (selectedType === "진료") return timeSlots.진료;
    if (selectedType === "미용") return timeSlots.미용;
    return [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType || !selectedDate || !selectedTime || !name || !phone) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }
    alert(
      `예약 완료!\n\n종류: ${selectedType}\n날짜: ${selectedDate.toLocaleDateString()}\n시간: ${selectedTime}\n예약자명: ${name}`
    );
    // 초기화
    setSelectedType('');
    setSelectedDate(null);
    setSelectedTime('');
    setName('');
    setPhone('');
    setContent('');
    // 예약신청 하면 메인 페이지로 이동
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20, background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>병원 예약하기</h2>
      <form onSubmit={handleSubmit}>
        {/* 예약 종류 선택 */}
        <label>예약 종류<span style={{color:"red"}}>*</span></label>

        {/* 종류 바뀌면 시간 초기화 */}
        <select value={selectedType} onChange={e => {setSelectedType(e.target.value);setSelectedTime("") }} required style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 16 }}>
          <option value="">-- 선택하세요 --</option>
          <option value="진료">진료</option>
          <option value="미용">미용</option>
        </select>

        {/* 예약 날짜 선택 */}
        <label>예약 날짜<span style={{color:"red"}}>*</span></label>
        {/* 오늘 날짜라면, 이미 지난 시간대는 제외 */}
        {/* minDate={new Date()} 오늘 이전의 시간을 막는거 */}
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="yyyy-MM-dd" minDate={new Date()} placeholderText="날짜 선택" required style={{ width: "100%" }} className="form-control" />

        {/* 예약 시간 선택 */}
        <label style={{ marginTop: 16 }}></label>
        <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} required disabled={!selectedType} style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 16 }}>
          <option value="">시간 선택</option>
          {getTimes().map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        {/* 예약자명 */}
        <label style={{ marginTop: 16 }}>예약자명<span style={{color:"red"}}>*</span></label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 16 }} />

        {/* 연락처 */}
        <label style={{ marginTop: 16 }}>연락처<span style={{color:"red"}}>*</span></label>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="010-1234-5678" style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 16 }} />

        {/* 예약 내용 */}
        <label style={{ marginTop: 16 }}>예약 내용</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="증상이나 요청사항을 적어주세요." style={{ width: "100%", padding: 8, marginTop: 4, minHeight: 80, marginBottom: 24 }} />
        <button type="submit" style={{marginTop: 12, width: "100%", padding: 12, backgroundColor: "#ff5f2e", color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>예약 신청</button>
      </form>
    </div>
  );
}

export default HospitalReservation;
