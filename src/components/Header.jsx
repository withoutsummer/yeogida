import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/yeogida_logo.png';
import Bell from '../components/Bell';
import Button from '../components/Btn';
import CommonModal from '../components/CommonModal';
import { useAuth } from '../context/AuthContext'; // AuthContext 사용
import { logoutUser } from '../api/Logout/LogoutApi';

const HeaderStyle = styled.div`
    position: fixed; /* 고정된 위치 설정 */
    top: 0; /* 화면 상단에 위치 */
    left: 0; /* 화면 좌측에 위치 */
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    z-index: 1000; /* 다른 콘텐츠보다 위에 표시 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
    img {
        cursor: pointer;
    }
`;

const HeaderContainer = styled.div`
    display: flex; /* 플렉스 박스 설정 */
    flex-direction: row; /* 가로 정렬 설정 */
    justify-content: center;
    align-items: center;
    display: flex;
    width: 1280px;
    height: 70px;
    flex-shrink: 0;
`;

const NavBox = styled.div`
    width: auto;
    height: 35px;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: 100px; /* Logo와의 간격 조절 */
    color: #000;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const Btnstyle = styled.div`
    padding: 0 10px;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
`;

const MyPageContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;

    &:hover {
        color: #59abe6;
    }
`;

const StyledDropdown = styled.div`
    width: 270px;
    position: absolute;
    top: 30px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 10px 0;
`;

const DropdownMenu = styled.div`
    width: 100%;
    font-size: 16px;
    padding: 20px 0 20px 20px;
    box-sizing: border-box;
    color: black;
    cursor: pointer;

    &:hover {
        background-color: #f6f6f6;
        font-weight: bold;
    }
`;

export const Nav = styled.nav`
    ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0; /* ul의 기본 margin 제거 */
    }
    li {
        width: 80px;
        margin-left: 0; /* li의 왼쪽 margin 제거 */
        padding: 8px 25px;
        cursor: pointer;
        color: #333333;
    }
    li:hover {
        color: #59abe6;
    }
`;

