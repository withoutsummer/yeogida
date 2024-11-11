import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Mytrip from "./pages/Mytrip";
import Editor from "./pages/Editor";
import Sharetrip from "./pages/Sharetrip";
import SharetripDetail from "./pages/SharetripDetail";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";
import FindIdSuccess from "./pages/FindIdSuccess";
import ResetPassword from "./pages/ResetPassword";
import TripDetailPage from "./pages/TripDetailPage";
import TripDetailEditorPage from "./pages/TripDetailEditorPage";

// 스크롤을 최상단으로 끌어올려주는 컴포넌트 생성
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const checkLoginStatus = async () => {
    try {
      const response = await axios.post(
        "https://www.yeogida.net/users/me",
        {},
        { withCredentials: true } // 쿠키 포함
      );
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response && error.response.status === 419) {
        try {
          await axios.post(
            "https://www.yeogida.net/users/refresh",
            {},
            { withCredentials: true } // 쿠키 포함
          );
          setIsAuthenticated(true);
        } catch (refreshError) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} /> {/* 상태 전달 */}
      <ScrollToTop /> {/* ScrollToTop 컴포넌트를 추가 */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* 메인 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 */}
        <Route path="/signup" element={<Signup />} /> {/* 회원가입 */}
        <Route path="/find/id" element={<FindId />} /> {/* 아이디 찾기 */}
        <Route path="/find/password" element={<FindPassword />} />{" "}
        {/* 비밀번호 찾기 */}
        {/* 아이디 찾기 성공 */}
        <Route path="/find/id/success" element={<FindIdSuccess />} />
        {/* 비밀번호 재설정 */}
        <Route path="/find/password/reset" element={<ResetPassword />} />
        {/* 나의 여행 */}
        <Route path="/mytrip" element={<Mytrip />} />
        {/*새 여행 만들기*/}
        <Route path="/mytrip/editor" element={<Editor />} />
        {/* 나의 여행 상세페이지 */}
        <Route path="/mytrip/:id" element={<TripDetailPage />} />
        {/* 나의 여행 상세페이지 수정 */}
        <Route path="/mytrip/editor/:id" element={<TripDetailEditorPage />} />
        {/* 여행 공유 */}
        <Route path="/shared-itineraries" element={<Sharetrip />} />
        {/* 여행 공유 상세*/}
        <Route path="/details/:id" element={<SharetripDetail />} />
        {/* 마이페이지 */}
        <Route path="/mypage/*" element={<Mypage />} />{" "}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
