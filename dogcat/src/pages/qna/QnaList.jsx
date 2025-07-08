import React, {useEffect, useRef, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../../stores/useAuthStore';
import {findAllQnaQuestion, findAllQnaQuestionByIsAnswered, findQnaQuestionsByUsername} from '../../utils/qnaApi';
import Paginations from '../../components/commons/Paginations';
import FooterNoticeQna from '../../fragments/noticeQna/FooterNoticeQna';
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna';
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna';
import styles from '../notice/Notice.module.css';

function QnaList() {
    // 필요한것들
    const navigate = useNavigate();
    const { username, role } = useAuthStore();
    const PAGE_SIZE = 10;
    const [params] = useSearchParams();
    const [filter, setFilter] = useState('All');  // 기본 상태는 전체
    let pageno = parseInt(params.get('pageno'));
    if (isNaN(pageno) || pageno < 1)
        pageno = 1;

    const [data, setData] = useState({
        prev: 0,
        start: 1,  // 초기값 0으로 했더니 데이터 없을 때 pageno가 0으로 나와서 수정
        end: 1,  // 초기값 0으로 했더니 데이터 없을 때 pageno가 0으로 나와서 수정
        next: 0,
        pageno:pageno,
        qnaQuestions: []
    })



    const pagination = {
        prev: data.prev,
        start: data.start,
        end: data.end,
        next: data.next,
        pageno:pageno,
        moveUrl: `?pageno=`
    }

    // 데이터 가져오는 상태
    useEffect(() => {
        // 안했으면 이 페이지 접근 못함 ∵PrivateRoute App.js에 걸어둠
        if (username === undefined || role === undefined) return null;
        async function fetchQnas() {
            console.log("2222222222222222222222222222222222")
            try {

                let response;
                if(role === 'ADMIN') {  // 관리자: 질문 전체 목록 + 필터링
                    if (filter === 'All') {
                    response = await findAllQnaQuestion(pageno, PAGE_SIZE);
                    } else if (filter === 'answered') {
                    response = await findAllQnaQuestionByIsAnswered(true, pageno, PAGE_SIZE);
                    } else if (filter === 'notAnswered') {
                    response = await findAllQnaQuestionByIsAnswered(false, pageno, PAGE_SIZE);
                    }
                    setData(response.data);
                } else if (role !== 'ADMIN' && username) {  // 관리자 아닌 유저: 본인이 작성한 질문 목록 + 필터링x
                    response = await findQnaQuestionsByUsername(username, pageno, PAGE_SIZE);
                    setData(response.data);
                }

            } catch (err) {
                console.log('데이터를 불러오지 못했습니다: ', err);
                // alert('데이터를 불러오지 못했습니다.')
            }
        }

        fetchQnas();

    }, [pageno, filter, role, username])
    console.log(data);  // 확인용
    console.log("URL params:", params.toString());
    console.log("Original pageno from URL:", params.get('pageno'));
    console.log("Parsed pageno:", pageno);

    return (
        <div className={styles.ntcQnaWrapper}>
            <HeaderNoticeQna />
            <main>
                <NavNoticeQna activeTab="qna" /> {/* nav css 적용 속성 */}
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
                            {data.qnaQuestions && data.qnaQuestions.length>0? (
                                data.qnaQuestions.map(question => {
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
                                })
                            ) : (
                              <tr>
                                  <td colSpan='5' style={{textAlign:'center'}}> 작성하신 문의글이 존재하지 않습니다. </td>
                              </tr>
                            )}
                            </tbody>
                        </table>
                        {role === 'USER' && username && (
                        <div className='mt-3 mb-5' style={{ textAlign: 'center' }}>
                            <a type='button' className='btn btn-dark' href='/qna/write-question'>작성하기</a>
                        </div>
                        )}
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