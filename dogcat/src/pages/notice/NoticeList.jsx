import React from 'react'
import HeaderNoticeQna from '../../fragments/HeaderNoticeQna'
import NavNoticeQna from '../../fragments/NavNoticeQna'
import AsideNoticeQna from '../../fragments/AsideNoticeQna'
import FooterNoticeQna from '../../fragments/FooterNoticeQna'
import styles from './Notice.module.css';

function NoticeList() {
    return (
        <div className={styles.ntcQnaWrapper}>
            <HeaderNoticeQna />
            <main>
                <NavNoticeQna activeTab="notice" /> {/* nav css 적용 속성 */}
                <section>

                </section >
                {/* 현재 디자인 보니까  aside 안쓸것같아서 일단 제외 */}
            </main>
            <FooterNoticeQna />
        </div>
    )
}

export default NoticeList