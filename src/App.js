import React from "react";
import { useEffect, useState } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
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

const checkLoginStatus = async (navigate, setUser) => {
  try {
    const response = await fetch("/users/me", {
      method: "GET",
      credentials: "include", // 쿠키 포함
    });

    if (response.status === 200) {
      const data = await response.json();
      setUser(data.user); // 사용자 정보를 저장해 로그인 상태 유지
    } else if (response.status === 401) {
      // 액세스 토큰이 만료된 경우, 리프레시 토큰으로 갱신 시도
      const refreshResponse = await fetch("/users/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.status === 200) {
        // 새로운 액세스 토큰을 백엔드에서 다시 쿠키에 저장하도록 처리함
        checkLoginStatus(navigate, setUser); // 로그인 상태 재확인
      } else {
        navigate("/login"); // 로그인 필요
      }
    } else {
      navigate("/login");
    }
  } catch (error) {
    console.error("로그인 상태 확인 중 오류 발생:", error);
    navigate("/login");
  }
};

// 스크롤을 최상단으로 끌어올려주는 컴포넌트 생성
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // 사용자 상태 저장

  useEffect(() => {
    // 페이지 이동 시 로그인 상태 확인
    checkLoginStatus(navigate, setUser);
    window.scrollTo(0, 0);
  }, [pathname, navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
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
          <Route path="/mypage/*" element={<Mypage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
