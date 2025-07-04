import React, {useEffect, useState} from 'react';
import axios from "axios";

// 진료결과 읽기 목록(게시판 형태)
function BookingList() {
    const [treat, setTreat] = useState('');

    useEffect(() => {
        axios.get('/hospital/tread-read')
            .then(res =>
            setTreat(res.data))
            .catch(err => alert('진료기록을 찾을 수 없습니다'));
    }, []);

    return (
        <table>
            <thead>
              <tr>
                  <th>예약번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>내용</th>
              </tr>
            </thead>
            <tbody>
            {
                treat.map(treat => (
                    <tr key={treat.tno}>
                        <td>{treat.title}</td>
                        <td>{treat.writer}</td>
                        <td>{treat.content}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default BookingList;