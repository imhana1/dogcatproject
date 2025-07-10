import React, {Component, useEffect, useState} from 'react';
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import styles from "../notice/Notice.module.css";
import {
  findHospitalMemberByUsername,
  hBlockOff,
  hBlockOn,
  hDecWarningCount,
  hIncWarningCount
} from "../../utils/hMemberManageApi";
import useAuthStore from "../../stores/useAuthStore";
import {useNavigate, useSearchParams} from "react-router-dom";
import {nBlockOff, nBlockOn, nDecWarningCount, nIncWarningCount} from "../../utils/nMemberManageApi";

function HMemberRead () {
  // 필요한거
  const {username, role} = useAuthStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const hUsername = params.get('username');
  const [data, setData] = useState();

  // 유저 데이터 가져오기
  async function fetchNMember() {
    try {
      const response = await findHospitalMemberByUsername(hUsername);
      setData(response.data);
    } catch(err) {
      console.log('유저 데이터를 가져오지 못했습니다: ', err);
    }
  }

  // 데이터 관리
  useEffect(() => {
    if(hUsername) {  // 주소창에 파라미터 있으면 실행해
      fetchNMember();
    } else {
      alert('잘못된 주소입니다. ');
      navigate('/h-member');
    }
  }, [hUsername]);

  // 경고 횟수 증가
  const incWarning = async () => {
    const response = window.confirm('경고 횟수를 1회 증가하시겠습니까?');
    if (response) {
      try {
        await hIncWarningCount(hUsername);
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
        await hDecWarningCount(hUsername);
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
        await hBlockOn(hUsername);
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
        await hBlockOff(hUsername);
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
      <HeaderNoticeQna />
      <main>
        <NavNoticeQna />
        <section>
          <div  style={{ padding: '0 20px' }}>
            <h4 className='mb-4 mt-3'>일반 회원 정보 조회 및 변경</h4>
            <table style={{margin:'30px 20px'}}>
              <tbody>
              <tr style={{height:'40px'}}>
                <td style={{fontWeight:'bold', width:'100px', borderRight:'1px solid #bbb'}}>ID</td>
              </tr>
              <tr style={{height:'40px', width:'100px', borderRight:'1px solid #bbb'}}>
                <td style={{fontWeight:'bold'}}>이름</td>
              </tr>
              <tr style={{height:'40px', width:'100px', borderRight:'1px solid #bbb'}}>
                <td style={{fontWeight:'bold'}}>연락처</td>
              </tr>
              <tr style={{height:'40px', width:'100px', borderRight:'1px solid #bbb'}}>
                <td style={{fontWeight:'bold'}}>주소</td>
              </tr>
              <tr style={{height:'40px', width:'100px', borderRight:'1px solid #bbb'}}>
                <td style={{fontWeight:'bold'}}>이메일</td>
              </tr>
              <tr style={{height:'40px', width:'100px', borderRight:'1px solid #bbb'}}>
                <td style={{fontWeight:'bold'}}>가입일</td>
              </tr>
              <tr style={{height:'40px', width:'100px', borderRight:'1px solid #bbb'}}>
                <td style={{fontWeight:'bold'}}>회원 상태</td>
              </tr>
              <tr style={{height:'40px', width:'100px', borderRight:'1px solid #bbb'}}>
                <td style={{fontWeight:'bold'}}>경고 횟수</td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <FooterNoticeQna />
    </div>
  );
}


export default HMemberRead;