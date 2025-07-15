import logo from './logo.svg';
import './App.css';
import HospitalIntro from "./hospital/introduction/HospitalIntro";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/LoginForm";
import SignupHospitalForm from "./components/hospitals/SignupHospitalForm";
import SignupNuserForm from "./components/Nuser/SignupNuserForm";
import HospitalCheckPassword from "./pages/hospitals/HospitalCheckPassword";
import MyPage from "./pages/hospitals/MyPage";
import NmyPage from "./pages/Nuser/NmyPage";
import ChangenMyPage from "./pages/Nuser/ChangenMyPage";
import HospitalTime from "./pages/hospitals/HospitalTime";
import Booking from "./pages/hospitals/Booking";
import Notice from "./pages/hospitals/Notice";
import ChangeMyPage from "./pages/hospitals/ChangeMyPage";
import BookingDetails from "./pages/hospitals/BookingDetails";
import FindAccount from "./pages/FindAccount";
import BookingResult from "./pages/hospitals/BookingResult";
import Doctor from "./hospital/introduction/Doctor";
import ProtectedRoute from "./routes/ProtectedRoute";
import HospitalReservation from "./hospital/introduction/HospitalReservation";
import HospitalReview from "./hospital/introduction/HospitalReview";
import DeleteAccount from "./pages/hospitals/DeleteAccount";
import Home from "./pages/Home";
import NoticeList from './pages/notice/NoticeList';
import NoticeRead from './pages/notice/NoticeRead';
import NoticeWrite from './pages/notice/NoticeWrite';
import NoticeUpdate from './pages/notice/NoticeUpdate';
import TossCheckout from './toss/TossCheckout';
import TossSuccess from './toss/TossSuccess';
import TossFail from './toss/TossFail';
import MyPetChange from './pages/Nuser/MyPetChange';
import MyPetPage from './pages/Nuser/MyPetPage';
import BookingList from "./pages/hospitals/BookingList";
import BookingRead from "./pages/hospitals/BookingRead";
import MapPage from './pages/maps/MapPage';
import QnaList from "./pages/qna/QnaList";
import QnaRead from "./pages/qna/QnaRead";
import QnaWriteAnswer from "./pages/qna/QnaWriteAnswer";
import QnaWriteQuestion from "./pages/qna/QnaWriteQuestion";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import {useEffect} from "react";
import useAuthStore from "./stores/useAuthStore";
import MyPetWrite from './pages/Nuser/MyPetWrite';
import NMemberList from "./pages/normalMemberManage/NMemberList";
import HMemberList from "./pages/hospitalMemberManage/HMemberList";
import NdeleteAccount from './pages/Nuser/NdeleteAccount';
import NMemberRead from "./pages/normalMemberManage/NMemberRead";
import HMemberRead from "./pages/hospitalMemberManage/HMemberRead";
import FavoriteAnimals from "./pages/Nuser/FavoriteAnimals";
import AdoptionList from "./pages/adoptions/AdoptionList";
import CancelPaymentPage from './toss/CancelPaymentPage';
import ReservationWrite from './pages/reservation/ReservationWrite';
import MedicalReservation from './pages/reservation/MedicalReservation';
import BeautyReservation from './pages/reservation/BeautyReservation';
import ReservationMenu from "./pages/Nuser/ReservationMenu";
import ReviewWrite from "./pages/Nuser/ReviewWrite";


