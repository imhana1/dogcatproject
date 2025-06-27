import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", // 수직 중앙
                // 수평 중앙
                alignItems: "center" }}>
            {/* 가운데 큰 로고 */}
            <img src="/dogcat_logo.png" alt="너도멍냥 동물병원" style={{ width: 500, height: 500, objectFit: "contain", marginBottom: 40}} />

            {/* 아래 네비게이션 링크 */}
            <nav>
                <ul
                    style={{
                        display: "flex",
                        gap: "48px",
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        fontSize: "1.3rem",
                        fontWeight: "bold"
                    }}
                >
                    <li>
                        <Link to="/login" style={{ color: "#333", textDecoration: "none" }}>
                            로그인
                        </Link>
                    </li>
                    <li>
                        <Link to="/notice" style={{ color: "#333", textDecoration: "none" }}>
                            공지사항
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" style={{ color: "#333", textDecoration: "none" }}>
                            병원검색
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
