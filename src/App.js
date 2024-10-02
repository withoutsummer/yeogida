import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} /> {/* 메인 */}
                    <Route path="/login" element={<Login />} /> {/* 로그인 */}
                    <Route path="/signup" element={<Signup />} />   {/* 회원가입 */}
                    <Route path="/find/id" element={<FindId />} />  {/* 아이디 찾기 */}
                    <Route path="/find/password" element={<FindPassword />} />  {/* 비밀번호 찾기 */}
                    {/* 아이디 찾기 성공 */}
                    <Route
                        path="/find/id/success"
                        element={<FindIdSuccess />}
                    />
                    {/* 비밀번호 재설정 */}
                    <Route
                        path="/find/password/reset"
                        element={<ResetPassword />}
                    />
                    {/* 나의 여행 */}
                    <Route path="/mytrip" element={<Mytrip />} />
                    {/*새 여행 만들기*/}
                    <Route path="/mytrip/editor" element={<Editor />} />
                    {/* 나의 여행 상세페이지 */}
                    <Route path="/sharetrip" element={<Sharetrip />} />
                    {/* 여행 공유 */}
                    <Route path="/mytrip/:id" element={<TripDetailPage />} />
                    {/* 여행 공유 상세*/}
                    <Route path="/details/:id" element={<SharetripDetail />} />
                    {/* 마이페이지 */}
                    <Route path="/mypage/*" element={<Mypage />} />{' '}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}
export default App;
