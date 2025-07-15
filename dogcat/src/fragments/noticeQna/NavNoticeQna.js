import styles from '../../pages/notice/Notice.module.css';
import useAuthStore from "../../stores/useAuthStore";


// 사용 방법: activeTab 넘겨주세요. 그러면 해당 탭에 있을 때 버튼 색이 바뀝니다.
// ex) <NavNoticeQna  activeTab='notice' />

function NavNoticeQna({ activeTab }) {
  const {username, role} = useAuthStore();
  return (
    <div className={styles.ntcQnaWrapper}>
      <nav>
        {role === 'ADMIN' && (
          <>
        <a type='button' href='/n-members' className={activeTab === 'nMemberManage' ? 'btn btn-secondary' : 'btn btn-dark'} > 일반 회원 관리</a>
        <a type='button' href='/h-members' className={activeTab === 'hMemberManage' ? 'btn btn-secondary' : 'btn btn-dark'}>병원 회원 관리</a>
          </>
      )}
        <a type='button' href='/notices' className={activeTab === 'notice' ? 'btn btn-secondary' : 'btn btn-dark'}>공지사항</a>
        <a type='button' href='/qna' className={activeTab === 'qna' ? 'btn btn-secondary' : 'btn btn-dark'}>1:1 문의</a>
        {username && role === 'USER' && (
          <a type='button' href='/nuser-mypage' className={activeTab === 'nuser-mypage' ? 'btn btn-secondary' : 'btn btn-dark'}>마이페이지</a>
        )}
        {username && role === 'HOSPITAL' && (
          <a type='button' href='/hospital-mypage' className={activeTab === 'hospital-mypage' ? 'btn btn-secondary' : 'btn btn-dark'}>마이페이지</a>
        )}
        <a type='button' href='/adoptions' className={activeTab === 'adoption' ? 'btn btn-secondary' : 'btn btn-dark'}>동물 보호소</a>
      </nav>
    </div >
  )
}

export default NavNoticeQna