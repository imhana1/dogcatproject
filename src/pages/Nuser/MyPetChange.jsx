import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

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
                setForm({
                    pno : data.pno,
                    ptype : data.ptype,
                    pmichipe : data.pmichipe,
                    pbreed : data.pbreed,
                    pname : data.pname,
                    pweight : data.pweight,
                    page : data.page,
                    palg : data.palg,
                    pins : data.pins,
                    pchronic : data.pchronic,
                    psname : data.psname
                });
                if (data.pprof) setPprofPreview(data.pprof);
            } catch(err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    const handleUpdate = async() => {
        const formData = new FormData()

        const dto = {
            pno : data.pno,
            ptype : data.ptype,
            pmichipe : data.pmichipe,
            pbreed : data.pbreed,
            pname : data.pname,
            pweight : data.pweight,
            page : data.page,
            palg : data.palg,
            pins : data.pins,
            pchronic : data.pchronic,
            psname : data.psname
        }
        formData.append("dto", new Blob([JSON.stringify(dto)], {type : "application/json"}));

        if (pprof) formData.append("pprof", pprof);

        try {
            const response = await axios.post("http://localhost:8080/nuser-pet", formData, {
                withCredentials : true,
                header: {
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

    const handleDelete = () => {
    navigate("/delete-account");
    };

    return (
        <form>
            <nav>
            <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 10, padding: 0, fontSize: "18px" }}>
            <li>
                <Link to="/nuser-mypage" style={{ textDecoration: "none", color: "black" }}>내 정보 보기</Link>
            </li>
            <li>
                <Link to="/nuser-pet" style={{ textDecoration: "none" , color: "black" }} >나의 반려동물</Link>
            </li>
            <li>
                <Link to="/nuser-booking" style={{ textDecoration: "none" , color: "black" }}>예약 내역</Link>
            </li>
            <li>
                <Link to="/nuser-qna" style={{ textDecoration: "none", color: "black" }}>문의사항</Link>
            </li>
            <li>
                <Link to="/nuser-adoption" style={{ textDecoration: "none", color: "black" }}>유기동물 관심 목록</Link>
            </li>
            <button type="submit" className="btn btn-light" onClick={() => {window.location.href = "/"}}>로그아웃</button>
            </ul>
            </nav>
            <div style={{ display: "flex", marginTop: "38px" }}>
            {/* 왼쪽 */}
            <div style={{ flex: 1, background: "#fff", border: "1.7px solid #222", borderRadius: "20px", padding: "60px 60px 58px 58px", marginRight: "54px" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "42px", textAlign: "center" }}>
                <span>나의 반려동물</span>정보
            </div>
             <div className="formContainerStyle">
                      <div className="columnStyle">
                        <label className="labelStyle">
                          동물 번호
                        </label>
                        <input className="inputStyle" type="text" name="pno" onChange={handleChange} placeholder="동물 번호를 입력해주세요" value={form.pno} required />
                        <label className="labelStyle">
                          이름 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="pname" onChange={handleChange} placeholder="이름을 입력해주세요" value={form.pname} required />
                        <label className="labelStyle" >
                          종류 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="ptype" placeholder="종류를 입력해주세요" onChange={handleChange} value={form.ptype} required />
                        <label className="labelStyle" >
                          품종 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="pbreed" placeholder="품종을 입력해주세요" onChange={handleChange} value={form.pbreed} required />
                        <label className="labelStyle" >
                          내장칩 유무 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="pmichipe" onChange={handleChange} value={form.pmichipe} required />
                        <label className="labelStyle" >
                          몸무게 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="pweight" placeholder="몸무게를 입력해주세요" onChange={handleChange} value={form.pweight} required />
                      </div>
                      {/* 오른쪽 컬럼 */}
                      <label className="labelStyle">
                          생년월일 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="page" onChange={handleChange} placeholder="YYYY-MM-DD" value={form.page} required />
                        <label className="labelStyle" >
                          알러지 유무 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="palg" onChange={handleChange} value={form.palg} required />
                        <label className="labelStyle" >
                          펫보험 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="pins" onChange={handleChange} value={form.pins} required />
                        <label className="labelStyle" >
                          선천적 지병 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="pchronic" onChange={handleChange} value={form.pchronic} required />
                        <label className="labelStyle" >
                          수술 이력 <span style={{ color: "red" }}>*</span>
                        </label>
                        <input className="inputStyle" type="text" name="psname" placeholder="수술 이력을 입력해주세요" onChange={handleChange} value={form.psname} required />
                      <div className="columnStyle">
                        <label className="labelStyle">
                          의료진 사진
                        </label>
                        <input className="inputStyle" type="file" accept="image/*" onChange={handlePhotoChange} />
                        {pprofPreview && (
                            <div style={{ margin: "10px 0" }}>
                              <img src={pprofPreview} alt="사진 미리보기" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 10, border: "1px solid #ddd" }} />
                            </div>
                        )}
                        </div>
                        </div>
                    <aside style={{ width: "180px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
                        <button className="btn btn-outline-dark" onClick={handleUpdate} style={{ marginBottom: "20px", width: "100%" }}>수정하기</button>
                        <button className="btn btn-outline-danger" onClick={handleDelete} style={{ marginBottom: "20px", width: "100%" }}>반려동물 삭제</button>
                    </aside>
                </div>
            </div>
        </form>
    );
};

export default MyPetChange;