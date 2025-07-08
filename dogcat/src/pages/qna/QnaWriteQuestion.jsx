import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import {writeQnaQuestion} from "../../utils/qnaApi";
import styles from "../notice/Notice.module.css";
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";

function QnaWriteQuestion () {
  // 가져올거
  const navigate = useNavigate();
  const {username, role} = useAuthStore();  // 굳이?
  // 작성자 id는 서버에서 알아서 넘어가
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const changeTitle = e => setTitle(e.target.value);
  const changeContent = e => setContent(e.target.value);
  const changeImgFile = e => {
    const file = e.target.files[0];
    setImgFile(file || null);  // file 존재하면 파일 객체만 저장 (base64 변환 아직x)
    }

  // 작성
  const writeHandler = async() => {
    if(!title || !content) {
      alert('제목과 내용을 모두 입력하세요.');
      return;
    }
    // 제대로 작성했으면 try-catch
    try {
      // dto 작성 (username은 차피 서버에서 principal로 넘겨서 안적어도 무방)
      const writeDto = {qtitle:title, username:username, qcontent:content};
      // form data 작성
      const formData = new FormData();
      // writeDto를 JSON Blob으로 변환하여 추가 (Content-Type 지정)
      const writeDtoBlob = new Blob([JSON.stringify(writeDto)], {
        type: 'application/json'
      });
      formData.append('writeDto', writeDtoBlob);
      // 이미지는 있으면 추가
      if(imgFile) {
        formData.append("qImage", imgFile);
      }

      // writeQnaQueston 사용
      const response = await writeQnaQuestion(formData);
      const qno = response.data.qno;
      alert('문의사항 작성이 완료되었습니다.');
      navigate(`/qna/question?qno=${qno}`)
    } catch (err) {
      console.log('문의글 작성에 실패하였습니다: ', err);
      console.log('에러 상태:', err.response.status);
      console.log('에러 데이터:', err.response.data);
      console.log('에러 헤더:', err.response.headers);
      alert('문의글 작성에 실패하였습니다.')
    }
  }

  // 취소
  const cancelHandler = ()=> {
    const result = window.confirm('작성한 내용은 저장되지 않습니다. \n취소하시겠습니까?');
    if(result)
      navigate('/qna')
  }


    return (
      <div className={styles.ntcQnaWrapper}>
        <HeaderNoticeQna />
        <main>
          <NavNoticeQna activeTab='qna' />
          <section>
            <div style={{padding:'0 20px'}}>
              <h4 className='mb-4 mt-3'>1:1 문의 작성</h4>
              {/* qtitle, username, qcontent, qImage로 작성 */}
              <div className='mb-3 mt-3 ' style={{ display: 'flex', alignItems: 'center'}}>
                <label className='text-secondary ' style={{ width: '100px', fontWeight:'bold' }}>제목</label>
                <input className='form-control' type='text' id='qtitle' placeholder='제목을 입력하세요. ' value={title} onChange={changeTitle}
                  style={{borderWidth: '0', outline: 'none', width: '1050px'}}/>
              </div>
              <div  className='mb-3 mt-3 ' style={{ display: 'flex', alignItems: 'center'}}>
                <label className='text-secondary' style={{ width: '100px', fontWeight:'bold' }}>사진</label>
                <input className='form-control' type='file' id='qImage' onChange={changeImgFile} />
              </div>
              <div className='mb-3 mt-3 ' style={{ display: 'flex', alignItems: 'flex-start'}}>
                <label className=' text-secondary' style={{ width: '100px', fontWeight:'bold', marginTop:'7px' }}>내용</label>
                <textarea className='form-control' rows='10' id='qContent' placeholder='제목을 입력하세요. ' value={content} onChange={changeContent}
                       style={{borderWidth: '0', outline: 'none', width: '1050px'}}/>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button className='mb-3 mt-3 btn btn-dark me-2' onClick={() => writeHandler()}>등록하기</button>
                <button className='mb-3 mt-3 btn btn-secondary' onClick={() => cancelHandler()} >취소하기</button>
              </div>
            </div>
          </section>
        </main>
        <FooterNoticeQna />
      </div>
    );
  }

export default QnaWriteQuestion;