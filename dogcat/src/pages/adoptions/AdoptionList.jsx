import React, {Component} from 'react';
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import testImage from "./testImage.jpg"
import styles from "../notice/Notice.module.css";
import {useNavigate} from "react-router-dom";

function AdoptionList () {
  const navigate = useNavigate();
    return (
      <div className={styles.ntcQnaWrapper}>
        <HeaderNoticeQna title='동물 보호소' />
        <main>
          <NavNoticeQna activeTab='adoption' />
          <section>
            {/* 감싸는 div. 이 안에서 map 돌리면 반복됨 */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '28px'}}>
            {/*이 친구가 반복되어 나타나는거야*/}
            <div style={{border: '1px solid #bbb', width:'220px', borderRadius:'5%', padding:'10px', cursor:'pointer'}} onClick={()=>navigate('주소')}>
              <img alt='동물 사진' src={testImage} style={{height:'200px'}}/>
              <p>이름</p>
              <p>지역</p>
              <button style={{marginLeft:'90%'}}>♡</button>
            </div>

            </div>
          </section>
        </main>
        <FooterNoticeQna />
      </div>
    );
}

export default AdoptionList;