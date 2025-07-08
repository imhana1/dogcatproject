import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import axios from 'axios';


const MyPetPage = () => {
    const navigate = useNavigate();
    const [petwrite, setPetwrite] = useState("펫 등록");
    const [input, setInput] = useState(petwrite);


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
      //  pprofUrl: ""    // 펫 프사 Url
    });

    useEffect(() => {
        const fetchPet = async() => {
            try {
                const res = await axios.get("http://localhost:8080/nuser-petchange", {withCredentials : true});
                setPetwrite(res.data);
                setInput(res.data);
            } catch (e) {
                console.error("펫 정보 불러오기 실패", e);
                alert("저장된 반려동물 정보가 없습니다. 반려동물 정보를 저장해주세요.");
            }
        }
        fetchPet();
    }, []);



    // useEffect(() => {
    //     const fetch = async()=> {
    //         try {
    //             const response = await axios.get("http://localhost:8080/nuser-petchange", {withCredentials:true});
    //             const data = response.data;
    //             setPet ({
    //                 pno: data.pno,        
    //                 ptype: data.ptype,      
    //                 pmichipe: data.pmichipe,   
    //                 pbreed: data.preed,     
    //                 pname: data.pname,      
    //                 pweghit: data.pweghit,   
    //                 page: data.page,       
    //                 palg: data.palg,       
    //                 pins: data.pins,       
    //                 pchronic: data.pchronic,   
    //                 psname: data.psname,           
    //              //   pprofUrl: data.pprof
    //             });
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     fetch();
    // }, []);

    const { username, resetUserInfo } = useAuthStore();
    console.log("username:", username);

    const checkAuth = useAuthStore(state => state.checkAuth);
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // 정보 수정
    const handleEdit = async() => {
        try {
            const params = new URLSearchParams();
            params.append("Pet", input);
            const response = await axios.put("http://localhost:8080/nuser-petchange", params, {
                withCredentials : true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            setPetwrite(input);
            alert('정보가 수정되었습니다.');
        } catch (e) {
            console.log(e)
            alert('정보를 수정하지 못했습니다.')
        }
    };

    // 삭제
    const handleDelete = () => {
        navigate("/delete-account");
    }    

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
                    {/* <div style={{ fontWeight: 500, marginBottom: "18px" }}>프로필 사진</div>
                    <div style={{ marginBottom: "32px" }}>{pet.pprof}</div> */}
                </div>
            </div>
        </div>
            {/* 오른쪽 */}
            <aside style={{ width: "180px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
                <button className="btn btn-outline-dark" onClick={handleEdit} style={{ marginBottom: "20px", width: "100%" }}>수정하기</button>
                <button className="btn btn-outline-dark" onClick={handleSave} style={{ marginBottom: "20px", width: "100%" }}>등록하기</button>
                <button className="btn btn-outline-danger" onClick={handleDelete} style={{ marginBottom: "20px", width: "100%" }}>반려동물 삭제</button>
            </aside>
    </div>
    );
};

export default MyPetPage;