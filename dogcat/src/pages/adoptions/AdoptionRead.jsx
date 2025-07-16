import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import {addOrRemoveWish, checkIsWished, deleteAdoptionByAno, findAdoptionByAno} from "../../utils/adoptionApi";
import {deleteNotice} from "../../utils/noticeApi";
import styles from "../notice/Notice.module.css";
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import heartFilled from './heart-filled.png';
import heartOutline from './heart-outline.png';

function AdoptionRead() {
  const navigate = useNavigate();
  const {username, role} = useAuthStore();
  const [params] = useSearchParams();
  const ano = parseInt(params.get('ano'));
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [isWished, setIsWished] = useState();

  // 데이터 가져오기
  useEffect(() => {
    async function fetchAdoption() {
      setLoading(true);
      try {
        // 글 가져오기
        const response = await findAdoptionByAno(ano);
        setData(response.data);
        // 찜 여부 가져오기
        const wishRes = await checkIsWished(ano);
        setIsWished(wishRes.data);
        setLoading(false);
      } catch (err) {
        console.log('글을 불러오지 못했습니다: ', err);
      }
    }

    if (!isNaN(ano)) {
      fetchAdoption();
    } else {
      alert('잘못된 주소입니다.');
      navigate('/adoptions');
    }

  }, [ano, isWished]);

  // 삭제하기 (접속중인 아이디와 작성자 아이디 비교는 백 서비스에 있어)
  const deleteHandler = async (ano) => {
    console.log("삭제 요청하는 ano:", ano);
    const deleteAlert = window.confirm('이 글을 삭제하시겠습니까?');
    if (!deleteAlert)
      return;  // 아니요 누르면 리턴
    try {
      await deleteAdoptionByAno(ano);
      alert('글 삭제를 완료하였습니다.');
      navigate('/adoptions');
    } catch (err) {
      console.log('글 삭제에 실패했습니다: ', err);
      alert('글 삭제에 실패하였습니다.')
    }
  }

  // 찜하기
  const wishHandler = async (ano) => {
    try {
      await addOrRemoveWish(ano);
      setIsWished(prev => !prev);  //이전 상태에서 뒤집기
    } catch (err) {
      console.log('관심 등록 및 삭제에 실패하였습니다: ', err);
    }
  }

  console.log('글 데이터: ', data);   // 글 제대로 왔는지 확인
  console.log('찜 여부: ', isWished);  // 찜 여부 제대로 왔는지 확인
  return (
    <div className={styles.ntcQnaWrapper}>
      <HeaderNoticeQna/>
      <main>
        <NavNoticeQna activeTab='adoption'/>
        <section>
          <div style={{padding: '0 20px'}}>
            <h4 className='mb-4 mt-3'>입양 글 상세보기</h4>
            {/* div 1 - div1-1: 사진
                    div1-2: table(정보)
          div 2 - 소개글
        */}
            {data && (
              <div>
                <div style={{display: 'flex', gap: '50px', alignItems: 'flex-start'}}> {/* 여기가 div1 */}
                  {/* 여기가 div 1-1 사진영역 */}
                  <div style={{
                    width: '370px',
                    height: '370px',
                    background: '#bbb',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}> {/* 여기 overflow:hidden 넣어서 모서리 잘라도 사진 넘치지 않게 해줌 */}
                    <img alt='입양 글 동물 사진' src={data.aprofile}
                         style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                  </div>
                  {/* 여기가 div1-2 정보영역 */}
                  <div>
                    <table style={{heigh: '370px'}}>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>이름</td>
                        <td style={{padding: '0 20px'}}>{data.aname}</td>
                      </tr>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>연령</td>
                        <td style={{padding: '0 20px'}}>{data.aage}</td>
                      </tr>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>세부 종류</td>
                        <td style={{padding: '0 20px'}}>{data.abreed}</td>
                      </tr>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>성별</td>
                        <td style={{padding: '0 20px'}}>{data.agender}</td>
                        {/* 성별도 json어노테이션 달아서 프론트에서는 한글로 출력되게 했어 */}
                      </tr>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>발견 장소</td>
                        <td style={{padding: '0 20px'}}>{data.afoundLocation}</td>
                      </tr>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>현재 위치</td>
                        <td style={{padding: '0 20px'}}>{data.acity}</td>
                      </tr>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>상세 위치</td>
                        <td style={{padding: '0 20px'}}>{data.alocation}</td>
                      </tr>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>입양여부</td>
                        <td style={{padding: '0 20px'}}>{data.aisAdopted === true ? '입양완료' : '입양 미완료'}</td>
                      </tr>
                      <tr style={{height: '40px'}}>
                        <td style={{fontWeight: 'bold', width: '100px', borderRight: '1px solid #bbb'}}>글 작성자</td>
                        <td style={{padding: '0 20px'}}>{data.username}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <hr className='mb-4 mt-4 text-secondary'/>
                <div style={{padding: '0 10px', minHeight: '250px'}}>  {/* 여기가 div2 소개글영역 */}
                  {data.acontent}
                </div>
                {/* 로그인한 회원이면 찜 출력 */}
                {/* 작성한 본인이면 수정, 삭제, 목록 출력 본인 아니면 목록으로만 출력 */}
                {!username ? (  // 로그인 안했을 때
                  <div style={{textAlign: 'center'}}>
                    <button className='btn btn-secondary' onClick={() => navigate('/adoptions')}>목록으로</button>
                  </div>
                ) : username === data.username ? (  // 로그인 했고 작성자일떄
                  // 수정, 삭제, 목록으로 버튼 출력
                  <div style={{textAlign: 'center'}}>
                    <img className='me-2' alt='찜버튼 이미지' src={isWished === true ? heartFilled : heartOutline} style={{cursor:'pointer'}} onClick={()=>wishHandler(ano)}/>
                    <button className='btn btn-dark me-2'
                            onClick={() => navigate(`/adoptions/update?ano=${ano}`)}>수정하기
                    </button>
                    <button className='btn btn-danger me-2' onClick={() => deleteHandler(ano)}>삭제하기</button>
                    <button className='btn btn-secondary me-2' onClick={() => navigate('/adoptions')}>목록으로</button>
                  </div>
                ) : username !== data.username ? (
                  <div style={{textAlign: 'center', height:'36px'}}>
                    <img className='me-2' alt='찜버튼 이미지' src={isWished === true ? heartFilled : heartOutline} style={{cursor:'pointer'}} onClick={()=>wishHandler(ano)}/>
                    <button className='btn btn-secondary me-2' onClick={() => navigate('/adoptions')}>목록으로</button>
                  </div>
                ) : ''
                }

              </div>
            )}

          </div>
        </section>
      </main>
      <FooterNoticeQna/>
    </div>
  );
}

export default AdoptionRead;