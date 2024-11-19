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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [navigateTo, setNavigateTo] = useState('');
    const [modalType, setModalType] = useState(1); // 기본 모달 타입 설정

    // 로그아웃 확인 모달 열기
    const handleLogout = () => {
        setModalMessage('로그아웃 하시겠습니까?');
        setModalType(2); // "예", "아니요" 버튼 표시
        setIsModalOpen(true);
    };

    // 로그아웃 로직
    const confirmLogout = async () => {
        try {
            await logout(); // AuthContext의 logout 호출 (서버 로그아웃 포함)
            navigate('/'); // 메인 페이지로 리다이렉트
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            setModalMessage('서버 오류가 발생했습니다. 다시 시도해 주세요.');
            setModalType(1);
            setIsModalOpen(true); // 오류 메시지 모달 열기
        }
    };

    // 모달
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
                                <li onClick={() => navigate('/mytrip')}>
                                    나의여행
                                </li>
                                <li
                                    onClick={() =>
                                        navigate('/shared-itineraries')
                                    }
                                >
                                    여행공유
                                </li>
                            </ul>
                        </Nav>
                    </NavBox>
                    <Btnstyle>
                        {isLoggedIn ? (
                            <Button
                                onClick={handleLogout}
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
                                onClick={() => navigate('/login')}
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
                        type={modalType}
                        onConfirm={handleModalConfirm}
                    />
                </HeaderContainer>
            </HeaderStyle>
        </header>
    );
}
