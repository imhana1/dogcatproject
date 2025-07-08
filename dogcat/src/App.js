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
import MyPetWrite from './pages/Nuser/MyPetWrite';
import FindIdAccount from "./pages/FindIdAccount";

function App() {
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
        <Route path="/find-id" element={<FindIdAccount />} />
        <Route path="/find-account" element={<FindAccount />} />
        <Route path="/hospital-signup" element={<SignupHospitalForm />} />
        {/*일반 회원 회원가입 */}
        <Route path='/nmembersignup' element={<SignupNuserForm />} />
        <Route path="/hospital-checkpassword" element={<HospitalCheckPassword />} />
        <Route path="/hospital-mypage" element={<MyPage />} />
        <Route path="/change-mypage" element={<ChangeMyPage />} />
        {/*일반 회원 마이페이지 */}
        <Route path='/nuser-mypage' element={<NmyPage />} />
        {/*일반 회원 반려동물 정보 페이지 */}
        <Route path='/nuser-pet' element={<MyPetPage />} />
        {/*일반 회원 반려동물 정보 등록 페이지 */}
        <Route path='/nuser-petsave' element={<MyPetWrite />} />
        {/*일반 회원 반려동물 정보 변경 페이지 */}
        <Route path='/nuser-petsave' element={<MyPetWrite />} />
        <Route path='/nuser-petchange' element={<MyPetChange />} />
        {/*일반 회원 회원 정보 변경 페이지 */}
        <Route path='/change-nmypage' element={<ChangenMyPage />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/hospital-time" element={<HospitalTime />} />
        <Route path="/booking" element={<Booking />} />
        {/* 예약 내역 페이지 */}
        <Route path="/booking/:id" element={<BookingDetails />} />
        {/* 진료 결과 페이지 */}
        <Route path="/result/:id" element={<BookingResult />} />
        {/* 진료 결과 작성 목록들 */}
        <Route path="/result-list" element={<BookingList />} />
        <Route path='/result-read' element={<BookingRead />} />
        <Route path="/hospital-notice" element={<Notice />} />
        {/* 홈페이지 공지사항 */}
        <Route path='/notices' element={<NoticeList />} />
        <Route path='/notices/notice' element={<NoticeRead />} />
        <Route path='/notices/write' element={<NoticeWrite />} />
        <Route path='/notices/update' element={<NoticeUpdate />} />
        {/* 1:1 문의 */}
        <Route path='/qna' element={<QnaList />} />
        <Route path='/qna/question' element={<QnaRead />} />
        <Route path='/qna/write-answer' element={<QnaWriteAnswer />} />
        {/* 토스 예시 페이지 */}
        <Route path='/toss/checkout' element={<TossCheckout />}/>
        <Route path='/toss/success' element={<TossSuccess />}/>
        <Route path='/toss/fail' element={<TossFail />}/>
        {/* 지도 페이지 */}
        <Route path='/search' element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
