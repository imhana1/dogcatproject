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

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HospitalIntro />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<LoginPage />} />
            <Route path="/find-account" element={<FindAccount />} />
            <Route path="/hospital-signup" element={<SignupHospitalForm />} />
            <Route path="/hospital-checkpassword" element={<HospitalCheckPassword />} />
            <Route path="/hospital-mypage" element={<MyPage />} />
            <Route path="/change-mypage" element={<ChangeMyPage />} />
            <Route path="/hospital-time" element={<HospitalTime />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:id" element={<BookingDetails />} />
            <Route path="/notice" element={<Notice />} />
        </Routes>
    </div>
  );
}

export default App;
