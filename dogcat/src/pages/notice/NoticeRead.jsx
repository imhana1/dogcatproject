import styles from './Notice.module.css';
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna';
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna';
import FooterNoticeQna from '../../fragments/noticeQna/FooterNoticeQna';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteNotice, findNoticeByNno } from '../../utils/noticeApi';
import useAuthStore from '../../stores/useAuthStore';

function NoticeRead() {
    const { username, role } = useAuthStore();
    const [params] = useSearchParams();
    const nno = parseInt(params.get('nno'));  // 꺼내서 숫자로 변환
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        async function findNotice() {
            try {
                const resposne = await findNoticeByNno(nno);
                setData(resposne.data);
            } catch (err) {
                console.log('공지사항 글 불러오기 실패: ', err);
            }
        }
        if (!isNaN(nno)) {
            findNotice();
        } else {
            alert('잘못된 주소입니다.');
            navigate('/notices');
        }
    }, [nno]); // 글 읽기는 새로 고칠 필요x인데 누가 주소창에서 글 번호 냅다 바꾸면..

    const deleteHandler = async (nno) => {  // 삭제에 시간 걸릴 수 있으니까 비동기
        const deleteAlert = window.confirm('이 공지사항을 삭제하시겠습니까?');
        if (!deleteAlert)
            return;  // 아니요 누르면 리턴
        try {
            await deleteNotice(nno);
            alert('공지사항 삭제를 완료하였습니다.');
            navigate('/notices');
        } catch (err) {
            console.log('공지사항 삭제에 실패했습니다: ', err);
            alert('공지사항 삭제에 실패하였습니다.')
        }

    };

    console.log(nno);
    console.log(data);
    return (
        <div className={styles.ntcQnaWrapper}>
            <HeaderNoticeQna />
            <main>
                <NavNoticeQna activeTab="notice" /> {/* nav css 적용 속성 */}
                <section>
                    {data ? (
                        <div style={{ padding: '0 20px', minHeight: '600px' }}>
                            <h4 className='mb-3 mt-3'>{data.ntitle}</h4>
                            <p className='mb-3 mt-3 text-secondary' style={{ fontSize: '0.9em' }}>관리자({data.username}) | {data.nwriteDay.substring(0, 10)}</p>
                            <hr className='text-secondary' />
                            <p className='mb-3 mt-3'>{data.ncontent}</p>
                        </div>
                    ) : (
                        <p>로딩중입니다. </p>
                    )}
                    <div style={{ textAlign: 'center' }}>
                        {role === 'ROLE_ADMIN' ? (
                            <div>
                                <a type='button' className='btn btn-dark me-2' onClick={() => navigate(`/notices/update?nno=${nno}`)}>수정하기</a>
                                <a type='button' className='btn btn-danger me-2' onClick={() => deleteHandler(nno)}>삭제하기</a>
                                <a type='button' className='btn btn-secondary' href='/notices'>목록으로</a>
                            </div>
                        ) : (
                            <a type='button' className='btn btn-secondary' href='/notices'>목록으로</a>
                        )}
                    </div>
                </section >
                {/* 현재 디자인 보니까  aside 안쓸것같아서 일단 제외 */}
            </main>
            <FooterNoticeQna />
        </div >
    )
}

export default NoticeRead