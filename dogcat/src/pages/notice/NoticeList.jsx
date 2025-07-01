import React, { useEffect, useState } from 'react'
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna'
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna'
import AsideNoticeQna from '../../fragments/noticeQna/AsideNoticeQna'
import FooterNoticeQna from '../../fragments/noticeQna/FooterNoticeQna'
import styles from './Notice.module.css';
import { findAll } from '../../utils/noticeApi'

function NoticeList() {
    // 필요한것들  ** pagenation은 컴포넌트로 만들거야
    const PAGE_SIZE = 10;
    const [pageno, setPageno] = useState(1);  // pageno
    const [data, setData] = useState({  // pageno를 제외한 나머지 서버 데이터들
        notices: [],
        prev: 0,
        start: 0,
        end: 0,
        next: 0
    });

    // 컴포넌트 로딩되면 불러와
    useEffect(() => {
        async function fetchNotices() {
            try {
                const resposne = await findAll(pageno, PAGE_SIZE);
                const { notices, prev, start, end, next } = resposne.data;  // 받아온거 헤쳐
                setData({ notices, prev, start, end, next })
            } catch (err) {
                console.log('공지사항 목록 가져오기 실패: ', err);
            }
        }

        fetchNotices();  // 만들었으면 실행
    }, [pageno]);  // pageno 바뀌면 재실행

    return (
        <div className={styles.ntcQnaWrapper}>
            <HeaderNoticeQna />
            <main>
                <NavNoticeQna activeTab="notice" /> {/* nav css 적용 속성 */}
                <section>
                    <h4>공지사항</h4>
                    <table className='table table-hover noticeList' style={{ margin: '20px 0' }}>
                        <thead className='table-secondary'>
                            <tr>
                                <th>글 번호</th>
                                <th>글 제목</th>
                                <th>글 작성일</th>
                            </tr>
                        </thead>
                    </table>
                </section >
                {/* 현재 디자인 보니까  aside 안쓸것같아서 일단 제외 */}
            </main>
            <FooterNoticeQna />
        </div>
    )
}

export default NoticeList