export default function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const [viewDropdown, setViewDropdown] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [navigateTo, setNavigateTo] = useState('');
    const [modalType, setModalType] = useState(1); // 기본 모달 타입 설정

    // 토큰 유효성 확인
    // const isTokenValid = (token) => {
    //     try {
    //         const payload = JSON.parse(atob(token.split('.')[1])); // JWT 디코딩
    //         const exp = payload.exp * 1000; // 만료 시간 (ms 단위)
    //         return Date.now() < exp; // 현재 시간과 비교
    //     } catch (error) {
    //         console.error('토큰 파싱 중 오류 발생:', error);
    //         return false;
    //     }
    // };

    // 초기 로그인 상태 확인
    // useEffect(() => {
    //     const checkLoginStatus = () => {
    //         const token = localStorage.getItem('token');
    //         console.log('토큰 확인:', token);
    //         if (token && isTokenValid(token)) {
    //             console.log('토큰 유효함. 로그인 상태로 전환.');
    //             setIsLoggedIn(true);
    //         } else {
    //             console.log('토큰 없음 또는 만료. 로그아웃 상태로 전환.');
    //             setIsLoggedIn(false);
    //             localStorage.removeItem('token'); // 만료된 토큰 제거
    //         }
    //     };

    //     // 로그인 상태 확인
    //     checkLoginStatus();

    //     // 로컬 스토리지 변경 감지
    //     window.addEventListener('storage', checkLoginStatus);

    //     return () => {
    //         window.removeEventListener('storage', checkLoginStatus);
    //     };
    // }, []);

    // 로그아웃 확인 모달 열기
    const handleLogout = () => {
        setModalMessage('로그아웃 하시겠습니까?');
        setModalType(2); // "예", "아니요" 버튼 표시
        setIsModalOpen(true);
    };

    // 로그아웃 로직
    const confirmLogout = async () => {
        try {
            const result = await logoutUser(); // API 호출
            if (result.status === 200) {
                console.log('로그아웃 성공');
                logout(); // AuthContext의 logout 함수 호출
                navigate('/'); // 메인 페이지로 리다이렉트
            } else {
                console.error('로그아웃 실패:', result.error);
                setModalMessage('로그아웃 실패: 서버 오류가 발생했습니다.');
                setModalType(1);
                setIsModalOpen(true); // 오류 메시지 모달 열기
            }
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            setModalMessage('서버 오류가 발생했습니다. 다시 시도해 주세요.');
            setIsModalOpen(true); // 오류 메시지 모달 열기
        }
    };

    //모달
    const closeModal = () => setIsModalOpen(false);

    const handleModalConfirm = () => {
        if (modalType === 1 && navigateTo) {
            // 타입 1: 페이지 전환
            closeModal();
            navigate(navigateTo); // 페이지 전환
        } else if (modalType === 2) {
            // 타입 2: 로그아웃
            confirmLogout();
        } else {
            console.warn('정의되지 않은 modalType입니다:', modalType);
        }
    };

    const handleProtectedNavigation = (path) => {
        console.log('로그인 상태:', isLoggedIn, '이동 경로:', path);
        if (isLoggedIn) {
            navigate(path);
        } else {
            setModalMessage('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
            setModalType(1);
            setNavigateTo('/login'); // 로그인 페이지로 리다이렉트
            setIsModalOpen(true); // 모달 열기
        }
    };

    useEffect(() => {
        let timeout;
        if (!isHovered && viewDropdown) {
            timeout = setTimeout(() => setViewDropdown(false), 300);
        } else if (isHovered) {
            setViewDropdown(true);
            if (timeout) clearTimeout(timeout);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [isHovered, viewDropdown]);

    return (
        <header>
            <HeaderStyle>
                <HeaderContainer>
                    <span className="logo" onClick={() => navigate('/')}>
                        <img
                            style={{ width: '111px', height: '50px' }}
                            src={logo}
                            alt="로고"
                        />
                    </span>
                    <NavBox>
                        <Nav>
                            <ul>
                                <li
                                    onClick={() =>
                                        handleProtectedNavigation('/mytrip')
                                    }
                                >
                                    나의여행
                                </li>
                                <li
                                    onClick={() =>
                                        navigate('/shared-itineraries')
                                    }
                                >
                                    여행공유
                                </li>
                                <li>
                                    {/* 원래 navigate('/login') 인데 당분간 로그인 체크 안하니까 바로 마이페이지로 넘어가도록 임시 수정함 */}
                                    <MyPageContainer
                                        tabIndex={-1}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        마이페이지
                                        {/* <FaChevronDown style={{ marginLeft: '5px' }} /> */}
                                        {viewDropdown && (
                                            <StyledDropdown>
                                                <DropdownMenu
                                                    onClick={() =>
                                                        handleProtectedNavigation(
                                                            '/mytrip/userinfo'
                                                        )
                                                    }
                                                >
                                                    회원정보 관리
                                                </DropdownMenu>
                                                <DropdownMenu
                                                    onClick={() =>
                                                        handleProtectedNavigation(
                                                            '/mytrip/friend'
                                                        )
                                                    }
                                                >
                                                    친구목록
                                                </DropdownMenu>
                                                <DropdownMenu
                                                    onClick={() =>
                                                        handleProtectedNavigation(
                                                            '/mytrip/scrap'
                                                        )
                                                    }
                                                >
                                                    스크랩
                                                </DropdownMenu>
                                            </StyledDropdown>
                                        )}
                                    </MyPageContainer>
                                </li>
                            </ul>
                        </Nav>
                    </NavBox>
                    <Bell />
                    {/* Other Navigation Elements */}
                    <Btnstyle>
                        {isLoggedIn ? (
                            <Button
                                onClick={handleLogout} // 로그아웃 버튼
                                width="110px"
                                height="50px"
                                borderColor="#59abe6"
                                backgroundColor="#59abe6"
                                hoverBackgroundColor="#0D90EE"
                                hoverBorderColor="#0D90EE"
                                borderRadius="10px"
                                fontSize="16px"
                                text="로그아웃"
                            />
                        ) : (
                            <Button
                                onClick={() => navigate('/login')} // 로그인 버튼
                                width="110px"
                                height="50px"
                                borderColor="#59abe6"
                                backgroundColor="#59abe6"
                                hoverBackgroundColor="#0D90EE"
                                hoverBorderColor="#0D90EE"
                                borderRadius="10px"
                                fontSize="16px"
                                text="로그인"
                            />
                        )}
                    </Btnstyle>
                    <CommonModal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        title={modalMessage}
                        type={modalType} // 모달 타입 설정
                        onConfirm={handleModalConfirm} // modalType에 따라 동작} // 확인 시 로그아웃 함수 실행
                    />
                </HeaderContainer>
            </HeaderStyle>
        </header>
    );
}
