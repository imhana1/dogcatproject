import styles from '../../pages/notice/Notice.module.css';

function NavUserMenu({ activeTab }) {
    return (
        <div className={styles.ntcQnaWrapper}>
            <nav>
                <a type='button' href='/nuser-mypage' className={activeTab === 'nuser-mypage' ? 'btn btn-secondary' : 'btn btn-dark'}>마이페이지</a>
                <a type='button' href='/nuser-pet' className={activeTab === 'nuser-pet' ? 'btn btn-secondary' : 'btn btn-dark'}>나의 반려동물</a>
                <a type='button' href='/nuser-reservations' className={activeTab === 'nuser-reservations' ? 'btn btn-secondary' : 'btn btn-dark'}>예약내역</a>
                <a type='button' href='/qna' className={activeTab === 'qna' ? 'btn btn-secondary' : 'btn btn-dark'}>1:1문의</a>
                <a type='button' href='/notices' className={activeTab === 'notice' ? 'btn btn-secondary' : 'btn btn-dark'}>공지사항</a>
                <a type='button' href='/nuser-adoption' className={activeTab === 'adoption' ? 'btn btn-secondary' : 'btn btn-dark'}>관심 유기동물 목록</a>
            </nav>
        </div>
    );
}

export default NavUserMenu;
