import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import useAppStore from "../stores/useAppStore";
import api from "../utils/api";

function Home() {
    // username과 role을 Zustand에서 꺼냄
    const { username, resetUserInfo } = useAuthStore();
    const role = useAuthStore(state => state.role)
    const checkAuth = useAuthStore(state =>state.checkAuth);
    const isAuthChecked = useAuthStore(state => state.isAuthChecked);

    if (!isAuthChecked) {
        return <div>로딩 중...</div>; // 또는 빈 화면 <></>
    }

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            resetUserInfo();
            useAppStore.getState().setPasswordVerified(false);
            window.location.href = "/";
        } catch (err) {
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

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
                        {role ? (
                            <span onClick={handleLogout} style={{ cursor: "pointer", color: "#333", textDecoration: "none"}}>
                                로그아웃
                            </span>
                        ) : (
                            <Link to="/login" style={{ color: "#333", textDecoration: "none" }}>
                                로그인
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link to="/notices" style={{ color: "#333", textDecoration: "none" }}>
                            공지사항
                        </Link>
                    </li>
                    {/* 권한으로 병원은 예약내역 -> 회원은 마이페이지, 병원검색 둘다 이동 */}
                    {role === "ROLE_HOSPITAL" && (
                        <li>
                            <Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>
                                예약내역
                            </Link>
                        </li>
                    )}
                    {role === "ROLE_USER" && (
                        <>
                            <li>
                                <Link to="/nuser-mypage" style={{ color: "#333", textDecoration: "none" }}>
                                    마이페이지
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" style={{ color: "#333", textDecoration: "none" }}>
                                    병원검색
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Home;
