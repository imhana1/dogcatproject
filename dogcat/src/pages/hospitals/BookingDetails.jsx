import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

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
        <div>
            <h2>예약 내역 상세</h2>
            <hr/>
            <strong>예약 번호: {rno} </strong>
            <br/>
            <strong>예약자 명:{form.name} </strong>
            <br/>
            <p>증상: {form.condition}</p>
            <br/>
            <p>증상: {form.remark}</p>
        </div>
    );
}

export default BookingDetails;