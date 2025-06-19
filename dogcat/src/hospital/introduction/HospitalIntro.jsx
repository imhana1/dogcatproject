import React from 'react';
import { FcClock } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import {Link} from "react-router-dom";

// 인텔리제이 rsf 리액트 함수
function HospitalIntro() {
    return (
        <div>
            <div className="header">
                <div className="menu-wrap"/>
                <ul className="name">
                    <li>병원 소개</li>
                    <li>의료진 소개</li>
                    <li>예약</li>
                </ul>
                <Link to="/login">
                    <button id="member" type="button" className="btn btn-link">로그인</button>
                </Link>
            </div>
            {/* 사진 옆으로 움직이게 하기 매 3초마다 */}
            <div id="demo" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAyMTVfMzAg%2FMDAxNTE4NzA0NjUyMDUz.-kxqPB4ib6skm4t1viLvEDf4NGUm-qdWGxAKrxIWrfQg.q3y5NRRzGkXDqDt2hhOEwEIsnMxfrOXsPNxlUw5Zj1wg.JPEG.bairon02%2F190213_merci_A_0118.JPG&type=sc960_832"
                             alt="병원 내부 사진" className="d-block" style={{width:1400, height:500}} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTExMjlfMTM0%2FMDAxNTc1MDE4MDMzMzg0.5ROZW3NYgIVPLjvV37x8ntSn3x5F0vMoc-qDQyxtbZgg.amfx6qXkC5qQYK_i-Ju3gEAZPEmYginEh9cPca_f4Acg.JPEG.seochoan%2FIMG_5985.JPG&type=sc960_832"
                             alt="진료 사진" className="d-block" style={{width:1400, height:500}}/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAzMjNfMjU4%2FMDAxNTUzMzI0NTYxMjMy.oAaAUqw25nZYH3Gms35Z3uX3M2G74OxB6lTqwXssTr0g.53KoJ92cz-GSfLOOsA4N2YgkyRADrifaKiXdbt87k4gg.JPEG.seochoan%2FIMG_1359.JPG&type=sc960_832"
                             alt="진료 후 사진" className="d-block" style={{width:1400, height:500}}/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
            <h2>반려동물과 가장 가까운 친구로 따뜻한 사랑을 담아 진료하겠습니다</h2>
            <div className="information">
                <ul>
                    <FcClock size="40"/>
                    <li>평일 : am 09:00 ~ pm 08:00</li>
                    <li>토요일 : am 09:00 ~ pm 08:00</li>
                    <li>일요일 휴무</li>
                </ul>
                <ul>
                    <FcPhone size="40"/>
                    <li>032-123-4567</li>
                </ul>
                <ul>
                    <FcHome size="40"/>
                    <li>인천 미추홀구 매소홀로488번길 6-32 태승빌딩 5층</li>
                </ul>
            </div>
            <button type="button" className="btn btn-outline-dark" style={{position: "fixed", bottom: "30px", right: "30px", zIndex: 1000}}>리뷰보기</button>
        </div>
    );
}

export default HospitalIntro;