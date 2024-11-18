import React, { useEffect, useState } from 'react';
import { useLocation, BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mytrip from './pages/Mytrip';
import Editor from './pages/Editor';
import Sharetrip from './pages/Sharetrip';
import SharetripDetail from './pages/SharetripDetail';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import FindIdSuccess from './pages/FindIdSuccess';
import ResetPassword from './pages/ResetPassword';
import TripDetailPage from './pages/TripDetailPage';
import TripDetailEditorPage from './pages/TripDetailEditorPage';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [accessToken, setAccessToken] = useState(null);
    // const location = useLocation();

    // const checkLoginStatus = async () => {
    //     if (!accessToken) {
    //         console.log('No access token available');
    //         setIsAuthenticated(false);
    //         return;
    //     }

    //     try {
    //         console.log('Sending request to /users/me...');
    //         const response = await fetch('https://www.yeogida.net/users/me', {
    //             method: 'POST',
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //             credentials: 'include', // 쿠키 포함
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         console.log('Login status check successful:', data);
    //         setIsAuthenticated(true);
    //     } catch (error) {
    //         console.error('Error in /users/me request:', error.message);

    //         if (error.message.includes('status: 419')) {
    //             console.log('Token expired, attempting to refresh token...');
    //             refreshAccessToken();
    //         } else {
    //             console.log('User is not authenticated.');
    //             setIsAuthenticated(false);
    //         }
    //     }
    // };

    // const refreshAccessToken = async () => {
    //     try {
    //         const response = await fetch(
    //             'https://www.yeogida.net/users/refresh',
    //             {
    //                 method: 'POST',
    //                 credentials: 'include',
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         const newAccessToken = data.accessToken;
    //         console.log('Token refresh successful:', newAccessToken);
    //         setAccessToken(newAccessToken);
    //         setIsAuthenticated(true);
    //     } catch (refreshError) {
    //         console.error(
    //             'Error in /users/refresh request:',
    //             refreshError.message
    //         );
    //         setIsAuthenticated(false);
    //     }
    // };

    // useEffect(() => {
    //     console.log('Location changed:', location.pathname);
    //     if (accessToken) {
    //         checkLoginStatus();
    //     } else {
    //         refreshAccessToken(); // 토큰이 없으면 리프레시 시도
    //     }
    // }, [location, accessToken]);

    return (
        <div className="App">
            {/* <Header isAuthenticated={isAuthenticated} /> 상태 전달 */}
            <Header /> {/* 상태 전달 */}
            <ScrollToTop /> {/* ScrollToTop 컴포넌트를 추가 */}
            <Routes>
                <Route path="/" element={<Home />} /> {/* 메인 */}
                <Route path="/login" element={<Login />} /> {/* 로그인 */}
                <Route path="/signup" element={<Signup />} /> {/* 회원가입 */}
                <Route path="/find/id" element={<FindId />} />{' '}
                {/* 아이디 찾기 */}
                <Route path="/find/password" element={<FindPassword />} />{' '}
                {/* 비밀번호 찾기 */}
                <Route
                    path="/find/id/success"
                    element={<FindIdSuccess />}
                />{' '}
                {/* 아이디 찾기 성공 */}
                <Route
                    path="/find/password/reset"
                    element={<ResetPassword />}
                />{' '}
                {/* 비밀번호 재설정 */}
                <Route path="/mytrip" element={<Mytrip />} /> {/* 나의 여행 */}
                <Route path="/mytrip/editor" element={<Editor />} />{' '}
                {/* 새 여행 만들기 */}
                <Route path="/mytrip/:id" element={<TripDetailPage />} />{' '}
                {/* 나의 여행 상세페이지 */}
                <Route
                    path="/mytrip/editor/:id"
                    element={<TripDetailEditorPage />}
                />{' '}
                {/* 나의 여행 상세페이지 수정 */}
                <Route
                    path="/shared-itineraries"
                    element={<Sharetrip />}
                />{' '}
                {/* 여행 공유 */}
                <Route path="/details/:id" element={<SharetripDetail />} />{' '}
                {/* 여행 공유 상세*/}
                <Route path="/mypage/*" element={<Mypage />} />{' '}
                {/* 마이페이지 */}
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
