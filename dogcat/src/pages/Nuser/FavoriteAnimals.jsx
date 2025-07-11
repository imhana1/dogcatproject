import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import api from "../../utils/api";
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";

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

    // 더미 데이터 지금은 일단 때려박음
    useEffect(() => {
        setAnimals([
            { ano:1, a_name:'코코', a_profile: "", a_breed: "믹스", a_city: "서울" },
            { ano:2, a_name:'초코', a_profile: "", a_breed: "믹스", a_city: "경기" },
            { ano:3, a_name:'보리', a_profile: "", a_breed: "믹스", a_city: "인천" },
            { ano:4, a_name:'별이', a_profile: "", a_breed: "믹스", a_city: "부산" },
            { ano:5, a_name:'쫑이', a_profile: "", a_breed: "믹스", a_city: "대전" },
            { ano:6, a_name:'몽이', a_profile: "", a_breed: "믹스", a_city: "강원" },
            { ano:7, a_name:'루루', a_profile: "", a_breed: "믹스", a_city: "경기" },
            { ano:8, a_name:'넨네', a_profile: "", a_breed: "믹스", a_city: "대구" }
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
        <div>
            {/* 이거 이름 효진언니가 나중에 수정해준댕 */}
            <HeaderNoticeQna />
            <main style={{ background: "#fff", minHeight: "100vh" }}>
                <NavNoticeQna activeTab="animals" />
                <section>

                </section>
            </main>
        </div>
    );
}

export default FavoriteAnimals;