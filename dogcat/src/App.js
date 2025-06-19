import logo from './logo.svg';
import './App.css';
import HospitalIntro from "./hospital/introduction/HospitalIntro";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/LoginForm";
import SignupHospitalForm from "./components/SignupHospitalForm";

function App() {
  return (
    <div className="App">
        {/*<LoginPage />*/}
        <Routes>
            <Route path="/" element={<HospitalIntro />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<LoginPage />} />
            <Route path="/hospital-signup" element={<SignupHospitalForm />} />
        </Routes>
    </div>
  );
}

export default App;
