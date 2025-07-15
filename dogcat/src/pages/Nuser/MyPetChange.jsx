import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import './ChangenMyPage.css';
import HeaderNoticeQna from '../../fragments/noticeQna/HeaderNoticeQna';
import NavNoticeQna from '../../fragments/noticeQna/NavNoticeQna';
import styles from '../notice/Notice.module.css';
import NavUserMenu from "../../fragments/nuser/NavUserMenu";
import HeaderUser from "../../fragments/nuser/HeaderUser";

const MyPetChange = () => {
    const navigate = useNavigate();
    const [pprof, setPprof] = useState(null);
    const [pprofPreview, setPprofPreview] = useState(null); // 미리보기용

    const [form, setForm] = useState ({
        pno: "",        // 동물 번호
        ptype: "",      // 동물 종류
        pmichipe: "",   // 내장칩 유무
        pbreed: "",     // 품종
        pname: "",      // 이름
        pweight: "",    // 몸무게
        page: "",       // 나이
        palg: "",       // 알러지 유무
        pins: "",       // 펫보험 여부
        pchronic: "",   // 선천적 지병
        psname: "",     // 수술 이름
        pprof: ""       // 펫프사
    });

    useEffect(() => {
        const fetch = async() => {
            try {
                const response = await axios.get("http://localhost:8080/nuser-pet", {withCredentials : true});
                const data = response.data;
                console.log(data);
                
                if(data.length > 0) {
                    const pet = data[0];
                setForm({
                    pno : pet.pno,
                    ptype : pet.ptype,
                    pmichipe : pet.pmichipe,
                    pbreed : pet.pbreed,
                    pname : pet.pname,
                    pweight : pet.pweight,
                    page : pet.page,
                    palg : pet.palg,
                    pins : pet.pins,
                    pchronic : pet.pchronic,
                    psname : pet.psname
                });

                if (data.pprof) { 
                    setPprofPreview(data.pprof);
                }
            }
            } catch(err) {
                console.log("펫 정보 로딩 실패", err);
            }
        };
        fetch();
    }, []);

    const handleUpdate = async() => {
        const formData = new FormData()

        const dto = {
            pno : form.pno,
            ptype : form.ptype,
            pmichipe : form.pmichipe,
            pbreed : form.pbreed,
            pname : form.pname,
            pweight : form.pweight,
            page : form.page,
            palg : form.palg,
            pins : form.pins,
            pchronic : form.pchronic,
            psname : form.psname
        }
        formData.append("dto", new Blob([JSON.stringify(dto)], {type : "application/json"}));

        if (pprof) formData.append("pprof", pprof);

        try {
            const response = await axios.post("http://localhost:8080/nuser-petchange", formData, {
                withCredentials : true,
                headers: {
                    "Content-Type": "multipart/form-data"}
            });
            navigate("/nuser-pet");
        } catch(err) {
            console.log(err);
            alert("정보 변경 중 오류 발생 : " + err.message);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
    }

    
    // 로그인 정보 저장
    const { username, resetUserInfo } = useAuthStore();
    const checkAuth = useAuthStore(state => state.checkAuth);
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPprof(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPprofPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPprof(null);
            setPprofPreview(null);
        }
    };

    return (
      <form className={styles.ntcWrapper}>
        <HeaderUser />
        <main style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
        <NavUserMenu activeTab="nuser-petchange" />
            <div className="boxStyle" style={{ width: '100%', maxWidth: '1000px' }}>
              <div style={{ marginBottom: "15px", textAlign: "left", fontWeight: "bold" }}>
            </div>
              <div className="formContainerStyle">
                <div className="columnStyle">
                  <label className="labelStyle">
                    프로필 사진
                  </label>
                  <input className="inputStyle" type="file" accept="image/*" onChange={handlePhotoChange} />
                  {pprofPreview && (
                    <div style={{ margin: "10px 0" }}>
                      <img src={pprofPreview} alt="펫 프로필 사진" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 10, border: "1px solid #ddd" }} />
                    </div>
                  )}
                  <label className="labelStyle">
                    동물 번호
                  </label>
                  <input className="inputStyle" type="text" name="pno" onChange={handleChange} placeholder="동물 번호를 입력해주세요" value={form.pno} readOnly={true} />
                  <label className="labelStyle">
                    이름
                  </label>
                  <input className="inputStyle" type="text" name="pname" onChange={handleChange} placeholder="이름을 입력해주세요" value={form.pname} />
                  <label className="labelStyle">
                    종류 
                  </label>
                  <input className="inputStyle" type="text" name="ptype" onChange={handleChange} placeholder="동물 종류를 입력해주세요" value={form.ptype} />
                  <label className="labelStyle">
                    품종
                  </label>
                  <input className="inputStyle" type="text" name="pbreed" onChange={handleChange} placeholder="품종을 입력해주세요" value={form.pbreed} />
                  <label className="labelStyle">
                    내장칩 유무 
                  </label>
                  <input className="inputStyle" type="text" name="pmichipe" onChange={handleChange} placeholder="내장칩 유무를 입력해주세요" value={form.pmichipe} />      
                </div>
                {/* 오른쪽 컬럼 */}
                <div className="columnStyle">
                  <label className="labelStyle">
                    몸무게 
                  </label>
                  <input className="inputStyle" type="text" name="pweight" onChange={handleChange} placeholder="대표자이름을 입력해주세요" value={form.pweight}/>
                  <label className="labelStyle">
                    생년월일
                  </label>
                  <input className="inputStyle" type="date" name="page" onChange={handleChange} placeholder="YYYY-MM-DD" value={form.page} />
                  <label className="labelStyle">
                    알러지 유무 
                  </label>
                  <input className="inputStyle" type="text" name="palg" onChange={handleChange} placeholder="알러지가 있다면 입력해주세요" value={form.palg} />
                  <label className="labelStyle">
                    펫 보험 
                  </label>
                  <input className="inputStyle" type="text" name="pins" onChange={handleChange} placeholder="펫보험이 있다면 입력해주세요" value={form.pins} />
                  <label className="labelStyle">
                    선천적 지병
                  </label>
                  <input className="inputStyle" type="text" name="pchronic" onChange={handleChange} placeholder="선천적지병이 있다면 입력해주세요" value={form.pchronic} />
                  <label className="labelStyle">
                    수술 이력 
                  </label>
                  <input className="inputStyle" type="text" name="psname" onChange={handleChange} placeholder="수술 이력이 있다면 이름을 입력해주세요" value={form.psname}/>
                </div>
              </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button type="button" className="btn btn-outline-dark btn-block" style={{ width: "40%", padding: "10px", fontSize: "1.1rem" }} onClick={handleUpdate}>수정하기</button>
                </div>
            </div>
        </main>
      </form>
    );
};

export default MyPetChange;