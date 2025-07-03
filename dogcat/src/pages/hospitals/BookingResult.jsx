import React, {useState} from 'react';
import axios from "axios";

// 진료 결과
function BookingResult({bookingId, userId}) {
    // 진단명, 처방, 특이사항
    const [form, setForm] = useState({diagnosis: '', prescription: '', note: ''})

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/hospital/treat', {...form, bookingId, userId});
            alert('진료결과가 등록되었습니다.');
            // 입력 폼 초기화 등 추가 동작
        } catch (error) {
            alert('진료결과 등록에 실패했습니다.');
        }
    };
  return (
    <div className="boxStyle">
      <br />
        <h3 style={{ textAlign: "center" }}>{userId} 고객님 진료결과입니다</h3>
        <form onSubmit={handleSubmit}>
            <textarea name="diagnosis" className="inputStyle" value={form.diagnosis} onChange={handleChange}  placeholder="진단명" />
            <textarea name="prescription" className="inputStyle" value={form.prescription} onChange={handleChange} placeholder="처방" />
            <input name="note" className="inputStyle" value={form.note} onChange={handleChange} placeholder="특이사항" />
            <div className="d-grid mb-3 mt-3">
                <button type="submit" className="btn btn-outline-dark btn-block">작성하기</button>
            </div>
        </form>
    </div>
  );
}

export default BookingResult;