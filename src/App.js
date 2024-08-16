import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mytrip from './pages/Mytrip';
import Sharetrip from './pages/Sharetrip';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} /> {/* 메인 */}
                    <Route path="/login" element={<Login />} /> {/* 나의여행 */}
                    <Route path="/history" element={<Signup />} />{' '}
                    {/* 여행공유 */}
                    <Route path="/mytrip" element={<Mytrip />} />{' '}
                    {/* 마이페이지 */}
                    <Route path="/sharetrip" element={<Sharetrip />} />{' '}
                    {/* 마이페이지 */}
                    <Route path="/mypage" element={<Mypage />} />{' '}
                    {/* 마이페이지 */}
                    <Route path="/signup" element={<Signup />} />{' '}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
