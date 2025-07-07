import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

function Home() {
    // username과 role을 Zustand에서 꺼냄
    const { username, role } = useAuthStore();


    return (
        <div
            style={{
                minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", // 수직 중앙
                // 수평 중앙
                alignItems: "center"
            }}>
            {/* 가운데 큰 로고 */}
            <img src="/dogcat_logo.png" alt="너도멍냥 동물병원" style={{ width: 500, height: 500, objectFit: "contain", marginBottom: 40 }} />

            {/* 아래 네비게이션 링크 */}
            <nav>
                <ul style={{ display: "flex", gap: "48px", listStyle: "none", padding: 0, margin: 0, fontSize: "1.3rem", fontWeight: "bold" }}>
                    <li>
                        <Link to="/login" style={{ color: "#333", textDecoration: "none" }}>
                            로그인
                        </Link>
                    </li>
                    <li>
                        <Link to="/notices" style={{ color: "#333", textDecoration: "none" }}>
                            공지사항
                        </Link>
                    </li>
                    <li>
                        {/* 병원은 예약내역, 고객은 마이페이지, 비로그인은 병원검색 */}
                        {role === "ROLE_HOSPITAL" ? (
                            <Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>
                                예약내역
                            </Link>
                        ) : role === "ROLE_USER" ? (
                            <Link to="/nuser-mypage" style={{ color: "#333", textDecoration: "none" }}>
                                마이페이지
                            </Link>
                        ) : (
                            <Link to="/search" style={{ color: "#333", textDecoration: "none" }}>
                                병원검색
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
