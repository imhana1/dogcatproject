import React from 'react';

const LikeList = () => {
    return (
        <form>
            <nav>
                <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 10, padding: 0, fontSize: "18px" }}>
                    <li>
                        <Link to="/nuser-mypage" style={{ textDecoration: "none", color: "black" }}>내 정보 보기</Link>
                    </li>
                    <li>
                        <Link to="/nuser-pet" style={{ textDecoration: "none" , color: "black" }} >나의 반려동물</Link>
                    </li>
                    <li>
                        <Link to="/nuser-booking" style={{ textDecoration: "none" , color: "black" }}>예약 내역</Link>
                    </li>
                    <li>
                        <Link to="/nuser-qna" style={{ textDecoration: "none", color: "black" }}>문의사항</Link>
                    </li>
                    <li>
                        <Link to="/nuser-adoption" style={{ textDecoration: "none", color: "black" }}>유기동물 관심 목록</Link>
                    </li>
                        <button type="submit" className="btn btn-light">로그아웃</button>
                </ul>
            </nav>
                <div style={{ display: "flex", marginTop: "38px" }}>
            {/* 왼쪽 */}
            <div style={{ flex: 1, background: "#fff", border: "1.7px solid #222", borderRadius: "20px", padding: "60px 60px 58px 58px", marginRight: "54px" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "42px", textAlign: "center" }}>
                <span>(사업자 회원)</span>님 회원정보
            </div>
            <div style={{ display: "flex", gap: "38px" }}>
                {/* 왼쪽 */}
                <div style={{ minWidth: "220px" }}>
                <div style={{ fontWeight: 500, marginBottom: "18px" }}>병원이름</div>
                <div style={{ marginBottom: "32px" }}>{huser.hospitalName}</div>
                <div style={{ fontWeight: 500, marginBottom: "18px" }}>주소</div>
                <div>{huser.address}</div>

                </div>
                {/* 오른쪽 */}
                <div style={{ minWidth: "220px" }}>
                <div style={{ fontWeight: 500, marginBottom: "18px" }}>아이디</div>
                <div style={{ marginBottom: "22px" }}>{huser.id}</div>
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>이름</div>
                <div style={{ marginBottom: "18px" }}>{huser.ceo}</div>
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>생년월일</div>
                <div style={{ marginBottom: "18px" }}>{huser.birth}</div>
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>전화번호</div>
                <div style={{ marginBottom: "18px" }}>{huser.phone}</div>
                <div style={{ fontWeight: 500, marginBottom: "10px" }}>Email</div>
                <div>{huser.email}</div>
                </div>
            </div>
            </div>
            {/* 오른쪽 */}
            <aside style={{ width: "180px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
            <div style={{ marginBottom: "30px" }}>회원정보변경</div>
            <button className="btn btn-outline-dark" onClick={handleEdit} style={{ marginBottom: "20px", width: "100%" }}>수정하기</button>
            <button className="btn btn-outline-danger" onClick={handleDelete} style={{ marginBottom: "20px", width: "100%" }}>회원탈퇴</button>
            </aside>
        </div>
    </form>
    );
};

export default LikeList;