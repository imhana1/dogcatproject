import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import axios from 'axios';


const MyPetPage = () => {
    const navigate = useNavigate();

    const [pet, setPet] = useState ([]);

    // 불러올 데이터
    useEffect(() => {
        const fetchPet = async() => {
            try {
                const response = await axios.get("http://localhost:8080/nuser-pet", {withCredentials : true});
                const data = response.data;
                console.log(data);
                setPet(data)
            } catch (e) {
                console.error("펫 정보 불러오기 실패", e);
                alert("저장된 반려동물 정보가 없습니다. 반려동물 정보를 저장해주세요.");
            }
        }
        fetchPet();
    }, []);

    // 로그인 정보 저장
    const { username, resetUserInfo } = useAuthStore();
    console.log("username:", username);

    const checkAuth = useAuthStore(state => state.checkAuth);
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // 정보 수정
    const handleEdit = () => {
        navigate("/nuser-petchange");
    };

    // 삭제
    const handleDelete = async (pno) => {
        const confirmDelete = window.confirm("반려동물을 삭제하시겠습니까?");
        if(!confirmDelete)
            return; // 아니요 누르면 리턴
        try {
            await axios.delete(`http://localhost:8080/nuser-pet/${pno}`, {withCredentials: true});
            alert('삭제 완료');
            setPet(prev => prev.filter(item => item.pno !== pno));
        } catch (error) {
            console.error("오류 발생 :", error);
            alert("삭제 실패")
        }
    };    

    // 등록
    const handleSave = () => {
        navigate("/nuser-petsave");
    }

    return (
        <div>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                    <div style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#1c140d" }}>너도멍냥</div>
                    <nav>
                      <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0, padding: 0 }}>
                        <li><Link to="/nuser-mypage" style={{ color: "#333", textDecoration: "none" }}>내 정보 보기</Link></li>
                        <li><Link to="/nuser-pet" style={{ color: "#333", textDecoration: "none" }}><span style={{ color: "#ff5f2e", fontWeight: "bold" }}>나의 반려동물</span></Link></li>
                        <li><Link to="/nuser-booking" style={{ color: "#333", textDecoration: "none" }}>예약내역</Link></li>
                        <li><Link to="/nuser-qna" style={{ color: "#333", textDecoration: "none" }}>문의사항</Link></li>
                        <li><Link to="/nuser-adoption" style={{ color: "#333", textDecoration: "none" }}>유기동물 관심 목록</Link></li>
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
                <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "20px" }}>
            {pet.length === 0 && <p>등록된 반려동물이 없습니다.</p>}

            {pet.map((pet) => (
                <div key={pet.pno} style={{ display: "flex", gap: "38px", border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
                {/* 왼쪽 */}
                <div style={{ minWidth: "220px" }}>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>프로필 사진</div>
                            <div style={{ marginBottom: "32px" }}>
                                {pet.pprof && pet.pprof.startsWith("data:image") ? (
                                    <img src={pet.pprof} alt="펫 프로필" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ccc"}}/>
                                ) : (
                                    <span>프로필 없음</span>
                                )}
                            </div>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>동물번호</div>
                    <div style={{ marginBottom: "32px" }}>{pet.pno}</div>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>이름</div>
                    <div style={{ marginBottom: "32px" }}>{pet.pname}</div>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>종류</div>
                    <div style={{ marginBottom: "32px" }}>{pet.ptype}</div>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>품종</div>
                    <div style={{ marginBottom: "32px" }}>{pet.pbreed}</div>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>내장칩 유무</div>
                    <div style={{ marginBottom: "32px" }}>{pet.pmichipe}</div>
                </div>

                {/* 오른쪽 */}
                <div style={{ minWidth: "220px" }}>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>몸무게</div>
                    <div style={{ marginBottom: "32px" }}>{pet.pweight}</div>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>생년월일</div>
                    <div style={{ marginBottom: "22px" }}>{pet.page}</div>
                    <div style={{ fontWeight: 500, marginBottom: "10px", fontWeight: "bold" }}>알러지 유무</div>
                    <div style={{ marginBottom: "18px" }}>{pet.palg}</div>
                    <div style={{ fontWeight: 500, marginBottom: "10px", fontWeight: "bold" }}>펫보험</div>
                    <div style={{ marginBottom: "18px" }}>{pet.pins}</div>
                    <div style={{ fontWeight: 500, marginBottom: "10px", fontWeight: "bold" }}>선천적 지병</div>
                    <div style={{ marginBottom: "18px" }}>{pet.pchronic}</div>
                    <div style={{ fontWeight: 500, marginBottom: "18px", fontWeight: "bold" }}>수술 이력</div>
                    <div style={{ marginBottom: "32px" }}>{pet.psname}</div>             
                </div>
                {/* 버튼 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginLeft: "20px", minWidth: "100px"}}>
                        <button className="btn btn-outline-dark" onClick={() => handleEdit(pet.pno)} style={{ width: "100%" }}>
                            수정하기
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(pet.pno)} style={{ width: "100%" }}>
                            삭제하기
                        </button>
                    </div>
                </div>
            ))}
            <button className="btn btn-outline-dark" onClick={() => handleSave(pet.pno)} style={{ width: "100%" }}>
                            등록하기
                        </button>
        </div>
    </div>
    );
};

export default MyPetPage;