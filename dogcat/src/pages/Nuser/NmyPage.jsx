import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from '../../stores/useAuthStore';
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna';
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna';
import styles from '../notice/Notice.module.css';

// 병원 마이페이지
function MyPage() {
  const navigate = useNavigate();

  const [nuser, setNuser] = useState({
    nid: "",
    nname: "",
    nbirth: "",
    ntel: "",
    address: "",
    email: "",
    nsubaddr: ""
  });

    useEffect(() => {
      const fetch = async()=>{
        try{
          const response = await axios.get("http://localhost:8080/nuser-mypage", {withCredentials:true});
          const data = response.data;
          console.log(data);
          setNuser({
            nid : data.nid,
            nname : data.nname,
            nbirth : data.nbirth,
            ntel : data.ntel,
            address : data.naddr,
            email : data.email,
            nsubaddr: data.nsubaddr
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetch();
    }, []);
  
    // 로그인 정보 저장
    const { username, resetUserInfo } = useAuthStore();
    console.log("Booking username:", username);

    const checkAuth = useAuthStore(state => state.checkAuth);
      useEffect(() => {
        checkAuth();
      }, [checkAuth]);
    

  const handleEdit = () => {
    navigate("/change-nmypage")
  }

  return (
    <div className={styles.ntcQnaWrapper}>
      <HeaderNoticeQna /> 
        <main>
        <NavNoticeQna activeTab="nuser-mypage" />
        {/* 왼쪽: 병원 정보 */}
        <div className="boxStyle" style={{ width: '100%', maxWidth: '1000px' }}>
        <div style={{ flex: 1, background: "#fff", padding: "60px 60px 58px 58px", marginRight: "54px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "42px", textAlign: "center" }}>
            <span>{nuser.nname}</span>님 회원정보
          </div>
          <div style={{ display: "flex", gap: "38px", justifyContent: "center" }}>
            {/* 왼쪽: 병원명, 주소 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>ID</div>
              <div style={{ marginBottom: "22px" }}>{nuser.nid}</div>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>이름</div>
              <div style={{ marginBottom: "18px" }}>{nuser.nname}</div>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>생년월일</div>
              <div style={{ marginBottom: "18px" }}>{nuser.nbirth}</div>
            </div>
            {/* 오른쪽: 아이디 및 상세정보 */}
            <div style={{ minWidth: "220px" }}>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>연락처</div>
              <div style={{ marginBottom: "18px" }}>{nuser.ntel}</div>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>주소</div>
              <div style={{ marginBottom: "22px" }}>{nuser.address} {nuser.nsubaddr && `(${nuser.nsubaddr})`}</div>
              <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>Email</div>
              <div>{nuser.email}</div>
            </div>
          </div>
           <div className='mt-3 mb-5' style={{ textAlign: 'center' }}>
          <button className="btn btn-dark" onClick={handleEdit}>수정하기</button>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyPage;