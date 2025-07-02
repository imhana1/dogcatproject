import styles from './Notice.module.css';
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna';
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna';
import FooterNoticeQna from '../../fragments/noticeQna/FooterNoticeQna';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { writeNotice } from '../../utils/noticeApi';

function NoticeWrite() {
    const navigate = useNavigate();
    // 글 작성자 id는 서버에서 알아서 넘어가
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isTop, setIsTop] = useState(false);  // 기본값이 false

    // 작성 변화 잡아내기
    const changeTitle = e => setTitle(e.target.value);
    const changeContent = e => setContent(e.target.value);
    const changeIsTop = e => setIsTop(e.target.checked);

    const writeHandler = async () => {  // 서버로 보내니까 비동기
        if (!title || !content) {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }
        try {
            const notice = { nTitle: title, nContent: content, nIsTop: isTop }
            const response = await writeNotice(notice);  // for 공지사항 작성 후 그 글 읽는 페이지로 이동
            const nno = response.data.nno;
            alert('공지사항 작성이 완료되었습니다.');
            navigate(`/notices/notice?nno=${nno}`);
        } catch (err) {
            console.log('공지사항 작성에 실패하였습니다: ', err);
            console.log('에러 응답 데이터:', err.response?.data); // 서버 에러 메시지 확인
            console.log('에러 상태:', err.response?.status);
            alert('공지사항 작성에 실패하였습니다.');
        }
    }

    const cancleHandler = () => {
        const result = window.confirm('작성한 내용은 저장되지 않습니다. \n취소하시겠습니까?');
        if (result)
            navigate('/notices');
    }

    return (
        <div className={styles.ntcQnaWrapper}>
            <HeaderNoticeQna />
            <main>
                <NavNoticeQna activeTab="notice" /> {/* nav css 적용 속성 */}
                <section>
                    <div className={styles.ntcQnaWrapper} style={{ padding: '0 20px' }}>
                        {/* fontsize: h4에 맞춤, borderWidth/outline: input창(outline은 클릭시) 테두리 제거 */}
                        <input className='mb-3 mt-3' type='text' id='ntitle' placeholder='제목' value={title} onChange={changeTitle}
                            style={{ borderWidth: '0', fontSize: '1.33em', fontWeight: 'bold', outline: 'none', width: '1050px' }} />
                        <hr className='mb-3 mt-3 text-secondary' />
                        <textarea className='mb-3 mt-3' type='text' id='ncontent' placeholder='내용을 입력하세요' value={content} onChange={changeContent}
                            style={{ borderWidth: '0', outline: 'none', resize: 'none', width: '1050px', minHeight: '600px' }}></textarea>
                        <div>
                            <label className="form-check-label" htmlFor="isTop">
                                <input className='mb-3 mt-3  me-2' type='checkbox' id='nisTop' checked={isTop} onChange={changeIsTop} />
                                상단으로 고정하기
                            </label>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className='mb-3 mt-3 btn btn-dark me-2' onClick={() => writeHandler()}>등록하기</button>
                            <button className='mb-3 mt-3 btn btn-secondary' onClick={() => cancleHandler()} >취소하기</button>
                        </div>
                    </div>
                </section >
                {/* 현재 디자인 보니까  aside 안쓸것같아서 일단 제외 */}
            </main>
            <FooterNoticeQna />
        </div >
    )
}

export default NoticeWrite