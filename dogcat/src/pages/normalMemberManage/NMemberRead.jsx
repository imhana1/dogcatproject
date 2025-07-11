import React, {Component, useEffect, useState} from 'react';
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import styles from "../notice/Notice.module.css";
import useAuthStore from "../../stores/useAuthStore";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
  findNormalMemberByUsername,
  nBlockOff,
  nBlockOn,
  nDecWarningCount,
  nIncWarningCount
} from "../../utils/nMemberManageApi";

function NMemberRead () {
  // 필요한거
  const {username, role} = useAuthStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const nUsername = params.get('username');
  const [data, setData] = useState();

  // 유저 데이터 가져오기
  async function fetchNMember() {
    try {
      const response = await findNormalMemberByUsername(nUsername);
      setData(response.data);
    } catch(err) {
      console.log('유저 데이터를 가져오지 못했습니다: ', err);
    }
  }

  // 데이터 관리
  useEffect(() => {
    if(nUsername) {  // 주소창에 파라미터 있으면 실행해
      fetchNMember();
    } else {
      alert('잘못된 주소입니다. ');
      navigate('/n-member');
    }
  }, [nUsername]);

  // 경고 횟수 증가
  const incWarning = async () => {
    const response = window.confirm('경고 횟수를 1회 증가하시겠습니까?');
    if (response) {
      try {
        await nIncWarningCount(nUsername);
        alert('경고 횟수를 1회 증가하였습니다.');
        await fetchNMember();
      } catch(err) {
        console.log('경고 횟수 증가에 실패하였습니다: ', err);
      }
    }
  }

  // 경고 횟수 감소
  const decWarning = async () => {
    const response = window.confirm('경고 횟수를 1회 감소하시겠습니까?');
    if (response) {
      try {
        await nDecWarningCount(nUsername);
        alert('경고 횟수를 1회 감소하였습니다.');
        await fetchNMember();
      } catch(err) {
        console.log('경고 횟수 감소에 실패하였습니다: ', err);
      }
    }
  }

  // 차단
  const BlockOn = async () => {
    const response = window.confirm('차단하시겠습니까?');
    if (response) {
      try {
        await nBlockOn(nUsername);
        alert('차단하였습니다. ');
        await fetchNMember();
      } catch(err) {
        console.log('차단에 실패하였습니다: ', err);
      }
    }
  }

  // 차단 해제
  const BlockOff = async () => {
    const response = window.confirm('차단을 해제하시겠습니까?');
    if (response) {
      try {
        await nBlockOff(nUsername);
        alert('차단을 해제하였습니다. ');
        await fetchNMember();
      } catch(err) {
        console.log('차단 해제에 실패하였습니다: ', err);
      }
    }
  }

  console.log(data);
  return (
    <div className={styles.ntcQnaWrapper}>
      <HeaderNoticeQna title='회원 관리' />
      <main>
        <NavNoticeQna activeTab = 'nMemberManage' />
        <section>
          <div  style={{ padding: '0 20px' }}>
            <h4 className='mb-4 mt-3'>일반 회원 정보 조회 및 변경</h4>
            {data? (
            <table style={{margin:'30px 20px'}}>
              <tbody>
              <tr style={{height:'40px'}}>
                <td style={{fontWeight:'bold', width:'100px', borderRight:'1px solid #bbb'}}>ID</td>
                <td style={{padding:'0 20px'}}>{data.username}</td>
              </tr>
              <tr style={{height:'40px'}}>
                <td style={{fontWeight:'bold', width:'100px', borderRight:'1px solid #bbb'}}>이름</td>
                <td style={{padding:'0 20px'}}>{data.nname}</td>
              </tr>
              <tr style={{height:'40px'}}>
                <td style={{fontWeight:'bold', width:'100px', borderRight:'1px solid #bbb'}}>연락처</td>
                <td style={{padding:'0 20px'}}>{data.ntel}</td>
              </tr>
              <tr style={{height:'40px'}}>
                <td style={{fontWeight:'bold', width:'100px', borderRight:'1px solid #bbb'}}>이메일</td>
                <td style={{padding:'0 20px'}}>{data.email}</td>
              </tr>
              <tr style={{height:'40px'}}>
                <td style={{fontWeight:'bold', width:'100px', borderRight:'1px solid #bbb'}}>가입일</td>
                <td style={{padding:'0 20px'}}>{data.signDt.substring(0, 10)}</td>
              </tr>
              <tr style={{height:'40px'}}>
                <td style={{fontWeight:'bold', width:'100px', borderRight:'1px solid #bbb'}}>회원 상태</td>
                <td style={{padding:'0 20px'}}>
                  {data.status}
                  {data.count===3? (
                    ' (경고 횟수가 3회일 경우 차단 해제가 불가능합니다.) '
                  ) : (
                    data.status!=='차단'? (
                        <button className='btn btn-danger btn-sm' style={{marginLeft:'10px'}} onClick={()=>BlockOn()}> 차단하기 </button>
                      ) : (
                        <button className='btn btn-danger btn-sm' style={{marginLeft:'10px'}} onClick={()=>BlockOff()}> 차단해제 </button>
                      )
                  )}
                </td>
              </tr>
              <tr style={{height:'40px'}}>
                <td style={{fontWeight:'bold', width:'100px', borderRight:'1px solid #bbb'}}>경고 횟수</td>
                <td style={{padding:'0 20px'}}>
                  {data.count}회
                  <button onClick={()=>incWarning()} className='btn btn-secondary btn-sm' style={{marginLeft:'16px', marginRight:'25px'}}>+</button>
                  <button onClick={()=>decWarning()} className='btn btn-secondary btn-sm'>- </button>
                </td>
              </tr>
              </tbody>
            </table>
            ):(
              <div style={{height:'200px'}}>
              <p>로딩중입니다. </p>
              </div>
            )}
            <div style={{textAlign:'center', marginTop:'20px'}}>
              <a type='button' className='btn btn-secondary' href='/n-members'>목록으로</a>
            </div>
          </div>
        </section>
      </main>
      <FooterNoticeQna />
    </div>
  );
}


export default NMemberRead;