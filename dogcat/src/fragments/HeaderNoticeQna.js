import React from 'react'
import styles from '../pages/notice/Notice.module.css';

function HeaderNoticeQna() {
    return (
        <div className={styles.ntcQnaWrapper}>
            <header>
                <img src="/dogcat_logo.png" alt="너도멍냥 동물병원" style={{ height: '100%' }} />
                <h1 className='header_title'>고객센터</h1>
                <div style={{ marginTop: 'auto' }}>
                    <p>로그인</p>
                    <p>|</p>
                    <p>고객센터</p>
                </div>
            </header>
        </div>
    )
}

export default HeaderNoticeQna