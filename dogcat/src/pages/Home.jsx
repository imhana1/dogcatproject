import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import useAppStore from "../stores/useAppStore";
import api from "../utils/api";

function Home() {
    // username과 role을 Zustand에서 꺼냄
    const { username, resetUserInfo } = useAuthStore();
    const role = useAuthStore(state => state.role)
    const checkAuth = useAuthStore(state =>state.checkAuth);
    const isAuthChecked = useAuthStore(state => state.isAuthChecked);
    const navigate = useNavigate();

    // 컴포넌트 마운트 시 인증 상태를 확인
    useEffect(() => {
        // isAuthChecked가 false인 경우에만 checkAuth 호출
        // 불필요한 반복 호출을 막기 위함
        if (!isAuthChecked) {
            checkAuth();
        }
    }, [checkAuth, isAuthChecked]); // checkAuth와 isAuthChecked가 변경될 때만

    // 현재 Home 컴포넌트의 role과 isAuthChecked 상태를 콘솔에 출력
    // 이 로그를 통해 'role'이 'HOSPITAL' 또는 'USER'로 올바르게 설정되는지 확인하세요.
    console.log('Home Component Render - Current Role:', role, 'IsAuthChecked:', isAuthChecked);

    if (!isAuthChecked) {
        return <div>로딩 중...</div>; // isAuthChecked가 true가 될 때까지 로딩 메시지 표시
    }

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            resetUserInfo(); // Zustand 스토어의 사용자 정보 초기화
            useAppStore.getState().setPasswordVerified(false); // 앱 관련 상태 초기화 (비밀번호 인증 등)
            navigate("/"); // React Router를 사용하여 루트 경로로 부드럽게 이동
        } catch (err) {
            alert('로그아웃 중 오류가 발생했습니다.'); // 오류 발생 시 사용자에게 알림
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // 수직 중앙 정렬
                alignItems: "center"      // 수평 중앙 정렬
            }}>
            {/* 가운데 큰 로고 이미지 */}
            <img src="/dogcat_logo.png" alt="너도멍냥 동물병원" style={{ width: 500, height: 500, objectFit: "contain", marginBottom: 40 }} />

            {/* 아래 네비게이션 링크 */}
            <nav>
                <ul style={{ display: "flex", gap: "48px", listStyle: "none", padding: 0, margin: 0, fontSize: "1.3rem", fontWeight: "bold" }}>
                    <li>
                        {/* role 값이 존재하는지 여부로 로그인/로그아웃 버튼을 조건부 렌더링 */}
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
                    {/* ✅ 수정: 'role' 값이 "HOSPITAL"일 때만 '예약내역' 링크를 렌더링 */}
                    {/* 서버에서 'ROLE_HOSPITAL'이 아닌 'HOSPITAL'로 role을 반환하는 경우에 맞춤 */}
                    {role === "ROLE_HOSPITAL" && (
                        <li>
                            <Link to="/booking" style={{ color: "#333", textDecoration: "none" }}>
                                예약내역
                            </Link>
                        </li>
                    )}
                    {/* ✅ 수정: 'role' 값이 "USER"일 때만 '마이페이지'와 '병원검색' 링크를 렌더링 */}
                    {/* 서버에서 'ROLE_USER'가 아닌 'USER'로 role을 반환하는 경우에 맞춤 */}
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