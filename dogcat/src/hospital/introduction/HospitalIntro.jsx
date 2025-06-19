import React from 'react';
import { FcClock } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import { FcHome } from "react-icons/fc";

// 인텔리제이 rsf 리액트 함수
function HospitalIntro() {
    return (
        <div>
            <div className="header">
                <ul className="name">
                    <li>병원 소개</li>
                    <li>의료진 소개</li>
                    <li>예약</li>
                </ul>
                <button id="member">로그인</button>
            </div>
            <session>
                <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAzMDlfMTQ5%2FMDAxNTIwNTgzMTgxNDM2.2o2AEfuH_8KKkFLW1kE81MxiH7K3Zl9nSAg79aENcmkg.rteNAnE9Kg_sd5K8Y6mbSuxwDvWYsTWqpFuTRQ1fhRgg.JPEG.forestamc%2F20098810.jpg&type=sc960_832"
                     alt="병원 진료 사진" className="intro-image" />
                <b>반려동물과 가장 가까운 친구로 따뜻한 사랑을 담아 진료하겠습니다</b>
            </session>
            <session>
                <ul>
                    <FcClock size="40" />
                    <li>평일 : am 09:00 ~ pm 08:00</li>
                    <li>토요일 : am 09:00 ~ pm 08:00</li>
                    <li>일요일 휴무</li>
                </ul>
                <ul>
                    <FcPhone size="40" />
                    <li>032-123-4567</li>
                </ul>
                <ul>
                    <FcHome size="40" />
                    <li>인천 미추홀구 매소홀로488번길 6-32 태승빌딩 5층</li>
                </ul>
            </session>
        </div>
    );
}

export default HospitalIntro;