import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

// 예약내용 상세보기
function BookingDetails() {
    const rno = Number(useParams().rno);
    if (isNaN(rno)) {
        console.error("유효하지 않은 예약번호입니다.");
    }
    const [form, setForm] = useState({name: '', condition: '', remark: ''})

    useEffect( () => {
        const fetch=async ()=>{
            try {
                const response = await axios.get(`http://localhost:8080/hospital/reservation?rno=${rno}`, {withCredentials: true});
                const data = response.data;
                setForm({
                    name: data.nname,
                    condition: data.rcondition,
                    remark: data.remark
                })
                console.log(data);
            } catch (e) {
                alert("데이터를 못 불러왔습니다" + e.message);
            }
        }
       fetch();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '60px auto', padding: '70px', border: '1px solid #e0e0e0', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', background: '#fff' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '14px', fontSize: '2.2rem' }} >예약 내역 상세</h3>
            <div style={{ marginBottom: '12px' }} >
                <span style={{ color: '#555', fontWeight: 'bold', marginRight: '8px', fontSize: '1.1rem' }}>예약 번호: </span>
                <span>{rno}</span>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#555', fontWeight: 'bold', marginRight: '8px', fontSize: '1.1rem' }}>예약자 명: </span>
                <span>{form.name}</span>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#555', fontWeight: 'bold', marginRight: '8px', fontSize: '1.1rem' }}>증상: </span>
                <span>{form.condition}</span>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#555', fontWeight: 'bold', marginRight: '8px', fontSize: '1.1rem' }}>추가사항: </span>
                <span>{form.remark}</span>
            </div>
        </div>
    );
}

export default BookingDetails;