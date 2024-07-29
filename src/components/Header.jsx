import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import logo from '../assets/yeogida_logo.png';

const HeaderStyle = styled.div`
  width: 1440px;
  height: 164px;
  background-color: #ffffff;
  display: flex;
  align-items: center; 
  font-size: 15px;
  img {
    margin-left: 81px;
    margin-right: 42px;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  margin-left: auto; /* 오른쪽 끝으로 밀기 위한 스타일 */
  margin-right: 0; /* 오른쪽 여백 제거 */
`;

const SearchBar = styled.div`
  width: 452px;
  height: 56px;
  border-radius: 28px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  z-index: 1;
  opacity: 1;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden; /* 내부 내용이 넘치지 않도록 설정 */
`;

const SearchInput = styled.input`
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  border: none;
  height: 100%;
  padding: 0 10px;
  font-size: 15px;
  -webkit-appearance: none;
  border-radius: 28px; /* 테두리가 끊기지 않도록 둥글게 설정 */

  &:focus {
    outline: none;
    width: 100%; /* 포커스 시 입력 필드 전체 너비 사용 */
  }
`;

const SearchIcon = styled(FaSearch)`
  font-size: 24px; /* 아이콘 크기 */
  color: #333;
  margin-left: auto; /* 아이콘을 오른쪽 끝으로 밀기 */
`;

const NavBox = styled.div`
  width: 456px;
  height: 41px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px; /* SearchContainer와의 간격 조절 */
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-right: 0px;
`;

const Bell = styled.div`
  width: 25px;
  height: 25px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Button = styled.button`
  width: 109px;
  height: 52px;
  background-color: #000;
  color: #fff;
  padding: 14px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  margin-left: 26px; /* NavBox와의 간격 조절 */
  margin-right: 81px;
  border-radius: 8px;
background: var(--black, #000);

`;

const MyPageContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
  
  &:hover {
    color: #707070;
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
    margin-left: 0; /* li의 왼쪽 margin 제거 */
    margin-right: 42px;
    padding: 8px 16px;
    cursor: pointer;
    color: #333333;
  }
  li:hover {
    color: #707070;
  }
`;

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <HeaderStyle>
        <span className="logo" onClick={() => navigate('/')}>
          <img
            style={{ width: '158px', height: '70px' }}
            src={logo}
            alt="로고"
          />
        </span>
        <SearchContainer>
          <SearchBar>
            <SearchInput placeholder="검색어를 입력해주세요." />
            <SearchIcon />
          </SearchBar>
          <NavBox>
            <Nav>
              <ul>
                <li onClick={() => navigate('/apply')}>나의여행</li>
                <li onClick={() => navigate('/community')}>여행공유</li>
                <li>
                  <MyPageContainer onClick={() => navigate('/login')}>
                    마이페이지
                    <FaChevronDown style={{ marginLeft: '5px' }} />
                  </MyPageContainer>
                </li>
              </ul>
            </Nav>
            <Bell>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M22.5002 16.7041C21.6526 15.2461 21.2024 13.1533 21.2024 10.6562C21.2024 8.48065 20.3381 6.39415 18.7997 4.85576C17.2614 3.31738 15.1749 2.45313 12.9993 2.45312C10.8237 2.45313 8.73716 3.31738 7.19878 4.85576C5.66039 6.39415 4.79614 8.48065 4.79614 10.6562C4.79614 13.1543 4.3479 15.2461 3.50024 16.7041C3.32727 17.0015 3.23559 17.3391 3.23439 17.6832C3.23319 18.0272 3.32252 18.3655 3.4934 18.6641C3.66321 18.9628 3.90968 19.2108 4.20736 19.3825C4.50504 19.5542 4.84314 19.6433 5.18676 19.6406H8.71997C8.81687 20.7086 9.30963 21.7018 10.1014 22.425C10.8932 23.1482 11.9269 23.5492 12.9993 23.5492C14.0717 23.5492 15.1053 23.1482 15.8971 22.425C16.6889 21.7018 17.1817 20.7086 17.2786 19.6406H20.8118C21.1549 19.6428 21.4924 19.5534 21.7895 19.3817C22.0866 19.2101 22.3326 18.9624 22.5022 18.6641C22.6738 18.3659 22.764 18.0278 22.7637 17.6838C22.7633 17.3398 22.6725 17.0019 22.5002 16.7041ZM12.9993 21.2031C12.549 21.2032 12.1126 21.0477 11.7638 20.763C11.415 20.4783 11.1753 20.0818 11.0852 19.6406H14.9133C14.8233 20.0818 14.5836 20.4783 14.2348 20.763C13.886 21.0477 13.4495 21.2032 12.9993 21.2031ZM5.83715 17.2969C6.70141 15.5391 7.13989 13.3066 7.13989 10.6562C7.13989 9.10225 7.75721 7.61189 8.85606 6.51305C9.95491 5.4142 11.4453 4.79688 12.9993 4.79688C14.5533 4.79688 16.0436 5.4142 17.1425 6.51305C18.2413 7.61189 18.8586 9.10225 18.8586 10.6562C18.8586 13.3057 19.2961 15.5391 20.1604 17.2969H5.83715Z" fill="black"/>
              </svg>
            </Bell>
          </NavBox>
        </SearchContainer>
        <Button>버튼</Button>
      </HeaderStyle>
    </header>
  );
}
