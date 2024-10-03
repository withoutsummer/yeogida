import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/yeogida_logo.png';

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

const Bell = styled.div`
    width: 24px;
    height: 24px;
    margin-left: 407px; /* <li> 태그와의 간격 조절 */
    svg {
        width: 100%;
        height: 100%;
    }
`;

const NotificationDropdown = styled.div`
    position: absolute;
    top: 35px;
    right: 0;
    width: 250px;
    max-height: 300px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow-y: auto;
    z-index: 1001;
`;

const NotificationItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid #eee;
    &:hover {
        background-color: #f6f6f6;
    }
`;

const Button = styled.button`
    width: 110px;
    height: 50px;
    background-color: #000;
    color: #fff;
    padding: 0 10px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-left: 50px; /* Bell과 간격 조절 */
    border-radius: 5px;
    background: var(--black, #000);
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
        color: #707070;
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
                                                <DropdownMenu
                                                    onClick={() =>
                                                        navigate(
                                                            '/mypage/editinfo'
                                                        )
                                                    }
                                                >
                                                    개인정보 수정
                                                </DropdownMenu>
                                                <DropdownMenu
                                                    onClick={() =>
                                                        navigate(
                                                            '/mypage/friend'
                                                        )
                                                    }
                                                >
                                                    친구목록
                                                </DropdownMenu>
                                                <DropdownMenu
                                                    onClick={() =>
                                                        navigate(
                                                            '/mypage/scrap'
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
                    <Bell>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                        >
                            <path
                                d="M22.5002 16.7041C21.6526 15.2461 21.2024 13.1533 21.2024 10.6562C21.2024 8.48065 20.3381 6.39415 18.7997 4.85576C17.2614 3.31738 15.1749 2.45313 12.9993 2.45312C10.8237 2.45313 8.73716 3.31738 7.19878 4.85576C5.66039 6.39415 4.79614 8.48065 4.79614 10.6562C4.79614 13.1543 4.3479 15.2461 3.50024 16.7041C3.32727 17.0015 3.23559 17.3391 3.23439 17.6832C3.23319 18.0272 3.32252 18.3655 3.4934 18.6641C3.66321 18.9628 3.90968 19.2108 4.20736 19.3825C4.50504 19.5542 4.84314 19.6433 5.18676 19.6406H8.71997C8.81687 20.7086 9.30963 21.7018 10.1014 22.425C10.8932 23.1482 11.9269 23.5492 12.9993 23.5492C14.0717 23.5492 15.1053 23.1482 15.8971 22.425C16.6889 21.7018 17.1817 20.7086 17.2786 19.6406H20.8118C21.1549 19.6428 21.4924 19.5534 21.7895 19.3817C22.0866 19.2101 22.3326 18.9624 22.5022 18.6641C22.6738 18.3659 22.764 18.0278 22.7637 17.6838C22.7633 17.3398 22.6725 17.0019 22.5002 16.7041ZM12.9993 21.2031C12.549 21.2032 12.1126 21.0477 11.7638 20.763C11.415 20.4783 11.1753 20.0818 11.0852 19.6406H14.9133C14.8233 20.0818 14.5836 20.4783 14.2348 20.763C13.886 21.0477 13.4495 21.2032 12.9993 21.2031ZM5.83715 17.2969C6.70141 15.5391 7.13989 13.3066 7.13989 10.6562C7.13989 9.10225 7.75721 7.61189 8.85606 6.51305C9.95491 5.4142 11.4453 4.79688 12.9993 4.79688C14.5533 4.79688 16.0436 5.4142 17.1425 6.51305C18.2413 7.61189 18.8586 9.10225 18.8586 10.6562C18.8586 13.3057 19.2961 15.5391 20.1604 17.2969H5.83715Z"
                                fill="black"
                            />
                        </svg>
                    </Bell>
                    <Button onClick={() => navigate('/login')}>로그인</Button>
                </HeaderContainer>
            </HeaderStyle>
        </header>
    );
}
