import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/yeogida_logo.png';
import Bell from '../components/Bell';

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

const Button = styled.button`
    width: 110px;
    height: 50px;
    padding: 0 10px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-left: 50px; /* Bell과 간격 조절 */
    border-radius: 5px;
    background: #59ABE6;
    border: none;
    color: #fff;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
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
    const [viewDropdown, setViewDropdown] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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
                                <li onClick={() => navigate('/mytrip')}>
                                    나의여행
                                </li>
                                <li onClick={() => navigate('/sharetrip')}>
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
                                                <DropdownMenu onClick={() =>navigate('/mypage/userinfo')}>
                                                    회원정보 관리
                                                </DropdownMenu>
                                                <DropdownMenu onClick={() =>navigate('/mypage/friend')}>
                                                    친구목록
                                                </DropdownMenu>
                                                <DropdownMenu onClick={() =>navigate('/mypage/scrap')}>
                                                    스크랩
                                                </DropdownMenu>
                                            </StyledDropdown>
                                        )}
                                    </MyPageContainer>
                                </li>
                            </ul>
                        </Nav>
                    </NavBox>
                    <Bell/>
                    <Button onClick={() => navigate('/login')}>로그인</Button>
                </HeaderContainer>
            </HeaderStyle>
        </header>
    );
}