function App() {
  // 접근 가능 권한 확인 목적으로 넣은거 맞음! checkAuth랑 useEffect 있어야함!
  const checkAuth = useAuthStore(state => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="App">
      <Routes>
        {/* 루트페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<HospitalIntro />} />
        <Route path="/hospital-doctor" element={<Doctor />} />
        <Route path="/hospital-reservation" element={<ProtectedRoute><HospitalReservation /></ProtectedRoute>} />
        <Route path="/hospital-review" element={<HospitalReview />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/find-account" element={<FindAccount />} />
        <Route path="/hospital-signup" element={<SignupHospitalForm />} />
        {/*일반 회원 회원가입 */}
        <Route path='/nmembersignup' element={<SignupNuserForm />} />
        <Route path="/hospital-checkpassword" element={<HospitalCheckPassword />} />
        <Route path="/hospital-mypage" element={<MyPage />} />
        <Route path="/change-mypage" element={<ChangeMyPage />} />
        {/*일반 회원 마이페이지 */}
        <Route path='/nuser-mypage' element={<NmyPage />} />
        {/*일반 회원 회원 정보 변경 페이지 */}
        <Route path='/change-nmypage' element={<ChangenMyPage />} />
        {/*일반 회원 반려동물 정보 페이지 */}
        <Route path='/nuser-pet' element={<MyPetPage />} />
        {/*일반 회원 반려동물 정보 등록 페이지 */}
        <Route path='/nuser-petsave' element={<MyPetWrite />} />
        {/*일반 회원 반려동물 정보 변경 페이지 */}
        <Route path='/nuser-petchange' element={<MyPetChange />} />
        {/* 일반 회원 회원 탈퇴 페이지 */}
        <Route path='/nuser/delete' element={<NdeleteAccount />} />
        <Route path='/nuser-reservations' element={<ReservationMenu />} />
        {/* 일반 회원 리뷰 작성 페이지 */}
        <Route path='/review-write/:rno' element={<ReviewWrite />} />
        {/* 관심 유기동물 목록 페이지 */}
        <Route path='/nuser-adoption' element={<FavoriteAnimals />} />
        {/* 병원 회원 탈퇴 페이지 */}
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/hospital-time" element={<HospitalTime />} />
        <Route path="/booking" element={<Booking />} />
        {/* 예약 내역 페이지 */}
        <Route path="/booking/:rno" element={<BookingDetails />} />
        {/* 진료 결과 페이지 */}
        <Route path="/result/:rno" element={<BookingResult />} />
        {/* 진료 결과 작성 목록들 */}
        <Route path="/result-list" element={<BookingList />} />
        <Route path='/result-read' element={<BookingRead />} />
        <Route path="/hospital-notice" element={<Notice />} />
        {/* 홈페이지 공지사항 */}
        <Route path='/notices' element={<NoticeList />} />
        <Route path='/notices/notice' element={<NoticeRead />} />
        <Route path='/notices/write' element={<AdminRoute element={<NoticeWrite />} />} />
        <Route path='/notices/update' element={<NoticeUpdate />} />
        {/* 1:1 문의 */}
        <Route path='/qna' element={<PrivateRoute element={<QnaList />} />} />
        <Route path='/qna/question' element={<PrivateRoute element={<QnaRead />} />} />
        <Route path='/qna/write-answer' element={<QnaWriteAnswer />} />
        <Route path='/qna/write-question' element={<QnaWriteQuestion />} />
        {/* 일반 유저 관리 */}
        <Route path='/n-members' element={<AdminRoute element={<NMemberList />} />} />
        <Route path='/n-members/n-member' element={<AdminRoute element={<NMemberRead />} />} />
        {/* 병원 유저 관리 */}
        <Route path='/h-members' element={<AdminRoute element={<HMemberList />} />} />
        <Route path='/h-members/h-member' element={<AdminRoute element={<HMemberRead />} />} />
        {/* 토스 예시 페이지 */}
        <Route path='/toss/checkout' element={<TossCheckout />}/>
        <Route path='/toss/success' element={<TossSuccess />}/>
        <Route path='/toss/fail' element={<TossFail />}/>
        <Route path='/toss/cancel' element={<CancelPaymentPage />} />
        {/* 지도 페이지 */}
        <Route path='/search' element={<MapPage />} />
        {/* 예약 페이지 */}
        <Route path='/reservation/write' element ={<ReservationWrite />} />
        <Route path='/reservation/medical' element ={<MedicalReservation />} />
        <Route path='reservation/beauty' element={<BeautyReservation />} />
      </Routes>
    </div>
  );
}

export default App;
