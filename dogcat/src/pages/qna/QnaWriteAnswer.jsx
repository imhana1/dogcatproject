import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import {findQnaQuestionByQnoWithAnswer, writeQnaAnswer} from "../../utils/qnaApi";
import styles from "../notice/Notice.module.css";
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";

function QnaWriteAnswer () {
  // 질문글 불러오기랑 동일
  const {username, role} = useAuthStore();
  const [params] = useSearchParams();
  const qno = parseInt(params.get('qno'));
  const [data, setData] = useState();
  const navigate = useNavigate();

  // 답변 작성
  const [answer, setAnswer] = useState('');
  const changeAnswer = e => setAnswer(e.target.value);

  const writeHandler = async() => {
    if(!answer) {  // 답변 입력 안하고 작성 누른 경우
      alert('답변을 입력하세요.');
      return;
    }
    try {
      const answerData = {qno: qno, username: username, answerContent: answer}
      const result = window.confirm('답변을 작성하시겠습니까?');
      if(result) {
      const response = await writeQnaAnswer(answerData);
      alert('답변 작성이 완료되었습니다.');
      navigate(`/qna/question?qno=${qno}`);
      }
    } catch(err) {
      console.log('답변 작성에 실패하였습니다: ', err);
      alert('공지사항 작성에 실패하였습니다.');
    }
  }

  const cancleHandler = () => {
    const result = window.confirm('작성한 내용은 저장되지 않습니다. \n취소하시겠습니까?');
    if (result)
      navigate(`/qna/question?qno=${qno}`);
  }

  // 위에 출력할 글 가져오기
  useEffect(() => {
    async function findQuestion() {
      try {
        const response = await findQnaQuestionByQnoWithAnswer(qno);
        setData(response.data);
        console.log(data);
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
  }, [qno]);
    return (
      <div className={styles.ntcQnaWrapper}>
        <HeaderNoticeQna />
        <main>
          <NavNoticeQna activeTab="qna" />

          <section>
            <div style={{ padding: '0 20px' }}>
              <h4 className='mb-4 mt-3'>1:1 문의 답변 작성</h4>
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
                </div>
              ) : (
                <span> 로딩중입니다. </span>
              )}
              <hr className='mb-3 mt-3 text-secondary' />
              <div style={{ display: 'flex', alignItems: 'flex-start'}}>
                <label className='mb-3 mt-3 text-secondary' style={{ width: '100px', fontWeight:'bold', display:'block'}}>답변</label>
                <textarea className='mb-3 mt-3' type='text' id='answerContent' placeholder='답변을 작성하세요. ' value={answer} onChange={changeAnswer}
                       style={{ borderWidth: '0', outline: 'none', width: '1050px', display:'block',minHeight:'500px'}} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button className='mb-3 mt-3 btn btn-dark' onClick={()=>writeHandler()}>작성하기</button>
              </div>
            </div>
          </section>
        </main>
        <FooterNoticeQna />
      </div>
    )
}

export default QnaWriteAnswer;