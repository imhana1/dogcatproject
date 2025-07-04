import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import axios from 'axios';


const MyPetPage = () => {
    const navigate = useNavigate();

    const [pet, setPet] = useState ({
        pno: "",        // 동물 번호
        ptype: "",      // 동물 종류
        pmichipe: "",   // 내장칩 유무
        pbreed: "",     // 품종
        pname: "",      // 이름
        pweghit: "",    // 몸무게
        page: "",       // 나이
        palg: "",       // 알러지 유무
        pins: "",       // 펫보험 여부
        pchronic: "",   // 선천적 지병
        psname: "",     // 수술 이름
        pprof: "",      // 펫프사
        pprofUrl: ""    // 펫 프사 Url
    });

    useEffect(() => {
        const fetch = async()=> {
            try {
                const response = await axios.get("http://localhost:8080/nuser-pet", {withCredentials:true});
                const data = response.data;
                setPet ({
                    pno: data.pno,        
                    ptype: data.ptype,      
                    pmichipe: data.pmichipe,   
                    pbreed: data.preed,     
                    pname: data.pname,      
                    pweghit: data.pweghit,   
                    page: data.page,       
                    palg: data.palg,       
                    pins: data.pins,       
                    pchronic: data.pchronic,   
                    psname: data.psname,           
                    pprofUrl: data.pprof
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    const { username, resetUserInfo } = useAuthStore();
    console.log("username:", username);

    const checkAuth = useAuthStore(state => state.checkAuth);
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleEdit = () => {
        navigate("/nuser-pet");
    }

    const handleDelete = () => {
        navigate("/delete-account");
    }    

    return (
        <div>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
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
                </ul>
            </nav>
            {username ? (
                <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}
                        onClick={() => {resetUserInfo(); window.location.href = "/"; // 로그아웃 후 홈으로 이동
                        }}>로그아웃</button>
            ) : (
                <Link to="/login">
                    <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                    로그인
                    </button>
                    </Link>
                )}  
            </header>
            <div style={{ display: "flex", marginTop: "38px" }}>
                <div style={{ flex: 1, background: "#fff", border: "1.7px solid #222", borderRadius: "20px", padding: "60px 60px 58px 58px", marginRight: "54px" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "42px", textAlign: "center" }}>
                <span>나의 반려동물</span>정보
            </div>
                {/* 왼쪽 */}
                <div style={{ display: "flex", gap: "38px" }}>
                    <div style={{ minWidth: "220px" }}>
                        <div style={{ fontWeight: 500, marginBottom: "18px" }}>동물번호</div>
                        <div style={{ marginBottom: "32px" }}>{pet.pno}</div>
                        <div style={{ fontWeight: 500, marginBottom: "18px" }}>이름</div>
                        <div style={{ marginBottom: "32px" }}>{pet.pname}</div>
                        <div style={{ fontWeight: 500, marginBottom: "18px" }}>종류</div>
                        <div style={{ marginBottom: "32px" }}>{pet.ptype}</div>
                        <div style={{ fontWeight: 500, marginBottom: "18px" }}>품종</div>
                        <div style={{ marginBottom: "32px" }}>{pet.pbreed}</div>
                        <div style={{ fontWeight: 500, marginBottom: "18px" }}>내장칩 유무</div>
                        <div style={{ marginBottom: "32px" }}>{pet.pmichipe}</div>
                        <div style={{ fontWeight: 500, marginBottom: "18px" }}>몸무게</div>
                        <div style={{ marginBottom: "32px" }}>{pet.page}</div>
                    </div>
                </div>
                {/* 오른쪽 */}
                <div style={{ minWidth: "220px" }}>
                    <div style={{ fontWeight: 500, marginBottom: "18px" }}>생년월일</div>
                    <div style={{ marginBottom: "22px" }}>{pet.page}</div>
                    <div style={{ fontWeight: 500, marginBottom: "10px" }}>알러지 유무</div>
                    <div style={{ marginBottom: "18px" }}>{pet.palg}</div>
                    <div style={{ fontWeight: 500, marginBottom: "10px" }}>펫보험</div>
                    <div style={{ marginBottom: "18px" }}>{pet.pins}</div>
                    <div style={{ fontWeight: 500, marginBottom: "10px" }}>선천적 지병</div>
                    <div style={{ marginBottom: "18px" }}>{pet.pchronic}</div>
                    <div style={{ fontWeight: 500, marginBottom: "18px" }}>수술 이력</div>
                    <div style={{ marginBottom: "32px" }}>{pet.psname}</div>
                    <div style={{ fontWeight: 500, marginBottom: "18px" }}>프로필 사진</div>
                    <div style={{ marginBottom: "32px" }}>{pet.pprof}</div>
                </div>
            </div>
        </div>
            {/* 오른쪽 */}
            <aside style={{ width: "180px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
                <button className="btn btn-outline-dark" onClick={handleEdit} style={{ marginBottom: "20px", width: "100%" }}>수정하기</button>
                <button className="btn btn-outline-danger" onClick={handleDelete} style={{ marginBottom: "20px", width: "100%" }}>반려동물 삭제</button>
            </aside>
    </div>
    );
};

export default MyPetPage;