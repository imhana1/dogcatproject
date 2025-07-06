import { Button } from 'bootstrap'
import React from 'react'
import styles from '../../pages/notice/Notice.module.css';


function NavNoticeQna({ activeTab }) {
  return (
    <div className={styles.ntcQnaWrapper}>
      <nav>
        <a type='button' className={activeTab === 'nMemberManage' ? 'btn btn-secondary' : 'btn btn-dark'} > 일반 회원 관리</a>
        <a type='button' className={activeTab === 'hMemberManage' ? 'btn btn-secondary' : 'btn btn-dark'}>병원 회원 관리</a>
        <a type='button' className={activeTab === 'notice' ? 'btn btn-secondary' : 'btn btn-dark'}>공지사항</a>
        <a type='button' className={activeTab === 'qna' ? 'btn btn-secondary' : 'btn btn-dark'}>1:1 문의</a>
      </nav>
    </div >
  )
}

export default NavNoticeQna