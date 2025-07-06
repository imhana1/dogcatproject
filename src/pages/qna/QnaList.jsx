import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../../stores/useAuthStore';
import { findAllQnaQuestion, findAllQnaQuestionByIsAnswered } from '../../utils/qnaApi';
import Paginations from '../../components/commons/Paginations';
import FooterNoticeQna from '../../fragments/noticeQna/FooterNoticeQna';
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna';
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna';
import styles from '../notice/Notice.module.css';

function QnaList() {
    // 필요한것들
    const navigate = useNavigate();
    const PAGE_SIZE = 10;
    const [params] = useSearchParams();
    const [filter, setFilter] = useState('All');  // 기본 상태는 전체
    let pageno = parseInt(params.get('pageno'));
    if (isNaN(pageno) || pageno < 1)
        pageno = 1;

    const [data, setData] = useState({
        prev: 0,
        start: 0,
        end: 0,
        next: 0,
        qnaQuestions: []
    })

    const { username, role } = useAuthStore();

    const pagination = {
        prev: data.prev,
        start: data.start,
        end: data.end,
        enxt: data.next,
        pageno,
        moveUrl: `?pageno=`
    }

    useEffect(() => {
        async function fetchQnas() {
            try {
                let response;
                if (filter === 'All') {
                    response = await findAllQnaQuestion(pageno, PAGE_SIZE);
                } else if (filter === 'answered') {
                    response = await findAllQnaQuestionByIsAnswered(true, pageno, PAGE_SIZE);
                } else if (filter === 'notAnswered') {
                    response = await findAllQnaQuestionByIsAnswered(false, pageno, PAGE_SIZE);
                }
                setData(response.data);

            } catch (err) {
                console.log('데이터를 불러오지 못했습니다: ', err);
                alert('데이터를 불러오지 못했습니다.')
            }
        }
        fetchQnas();
    }, [pageno, filter])
    console.log(data);  // 확인용
    return (
        <div className={styles.ntcQnaWrapper}>
            <HeaderNoticeQna />
            <main>
                <NavNoticeQna activeTab="notice" /> {/* nav css 적용 속성 */}
                <section>
                    <div style={{ padding: '0 20px' }}>
                        <h4 className='mb-4 mt-3'>1:1 문의</h4>
                        <table className='mb-3 mt-3 table table-hover noticeList' style={{ margin: '20px 0' }}>
                            <thead className='mb-3 mt-3 table-secondary'>
                                <tr style={{ textAlign: 'center' }}>
                                    <th style={{ width: '100px' }}>no</th>
                                    <th>질문 글 제목</th>
                                    <th style={{ width: '250px' }}>작성자</th>
                                    <th style={{ width: '250px' }}>작성일</th>
                                    <th style={{ width: '250px' }}>답변 상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.qnaQuestions.map(question => {
                                    console.log('개별 question:', question);
                                    return (
                                        <tr key={question.qno}>
                                            <td style={{ textAlign: 'center' }}>
                                                {question.qno}
                                            </td>
                                            <td>
                                                <a style={{ textDecoration: 'none', color: 'black' }} href={`/qna/question?qno=${question.qno}`}>{question.qtitle}</a>
                                            </td>
                                            {/* 날짜부분만 잘라냄 */}
                                            <td style={{ textAlign: 'center' }}>{question.username}</td>
                                            <td style={{ textAlign: 'center' }}>{question.qwriteDay.substring(0, 10)}</td>
                                            {question.qisAnswered === true ?
                                                <td style={{ textAlign: 'center' }}>답변완료 </td>
                                                :
                                                <td style={{ textAlign: 'center', color: 'red' }}>답변 미완료 </td>
                                            }
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Paginations pagination={pagination} />
                    </div>
                </section >
                {/* 현재 디자인 보니까  aside 안쓸것같아서 일단 제외 */}
            </main>
            <FooterNoticeQna />
        </div >
    )
}

export default QnaList