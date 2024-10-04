import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import IconInsta from '../pages/img/iconInsta.png';
import IconGit from '../pages/./img/iconGithub.png';
import IconGm from '../pages/./img/iconGmail.png';
import logo from '../assets/yeogida_logo.png';

const FooterStyle = styled.div`
    width: 100%;
    height: 240px; /* 푸터 높이 조정 */
    padding: 20px 0; /* 위아래 패딩 줄임 */
    display: flex;
    justify-content: space-between; /* 자식 요소 간격 조정 */
    align-items: center;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1); /* 상단 그림자 효과 */
    background-color: #f5f5f5;
`;

const Logo = styled.img`
    width: 120px;
    height: 60px;
    margin-left: 180px;
`;

const Divider = styled.div`
    width: 50px;
    transform: rotate(-90deg);
    transformorigin: 0 0;
    border: 1px #cecece solid;
`;

const LinksContainer = styled.div`
    display: flex;
    flex-direction: column; /* 링크를 세로로 배치 */
    align-items: flex-start; /* 왼쪽 정렬 */
    margin: 0 400px 0 0;
`;

const LinksRow = styled.nav`
    display: flex; /* 링크를 가로로 배치 */
    gap: 15px; /* 링크 간격 */
    color: #707070;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px; /* FooterInfo와의 간격 */
    ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0; /* ul의 기본 margin 제거 */
    }
    li {
        margin-left: 0; /* li의 왼쪽 margin 제거 */
        padding: 0 10px;
        cursor: pointer;
        color: #707070;
    }
    li:hover {
        color: #59abe6;
    }
`;

const FooterInfo = styled.div`
    color: #707070;
    font-size: 18px;
    font-weight: 400;
    padding: 0 10px;
`;

const SocialIconsContainer = styled.div`
    display: flex;
    gap: 10px; /* 아이콘 간격 */
    margin-right: 180px;
`;

const Icon = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
`;

export default function Footer() {
    const navigate = useNavigate();
    return (
        <FooterStyle>
            <span className="logo" onClick={() => navigate('/')}>
                <Logo src={logo} alt="Logo" />
            </span>
            <Divider />
            <LinksContainer>
                <LinksRow>
                    <ul>
                        <li onClick={() => navigate('/mytrip')}>나의여행</li>
                        <li onClick={() => navigate('/sharetrip')}>여행공유</li>
                        <li onClick={() => navigate('/mypage/editinfo')}>
                            개인정보 수정
                        </li>
                        <li onClick={() => navigate('/mypage/friend')}>
                            친구목록
                        </li>
                        <li onClick={() => navigate('/mypage/scrap')}>
                            스크랩
                        </li>
                    </ul>
                </LinksRow>
                <FooterInfo>@made by SWUWEB TeamB</FooterInfo>
            </LinksContainer>
            <SocialIconsContainer>
                <Icon src={IconInsta} alt="Icon 1" />
                <Icon src={IconGit} alt="Icon 2" />
                <Icon src={IconGm} alt="Icon 3" />
            </SocialIconsContainer>
        </FooterStyle>
    );
}
