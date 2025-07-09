import React, {Component, useEffect, useState} from 'react';
import styles from "../notice/Notice.module.css";
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import useAuthStore from "../../stores/useAuthStore";
import {useNavigate, useSearchParams} from "react-router-dom";
import {findQnaQuestionByQnoWithAnswer} from "../../utils/qnaApi";

function QnaRead() {
  // 가져올거: qno(+searchparam), navigate, data 계정정보
  const {username, role} = useAuthStore();
  const [params] = useSearchParams();
  const qno = parseInt(params.get('qno'));
  const [data, setData] = useState();
  const navigate = useNavigate();

  // 글 가져오기
  useEffect(() => {
    if (role === undefined || username === undefined) return;
    async function findQuestion() {
      try {
        const response = await findQnaQuestionByQnoWithAnswer(qno);
        setData(response.data);
      /*   * map을 쓰면 데이터가 QUESTION_USERNAME 이렇게 넘어와 */
      } catch(err) {
        console.log('질문 글 불러오기 실패: ', err);
      }
    }
    if(!isNaN(qno)) {  // 주소에 qno 있으면 글 가져오기
      findQuestion()
    } else {
      alert('잘못된 주소입니다.');
      navigate('/qna');
    }
  }, [qno, role, username]);

  // 1:1 문의는 삭제x

  console.log(data);
    return (
      <div className={styles.ntcQnaWrapper}>
        <HeaderNoticeQna />
        <main>
          <NavNoticeQna activeTab="qna" />

          <section>
                <div style={{ padding: '0 20px' }}>
                  <h4 className='mb-4 mt-3'>1:1 문의 조회</h4>
                {/* alignItems 반드시 써줘야해 */}
                  {data? (
                  <div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <label className='text-secondary' style={{ width: '100px', fontWeight:'bold' }}>제목</label>
                    <p className='mb-3 mt-3' >{data.Q_TITLE}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <label className='text-secondary' style={{ width: '100px',fontWeight:'bold' }}>내용</label>
                    <p className='mb-3 mt-3'>{data.Q_CONTENT}</p>
                  </div>
                  {data.Q_IMAGE? (
                  <div style={{ display: 'flex', alignItems: 'flex-start'}}>
                    <label className=' mb-3 mt-3 text-secondary' style={{ width: '100px', display:'block', fontWeight:'bold'}}>사진</label>
                    <img src={data.Q_IMAGE} alt='첨부된 사진' className='mb-3 mt-3' />
                  </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                      <label className='text-secondary' style={{ width: '100px', fontWeight:'bold'}}>사진</label>
                      <p className='mb-3 mt-3 text-secondary'>사진이 첨부되지 않았습니다.</p>
                    </div>
                  )
                  }
                    <hr className='mb-3 mt-3 text-secondary' />
                    <div style={{ display: 'flex', alignItems: 'flex-start'}}>
                      <label className='mb-3 mt-3 text-secondary' style={{ width: '100px', display:'block', fontWeight:'bold' }}>답변</label>
                      {data.Q_IS_ANSWERED===1? (
                        <p className='mb-3 mt-3' style={{minHeight:'400px', width:'1050px'}}>{data.ANSWER_CONTENT}</p>
                      ) : (
                        <p className='mb-3 mt-3 text-secondary'>답변이 작성되지 않았습니다.</p>
                      )}

                    </div>
                  </div>
                    ) : (
                      <span> 로딩중입니다. </span>
                    )}
                  {/* data 로딩 안되었을 때 바로 q is answered 파악하려해서 오류나는거 막으려고 data && 추가 */}
                  {(data && (role === 'ADMIN' && username) && data.Q_IS_ANSWERED===0)?  (
                    <div className='mt-3 mb-5' style={{ textAlign: 'center' }}>
                      <a type='button' className='btn btn-dark me-2' onClick={() => navigate(`/qna/write-answer?qno=${qno}`)}>답변하기</a>
                      <a type='button' className='btn btn-secondary' href='/qna'>목록으로</a>
                    </div>
                  ) : (
                    <div className='mt-3 mb-5' style={{ textAlign: 'center' }}>
                    <a type='button' className='btn btn-secondary' href='/qna'>목록으로</a>
                    </div>
                  )}
                </div>
          </section>
        </main>
        <FooterNoticeQna />
      </div>
    );
  }

export default QnaRead;