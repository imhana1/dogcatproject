import React, { useEffect, useState } from 'react'
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna'
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna'
import AsideNoticeQna from '../../fragments/noticeQna/AsideNoticeQna'
import FooterNoticeQna from '../../fragments/noticeQna/FooterNoticeQna'
import styles from './Notice.module.css';
import { findAll } from '../../utils/noticeApi'
import Paginations from '../../components/commons/Paginations'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../../stores/useAuthStore'

function NoticeList() {
    const navigate = useNavigate();
    // 필요한것들  ** pagenation은 컴포넌트로 만들거야
    const PAGE_SIZE = 10;
    // 버튼 눌러서 pageno 바뀌었을 때 테이블 바로바로 바뀌게 하려면 이렇게
    const [params] = useSearchParams();  // 주소창에서 가져오기
    let pageno = parseInt(params.get('pageno'));  // 문자열 변환
    if (isNaN(pageno) || pageno < 1)
        pageno = 1;
    const [data, setData] = useState({  // pageno를 제외한 나머지 서버 데이터들
        topNotices: [],
        normalNotices: [],
        prev: 0,
        start: 0,
        end: 0,
        next: 0
    });
    const { username, role } = useAuthStore();

    const pagination = {
        prev: data.prev,
        start: data.start,
        end: data.end,
        next: data.next,
        pageno
    };

    // 컴포넌트 로딩되면 불러와
    useEffect(() => {
        async function fetchNotices() {
            try {
                const resposne = await findAll(pageno, PAGE_SIZE);
                const { topNotices, normalNotices, prev, start, end, next } = resposne.data;  // 받아온거 헤쳐
                setData({ topNotices, normalNotices, prev, start, end, next })
            } catch (err) {
                console.log('공지사항 목록 가져오기 실패: ', err);
            }
        }

        fetchNotices();  // 만들었으면 실행
    }, [pageno]);  // pageno 바뀌면 재실행
    console.log(username, role);
    return (
        <div className={styles.ntcQnaWrapper}>
            <HeaderNoticeQna />
            <main>
                <NavNoticeQna activeTab="notice" /> {/* nav css 적용 속성 */}
                <section>
                    <div style={{ padding: '0 20px' }}>
                        <h4 className='mb-4 mt-3'>공지사항</h4>
                        <table className='mb-3 mt-3 table table-hover noticeList' style={{ margin: '20px 0' }}>
                            <thead className='mb-3 mt-3 table-secondary'>
                                <tr style={{ textAlign: 'center' }}>
                                    <th style={{ width: '100px' }}>no</th>
                                    <th>공지사항 제목</th>
                                    <th style={{ width: '250px' }}>작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.topNotices.map(notice => {
                                    console.log('개별 notice:', notice);
                                    return (
                                        <tr key={notice.nno}>
                                            <td style={{ textAlign: 'center' }}>
                                                <span style={{ color: '#FFD208' }}>☆</span>
                                            </td>
                                            <td>
                                                <a style={{ textDecoration: 'none', color: 'black' }} href={`/notices/notice?nno=${notice.nno}`}>{notice.ntitle}</a>
                                            </td>
                                            {/* 날짜부분만 잘라냄 */}
                                            <td style={{ textAlign: 'center' }}>{notice.nwriteDay.substring(0, 10)}</td>
                                        </tr>
                                    )
                                })}
                                {data.normalNotices.map(notice => {
                                    console.log('개별 notice:', notice);
                                    return (
                                        <tr key={notice.nno}>
                                            <td style={{ textAlign: 'center' }}>
                                                {notice.nno}
                                            </td>
                                            <td>
                                                <a style={{ textDecoration: 'none', color: 'black' }} href={`/notices/notice?nno=${notice.nno}`}>{notice.ntitle}</a>
                                            </td>
                                            {/* 날짜부분만 잘라냄 */}
                                            <td style={{ textAlign: 'center' }}>{notice.nwriteDay.substring(0, 10)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {role === 'ADMIN' && username && (
                            <div className='mt-3 mb-5' style={{ textAlign: 'center' }}>
                                <a type='button' className='btn btn-dark' onClick={() => navigate('/notices/write')}>작성하기</a>
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

export default NoticeList