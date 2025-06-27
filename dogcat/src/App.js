import logo from './logo.svg';
import './App.css';
import HospitalIntro from "./hospital/introduction/HospitalIntro";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/LoginForm";
import SignupHospitalForm from "./components/hospitals/SignupHospitalForm";
import HospitalCheckPassword from "./pages/hospitals/HospitalCheckPassword";
import MyPage from "./pages/hospitals/MyPage";
import HospitalTime from "./pages/hospitals/HospitalTime";
import Booking from "./pages/hospitals/Booking";
import Notice from "./pages/hospitals/Notice";
import ChangeMyPage from "./pages/hospitals/ChangeMyPage";
import BookingDetails from "./pages/hospitals/BookingDetails";
import FindAccount from "./pages/FindAccount";
import BookingResult from "./pages/hospitals/BookingResult";
import Doctor from "./hospital/introduction/Doctor";
import ProtectedRoute from "./routes/ ProtectedRoute";
import HospitalReservation from "./hospital/introduction/HospitalReservation";
import HospitalReview from "./hospital/introduction/HospitalReview";
import DeleteAccount from "./pages/hospitals/DeleteAccount";
import Home from "./pages/Home";

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
            <Route path="/find-account" element={<FindAccount />} />
            <Route path="/hospital-signup" element={<SignupHospitalForm />} />
            <Route path="/hospital-checkpassword" element={<HospitalCheckPassword />} />
            <Route path="/hospital-mypage" element={<MyPage />} />
            <Route path="/change-mypage" element={<ChangeMyPage />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/hospital-time" element={<HospitalTime />} />
            <Route path="/booking" element={<Booking />} />
            {/* 예약 내역 페이지 */}
            <Route path="/booking/:id" element={<BookingDetails />} />
            {/* 진료 결과 페이지 */}
            <Route path="/result/:id" element={<BookingResult />} />
            <Route path="/hospital-notice" element={<Notice />} />
        </Routes>
    </div>
  );
}

export default App;
