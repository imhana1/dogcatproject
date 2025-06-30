import React from 'react'
import HeaderNoticeQna from '../../fragments/HeaderNoticeQna'
import NavNoticeQna from '../../fragments/NavNoticeQna'
import AsideNoticeQna from '../../fragments/AsideNoticeQna'
import FooterNoticeQna from '../../fragments/FooterNoticeQna'
import styles from './Notice.module.css';

function NoticeList() {
    return (
        <div>
            <HeaderNoticeQna />
            <main>
                <NavNoticeQna />
                <section>

                </section>
                <AsideNoticeQna />
            </main>
            <FooterNoticeQna />
        </div>
    )
}

export default NoticeList