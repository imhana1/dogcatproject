import styles from '../../pages/notice/Notice.module.css';
import useAuthStore from "../../stores/useAuthStore";


// 사용 방법: activeTab 넘겨주세요. 그러면 해당 탭에 있을 때 버튼 색이 바뀝니다.
// ex) <NavNoticeQna  activeTab='notice' />

function NavNoticeQna({activeTab}) {
  const {username, role} = useAuthStore();
  console.log("권한: ", role);
  return (
    <div className={styles.ntcQnaWrapper}>
      <nav>
        {/* 관리자만 */}
        {role === 'ROLE_ADMIN' && (
          <>
            <a type='button' href='/n-members'
               className={activeTab === 'nMemberManage' ? 'btn btn-secondary' : 'btn btn-dark'}> 일반 회원 관리</a>
            <a type='button' href='/h-members'
               className={activeTab === 'hMemberManage' ? 'btn btn-secondary' : 'btn btn-dark'}>병원 회원 관리</a>
          </>
        )}
        {/* 공통으로 보여줄거 */}
        <a type='button' href='/notices'
           className={activeTab === 'notice' ? 'btn btn-secondary' : 'btn btn-dark'}>공지사항</a>
        <a type='button' href='/qna' className={activeTab === 'qna' ? 'btn btn-secondary' : 'btn btn-dark'}>1:1 문의</a>
        <a type='button' href='/adoptions' className={activeTab === 'adoption' ? 'btn btn-secondary' : 'btn btn-dark'}>동물 보호소</a>
        {role === 'ROLE_USER' && (
          <>
            <a type='button' href='/nuser-pet' className={activeTab === 'myPet' ? 'btn btn-secondary' : 'btn btn-dark'}>나의 반려동물</a>
            <a type='button' href='/nuser-adoption'
               className={activeTab === 'favoriteAnimals' ? 'btn btn-secondary' : 'btn btn-dark'}>관심 유기동물 목록</a>
          </>
        )}
        {role === 'ROLE_HOSPITAL' && (
          <>
            <a type='button' href='/booking/:rno' className={activeTab === 'booking' ? 'btn btn-secondary' : 'btn btn-dark'}>예약 목록</a>
            <a type='button' href='/result-list'
               className={activeTab === 'result' ? 'btn btn-secondary' : 'btn btn-dark'}>진료 결과 목록</a>
          </>
        )}
      </nav>
    </div>
  )
}

export default NavNoticeQna