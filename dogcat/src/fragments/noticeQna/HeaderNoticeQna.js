import React, { useEffect } from 'react'
import styles from '../../pages/notice/Notice.module.css';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore'
import api from '../../utils/api';
import { hospitalMyPage, normalMyPage } from '../../utils/useMemberApi';

function HeaderNoticeQna() {
    // 필요한거 불러오기
    const navigate = useNavigate();
    const { username, role, checkAuth, resetUserInfo } = useAuthStore();

    // 컴포넌트 로딩되면 로그인 상태 확인
    useEffect(() => {
        checkAuth();
    }, [checkAuth])

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

    // 권한에 따라 다른 마이페이지 주소로 보내 (이름, 권한 체크는 이미 useEffect에서 했어)
    const goToMypage = async () => {
        if (username && role === 'ROLE_NORMAL') {
            navigate(`/hospital-mypage?username=${username}`);
        } else if (username && role === 'ROLE_HOSPITAL') {
            navigate(`/nuser-mypage?username=${username}`);  // 이거 임시주소야
        }
    }


    return (
        <div className={styles.ntcQnaWrapper}>
            <header>
                <img src="/dogcat_logo.png" alt="너도멍냥 동물병원" style={{ height: '100%' }} />
                <h1 className='header_title'>고객센터</h1>
                <div style={{ marginTop: 'auto' }}>
                    <p onClick={logInlogOutHandler} style={{ cursor: 'pointer' }}>
                        {username ? '로그아웃' : '로그인'}
                    </p>
                    {username && role === 'ROLE_NORMAL' && `<p>|</p>
                    <Link to="/search" style={{ color: "#333", textDecoration: "none" }}>
                            병원검색
                        </Link>`
                    }
                    {username && role === 'ROLE_HOSPITAL' && `<p>|</p>
                    <p onClick={()=>navigate(hospitalMyPage(username))}>마이페이지</p>`
                    }
                    <p>|</p>
                    <p onClick={() => navigate('/notices')} style={{ cursor: 'pointer' }}>고객센터</p>
                </div>
            </header>
        </div>
    )
}

export default HeaderNoticeQna