import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ChangenMyPage.css';
import PostcodeSearch from '../../components/hospitals/PostcodeSearch';
import useAuthStore from '../../stores/useAuthStore';
import axios from 'axios';
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna';
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna';
import styles from '../notice/Notice.module.css';

function ChangeMyPage() {
  const navigate = useNavigate();
  const [showPostcode, setShowPostcode] = useState(false);

  // 로그인 정보 저장
  const { username, resetUserInfo } = useAuthStore();

  const [form, setForm] = useState({
    nid: "",
    nname: "",
    zip: "",
    address: "",
    address1: "",
    nbirth: "",
    ntel: "",
    email: ""
  });

  useEffect (() => {
    const fetch = async() => {
    try {
      const response = await axios.get("http://localhost:8080/nuser-mypage", {withCredentials: true});
      const data = response.data;
      console.log(data);

      setForm ({
        nid : data.nid,
        nname : data.nname,
        zip : data.zip,
        address : data.naddr,
        address1: data.nsubaddr,
        nbirth : data.nbirth,
        ntel : data.ntel,
        email : data.email
      });
    } catch (err) {
      console.log(err);
    }
  };
  fetch();
  }, []);

  const handleUpdate = async() => {
    const formData = new FormData();

    const dto = {
        nid : form.nid,
        nname : form.nname,
        zip : form.zip,
        naddr : form.address,
        address1 : form.nsubaddr,
        nbirth : form.nbirth,
        ntel : form.ntel,
        email : form.email
    }

    try {
      const response = await axios.post("http://localhost:8080/nuser/profile", formData, {
        withCredentials: true,
      });
      navigate("/nuser-mypage");
    } catch(err) {
      console.error(err);
      alert("정보 변경 중 오류가 발생했습니다: " + err.message);
    }
  };

  // 정보 변경
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  
  // 카카오 우편번호 검색 기능
  const handleComplete = (data) => {
    setForm({
      ...form,
      zip: data.zonecode,
      address1: data.address,
    });
    setShowPostcode(false);
  };

  // 회원 탈퇴
  const handleDelete = () => {
    navigate("/nuser/delete");
  }
  

  return (
    <form className={styles.ntcWrapper}>
      <HeaderNoticeQna />
      <main style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
        <NavNoticeQna activeTab="change-nmypage" />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div className="boxStyle" style={{ width: '100%', maxWidth: '1000px' }}>
              <div style={{ marginBottom: "15px", textAlign: "left", fontWeight: "bold" }}>
                <span style={{ color: "red" }}>*</span> 표시 필수 입력
              </div>
              <div className="formContainerStyle">
                <div className="columnStyle">
                  <label className="labelStyle" >
                    연락처 <span style={{ color: "red" }}>*</span>
                  </label>
                  <input className="inputStyle" type="text" name="ntel" placeholder="000-0000-0000" onChange={handleChange} value={form.ntel} required />
                </div>
                {/* 오른쪽 컬럼 */}
                <div className="columnStyle">
                  <label className="labelStyle">Email</label>
                  <input className="inputStyle" type="email" name="email" onChange={handleChange} placeholder="you@example.com" value={form.email} required />
                  <label className="labelStyle">
                    주소 <span style={{ color: "red" }}>*</span>
                      <button type="button" className="mb-2 mt-2 btn btn-dark" onClick={() => setShowPostcode(true)}>우편번호 찾기</button>
                    {showPostcode && (
                        <PostcodeSearch onComplete={handleComplete} />
                    )}
                  </label>
                  <input type="text" name="zip" onChange={handleChange} placeholder="우편번호" value={form.zip} style={{ width: "180px", height:"35px", minWidth: 100, display: "inline-block" }} required />
                  <input className="inputStyle" type="text" name="naddr" onChange={handleChange} placeholder="상세 주소를 입력해주세요" value={form.address} required />
                  <input className="inputStyle" type="text" name="address1" onChange={handleChange} placeholder="주소를 입력해주세요" value={form.address1} required />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }} onClick={handleUpdate}>수정하기</button>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }} onClick={handleDelete}>회원 탈퇴</button>
              </div>
          </div>
        </div>
      </main>
    </form>
  );
}

export default ChangeMyPage;
