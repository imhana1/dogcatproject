import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import api from "../../utils/api";
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import NavUserMenu from "../../fragments/nuser/NavUserMenu";
import HeaderUser from "../../fragments/nuser/HeaderUser";
import styles from "../notice/Notice.module.css";

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

    // 더미 데이터 지금은 일단 때려박음, 사진 어떤식으로 나오는지 보기위해 집어넣음
    useEffect(() => {
        setAnimals([
            { ano:1, a_name:'코코', a_profile: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMTFfMTg3%2FMDAxNzA3NjIwMjYwMDAz.QlAdV3pApnQxot4JIjIrVJ9m70S_fzI0yQh-zu0EbJQg.Oou54RvSd-2oEj5w-vub6nevvj87r9lV0c_K5jxEQ80g.JPEG.luckystar_00%2F%25C1%25B6%25B1%25D4%25B9%25CE%25B4%25D44-3_5r1pcs%252C%25BF%25B1%25BC%25AD.jpg&type=sc960_832", a_city: "서울" },
            { ano:2, a_name:'초코', a_profile: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMTU5%2FMDAxNzQzODE2NTIxNjY2.4h_7Wl00e2GUY2UBDnx7QNpaEy3ve5HR1KcY8Wql0ukg.V3DAMpHOWlcvm-8Pu0O2uue7ZDDKQBWAQz5rvfx2x2kg.JPEG%2F1B4B9FC7-C842-4F46-99AF-063296A74EF9.jpg&type=sc960_832", a_city: "경기" },
            { ano:3, a_name:'보리', a_profile: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAyMDlfODEg%2FMDAxNzM5MDk3NDY3NDY2.l2VWLgu279Z1cTlZFssWrcgp_nUJnFMT2XzZZnTRx4Ug._2ntdgw8vi1s2U2IROMGT9JZYZgPOPwNNshi0scuISQg.JPEG%2F%25C1%25F5%25B8%25DB3.jpg&type=sc960_832", a_city: "인천" },
            { ano:4, a_name:'별이', a_profile: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA3MTZfMTQx%2FMDAxNzIxMTMzMjgwMzI4.a40xmVEclgQRdrdYXDD-O-YQU-k1U-7pLnR2VJt5t3Mg.cmckV7V4Q3W5qwTQ1jj0ac8lB8qowezXXjCMb4lSk5Qg.JPEG%2F%25C4%25C3%25B7%25AF_%25B6%25F3%25B9%25CC1.jpg&type=sc960_832", a_city: "부산" },
            { ano:5, a_name:'쫑이', a_profile: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTVfMTEg%2FMDAxNzEwNTE0Mjc2MjMz.utskMNRYF91VknOJzqQPeE3FkD0IW6P5P4lgsbdtJFsg.8QKQTJ1ej0mIx8ypFQg6r1Qx0RGKk_mg0sMSI7Eu7B0g.JPEG%2FUND_7546.jpg&type=sc960_832", a_city: "대전" },
            { ano:6, a_name:'몽이', a_profile: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTRfMjkg%2FMDAxNzEwNDI1Nzk2MzI5.vwzL-ePrhR_kGgJNQ-OxVxsTYAxDRPHnEyyabfi9owwg.go5iWdCM_7ZSk7MgosU-UviRsEmZzQC6VpB9g_jbimEg.JPEG%2F%25B0%25AD%25BE%25C6%25C1%25F6_%25BB%25E7%25C1%25F8%25B0%25FC-20.jpg&type=sc960_832", a_city: "강원" },
            { ano:7, a_name:'루루', a_profile: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MDZfMTYy%2FMDAxNzI1NjM0MDgyNzgw.7buTFhbl8PykClt0nZ769PZQ7N1J2nd517JdFde4S6Mg.SVDh9BCSJuJVwWe6Ra3LtuZS7HnhWwdSuEEwqw4J2Fog.JPEG%2F%25B0%25AD%25BE%25C6%25C1%25F6%25C3%25D4%25BF%25B5_%25C6%25F7%25B8%25DE_%25B7%25CE%25B6%25C7_%25B9%25DD%25B7%25C1%25B5%25BF%25B9%25B0%25C7%25C1%25B7%25CE%25C7%25CA_2.jpg&type=sc960_832", a_city: "경기" },
            { ano:8, a_name:'넨네', a_profile: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MjlfMjEy%2FMDAxNzE5NjY2NDY3MjQy.HfUhJ3fIS5aI4Pg1nkrBsDGMLjU12ofFaFgITWQy0G8g.g5v5fbubwvisP2BF98nbNeEPwQ8vz5QWekYg-WigLjcg.JPEG%2F%25BC%25BA%25B3%25B2_%25BF%25C0%25B5%25F0%25B3%25CA%25B8%25AE%25B5%25B6%25BD%25BA_%25B9%25DD%25B7%25C1%25B5%25BF%25B9%25B0_%25C7%25C1%25B7%25CE%25C7%25CA_%25BD%25BA%25C6%25A9%25B5%25F0%25BF%25C0_%25B0%25AD%25BE%25C6%25C1%25F6_%25BB%25E7%25C1%25F8%25C3%25D4%25BF%25B5_%25C8%25C4%25B1%25E28.jpg&type=sc960_832", a_city: "대구" }
        ])
    }, []);

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
                        {currentAnimals.length === 0? (
                            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#aaa" }}>
                                관심 등록된 유기동물이 없습니다.
                            </div>
                        ) : (
                            currentAnimals.map(animal => (
                                <div key={animal.ano} style={{ border: '1px solid #eee', borderRadius: 12, padding: 20, background: '#fafafa', minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <div style={{ width: 200, height: 200, background: '#eaeaea', borderRadius: 10, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {animal.a_profile
                                            ? <img src={animal.a_profile} alt={animal.a_name} style={{ width: 200, height: 200, objectFit: "cover", borderRadius: 8 }} />
                                            : <span style={{ color: '#bbb', fontSize: 32 }}>{animal.a_profile}</span>
                                        }
                                    </div>
                                    <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}><Link to='/adoptions'>{animal.a_name}</Link></div>
                                    <div style={{ color: '#888', fontSize: 14, marginBottom: 5 }}>{animal.a_city}</div>
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