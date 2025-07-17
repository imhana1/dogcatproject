import React, { useEffect, useState } from 'react';
import { FcClock } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import useAppStore from "../../stores/useAppStore";
import axios from "axios";

// 병원사진
const images = [
    {
        src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAyMTVfMzAg%2FMDAxNTE4NzA0NjUyMDUz.-kxqPB4ib6skm4t1viLvEDf4NGUm-qdWGxAKrxIWrfQg.q3y5NRRzGkXDqDt2hhOEwEIsnMxfrOXsPNxlUw5Zj1wg.JPEG.bairon02%2F190213_merci_A_0118.JPG&type=sc960_832",
        alt: "병원 내부 사진"
    },
    {
        src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTExMjlfMTM0%2FMDAxNTc1MDE4MDMzMzg0.5ROZW3NYgIVPLjvV37x8ntSn3x5F0vMoc-qDQyxtbZgg.amfx6qXkC5qQYK_i-Ju3gEAZPEmYginEh9cPca_f4Acg.JPEG.seochoan%2FIMG_5985.JPG&type=sc960_832",
        alt: "진료 사진"
    },
    {
        src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAzMjNfMjU4%2FMDAxNTUzMzI0NTYxMjMy.oAaAUqw25nZYH3Gms35Z3uX3M2G74OxB6lTqwXssTr0g.53KoJ92cz-GSfLOOsA4N2YgkyRADrifaKiXdbt87k4gg.JPEG.seochoan%2FIMG_1359.JPG&type=sc960_832",
        alt: "진료 후 사진"
    }
];

// 인텔리제이 rsf 리액트 함수
function HospitalIntro() {
    const [form, setForm] =useState({});
    const [params]=useSearchParams();
    const hAddress = params.get("address");
    const hospitalName = params.get("name");
    const navigate = useNavigate();

    // console.log("주소: ", hAddress);
    // console.log("이름: ", hospitalName);

    // 간단한 이미지 슬라이드 (3초마다 자동 변경)
    const [imgIdx, setImgIdx] = React.useState(0);

    const checkAuth = useAuthStore(state => state.checkAuth);
    useEffect(() => {
        checkAuth();
    }, []);

    // console.log("병원 아이디", hAddress);

    // 병원 정보
    useEffect(() => {
        axios.get("http://localhost:8080/hospital/public", {
            params: { hAddress },
            withCredentials: true,
        })
        .then(res => {
            setForm(res.data);
            console.log("받은 병원 정보:", res.data);
        })
        .catch(err => {
            console.error("병원 정보 조회 실패", err);
        });
    }, [hAddress]);

    // useEffect(()=> {
    //     fetch(`/hospital/public?hUsername=${encodeURIComponent(hUsername)}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setHospital({ hUsername: data.hUsername, hospitalName: data.hospital });
    //         console.log('받은 병원 데이터:', data);
    //     })
    //     .catch(err => console.log('병원 정보 불러오기 실패', err));
    // },[hUsername]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setImgIdx(idx => (idx + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // 로그인 정보 저장
    const { username, resetUserInfo } = useAuthStore();

    const handleDoctor = e => {
        navigate("/hospital-doctor");
    }

    const handleReview = e => {
        navigate("/hospital-review")
    }

    // console.log("Link에 넘길 hUsername:", form.hUsername);
    // console.log("Link에 넘길 hospital:", form.hospital);
    return (
      //  Noto Sans KR 폰트 -> 컴퓨터에 없으면, 기본 산세리프(고딕체) 계열 글꼴로 대체
        <div style={{ fontFamily: "'Noto Sans KR', sans-serif", minHeight: "100vh" }}>
            {/* 네비게이션 바 */}
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥 동물병원</div>
                <nav>
                    <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
                        <li><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>병원 소개</span></li>
                        <li><Link to="/hospital-doctor" style={{ color: "#333", textDecoration: "none" }}>의료진 소개</Link></li>
                        <li><Link to="/reservation/write" state ={{ hUsername: form.husername, hospitalName: form.hospital }} style={{ color: "#333", textDecoration: "none" }}>예약</Link></li>
                    </ul>
                </nav>
                {username ? (
                    <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}
                            onClick={() => {resetUserInfo();useAppStore.getState().setPasswordVerified(false); // 인증 상태 초기화
                                window.location.href = "/";
                            }}>로그아웃</button>
                ) : (
                    <Link to="/login">
                        <button type="button" className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                            로그인
                        </button>
                    </Link>
                )}
            </header>
            {/* 이미지 슬라이드 */}
            <section style={{ width: "100%", maxWidth: "1200px", margin: "40px auto 0 auto", borderRadius: "18px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)"}}>
                <img src={images[imgIdx].src} alt={images[imgIdx].alt} style={{ width: "100%", height: "420px", objectFit: "cover", transition: "all 0.5s" }} />
                <div style={{ display: "flex", justifyContent: "center", gap: 4, margin: "18px auto" }}>
                    {images.map((_, i) => (
                      <div key={i} style={{ width: 48, height: 6, borderRadius: 6, background: imgIdx === i ? "#ff5f2e" : "#eee", transition: "background 0.3s"}}
                        // 클릭 시 해당 슬라이드로 이동
                      onClick={() => setImgIdx(i)}  />))}
                </div>
            </section>
            <section  style={{ textAlign: "center", margin: "40px 0 30px 0" }}>
                <h2 style={{ color: "#1c140d", fontWeight: "bold", fontSize: "2.1rem", marginBottom: 16 }}>
                    반려동물과 가장 가까운 친구로<br />
                    <span style={{ color: "#ff5f2e" }}>따뜻한 사랑</span>을 담아 진료하겠습니다
                </h2>
                <p style={{ color: "#444", fontSize: "1.15rem" }}>
                    {form.hintroduction}<br />
                    전문 의료진과 최신 시설로 항상 최선을 다하겠습니다.
                </p>
            </section>
            <div>
                <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", padding: "30px 40px", minWidth: 220, display: "flex", flexDirection: "column", alignItems: "center"}} >
                    <FcClock size={48} />
                    <h4 style={{ margin: "18px 0 8px 0", color: "#1c140d" }}>진료시간</h4>
                    <div style={{ color: "#555", fontSize: "1.1rem", lineHeight: 1.7, textAlign:"center" }}>
                        평일: <b>09:00 ~ 20:00</b><br />
                        토요일: <b>09:00 ~ 20:00</b><br />
                        <div style={{ color: "#ff5f2e" }}>일요일 휴무</div>
                    </div>
                    <div style={{ padding: "30px 40px", minWidth: 220, display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <FcPhone size={48} />
                        <h4 style={{ margin: "18px 0 8px 0", color: "#1c140d" }}>연락처</h4>
                        <div style={{ color: "#555", fontSize: "1.1rem" }}>
                            010-3475-9466
                        </div>
                    </div>
                    <div style={{ padding: "30px 40px", minWidth: 220, display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <FcHome size={48} />
                        <h4 style={{ margin: "18px 0 8px 0", color: "#1c140d" }}>주소</h4>
                        <div style={{ color: "#555", fontSize: "1.1rem", textAlign: "center" }}>
                            인천 미추홀구 매소홀로488번길 6-32<br />
                            태승빌딩 5층
                        </div>
                    </div>
              </div>
            </div>
            <button type="button" className="btn btn-outline-dark" onClick={handleReview} style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000, fontWeight: "bold", fontSize: "1.1rem", padding: "12px 28px" }}>리뷰보기</button>
        </div>
    );
}

export default HospitalIntro;