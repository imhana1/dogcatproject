import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
// 날짜
import "react-datepicker/dist/react-datepicker.css";
import './HospitalTime.css';
import axios from "axios";

// 병원 예약 시간 설정
function HospitalTime({ options = ["진료"], option = ["미용"]  }) {
  const [ selectedOption, setSelectedOption ] = useState(options[0]);
  // 초기 값 -> 아무 날짜도 선택되지 않는 상태
  const [dates1, setDates1] = useState([null, null, null, null]); // 진료용
  const [dates2, setDates2] = useState([null, null, null, null]); // 미용용

  const [notice, setNotice] = useState("");

  useEffect(() => {
    axios.get('/notice')
      .then(res => setNotice(res.data.notice))
      .catch(() => setNotice("공지사항이 없습니다"));
  }, []);

  // date는 새로 선택된 날짜, idx는 몇 번째 입력란
  const handleDateChange1 = (date, idx) => {
    const newDates = [...dates1];
    newDates[idx] = date;
    setDates1(newDates);
  }

  const handleDateChange2 = (date, idx) => {
    const newDates = [...dates2];
    newDates[idx] = date;
    setDates2(newDates);
  }

  return (
    <div>
      <nav>
        <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 10, padding: 0, fontSize: "18px" }}>
          <li>
            <Link to="/hospital-mypage" style={{ textDecoration: "none", color: "black" }}>내정보 보기</Link>
          </li>
          <li>
            <Link to="/hospital-time" style={{ textDecoration: "none" , color: "black" }} >병원 예약 시간 설정</Link>
          </li>
          <li>
            <Link to="/booking" style={{ textDecoration: "none" , color: "black" }}>예약내역</Link>
          </li>
          <li>
            <Link to="/notice" style={{ textDecoration: "none", color: "black" }}>공지사항</Link>
          </li>
          <button type="submit" className="btn btn-light">로그아웃</button>
        </ul>
      </nav>
      <div className="notice-bar">
        📢 <strong>[공지] 병원에 관한 안내 : </strong>{notice}
      </div>
      <div className="section" style={{ display: "flex", justifyContent: "center", gap: "50px", marginTop: "38px" }}>
       <div>
        <h2>진료<br/><span style={{ fontSize: 18, color: "#888" }}>treatment</span></h2>
        <select>
          value={selectedOption}
          onChange={e => setSelectedOption(e.target.value)}>{options.map(opt => (<option key={opt}>{opt}</option>))}
        </select>
         <div style={{ marginBottom: 30 }} className="section-input">
           {dates1.map((date, idx) => (<DatePicker key={idx} selected={date} onChange={date => handleDateChange1(date, idx)} placeholderText="날짜" dateFormat="yyyy-MM-dd" />))}
         </div>
        <button className="btn btn-danger">Block</button>
       </div>
       <div>
        <h2>미용<br/><span style={{ fontSize: 18, color: "#888" }}>beauty treatment</span></h2>
        <select>
          value={selectedOption}
          onChange={e => setSelectedOption(e.target.value)}>{option.map(opt => (<option key={opt}>{opt}</option>))}
        </select>
         <div style={{ marginBottom: 30 }} className="section-input">
           {dates2.map((date, idx) => (<DatePicker key={idx} selected={date} onChange={date => handleDateChange2(date, idx)} placeholderText="날짜" dateFormat="yyyy-MM-dd" />))}
         </div>
        <button className="btn btn-danger">Block</button>
       </div>
      </div>
    </div>
  );
}

export default HospitalTime;