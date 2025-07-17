import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import api from "../../utils/api";
import NavUserMenu from "../../fragments/nuser/NavUserMenu";
import HeaderUser from "../../fragments/nuser/HeaderUser";
import styles from "../notice/Notice.module.css";
import {getMyWishList} from "../../utils/adoptionApi";

// 관심 유기동물 목록
function FavoriteAnimals({ activeTab }) {
    const navigate = useNavigate();
    const { username, role, checkAuth, resetUserInfo } = useAuthStore();
    // 관심 동물 목록 상태
    const [animals, setAnimals] = useState([]);
    const [page, setPage] = useState(1);

    // 컴포넌트 로딩되면 로그인 상태 확인
    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    useEffect(() => {
        if (!username) return;
        async function fetchWishes() {
            try {
                const res = await getMyWishList(page, animalsPerPage);
                setAnimals(res.data.wish);
                console.log("찜목록 응답:", res.data);
            } catch (err) {
                setAnimals([]);
                console.log('관심 유기동물 목록 불러오기 실패:', err);
            }
        }
        fetchWishes();
    }, [username, page]);


    // 로그인중이면 로그아웃, 로그인 안했으면 로그인으로 보낼거야 + checkAuth 실행한 후에 실행
    const logInlogOutHandler = async () => {
        if (username) {  // 로그인 되어있을 때
            try {
                await api.post('/logout');  // 로그아웃
                resetUserInfo();  // 저장된 정보 리셋
                // 약간의 딜레이 후 페이지 재로딩
                setTimeout(() => {
                    window.location.reload();
                }, 50);
            } catch (err) {
                console.log(err);
            }
        } else {  // 로그인x
            navigate('/login')
        }
    }

    // 페이지네이션 (예시: 한 페이지에 8개씩)
    const animalsPerPage = 8;
    const totalPages = Math.ceil(animals.length / animalsPerPage);
    const currentAnimals = animals.slice((page - 1) * animalsPerPage, page * animalsPerPage);

    return (
        <form className={styles.ntcQnaWrapper}>
            <HeaderUser />
            <main>
                <NavUserMenu activeTab="adoption" />
                <div style={{ padding: "40px 60px" }}>
                    <h2 style={{ marginBottom: "32px", fontWeight: 700, textAlign: 'center' }}>관심 유기동물 목록</h2>
                    {/* 카드 그리드 */}
                    {/* 한 줄에 4개의 열이 생기고, 각 열은 전체 가로폭의 1/4씩 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px'}}>
                        {currentAnimals.length === 0 ? (
                            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#aaa" }}>
                                관심 등록된 유기동물이 없습니다.
                            </div>
                        ) : (
                            currentAnimals.map(animal => (
                                <div key={animal.ano}>
                                    <img src={animal.aprofile} alt={animal.aname} style={{ width: 200, height: 200, objectFit: "cover" }} />
                                    <Link to={'/adoptions'}><p>{animal.aname}</p></Link>
                                    <p>{animal.acity}</p>
                                </div>
                            ))
                        )}
                    </div>
                    {/* 페이지네이션 */}
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 30, padding: 0, fontSize: "18px" }}>
                        {/* 현재페이지에서 1을 빼서 이전페이지로 이동, disabled -> 현재 첫페이지 일때는 버튼 비활성화 */}
                        <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ marginRight: 8, background: "#f2e9e1", color: "#333", border: "none", borderRadius: "6px", padding: "8px 16px"}}>이전</button>
                        {/* Array.from -> 각페이지 번호에 대한 버튼, "bold" : "normal" 글씨 굷게 */}
                        {Array.from({ length: totalPages }, (_, idx) => (
                            <button key={idx + 1} onClick={() => setPage(idx + 1)} style={{ background: page === idx + 1 ? "#ff5f2e" : "#fff", color: page === idx + 1 ? "#fff" : "#ff5f2e", border: "1px solid #ff5f2e",
                                borderRadius: "6px", padding: "8px 16px", cursor: "pointer", margin: "1px", fontWeight: page === idx + 1 ? "bold" : "normal" }}>{idx + 1}</button>
                        ))}
                        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} style={{ marginLeft: 8, background: "#f2e9e1", color: "#333", border: "none", borderRadius: "6px", padding: "8px 16px" }}>다음</button>
                    </div>
                </div>
            </main>
        </form>
    );
}

export default FavoriteAnimals;