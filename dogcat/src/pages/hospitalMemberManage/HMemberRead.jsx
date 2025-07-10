import React, {Component} from 'react';
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import styles from "../notice/Notice.module.css";

function HMemberRead () {
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