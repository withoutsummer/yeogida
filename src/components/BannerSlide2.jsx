import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Btn';
import Cloud1 from '../pages/img/cloud1.png';
import Cloud2 from '../pages/img/cloud2.png';
import SAirplane from '../pages/img/smallAirplane.png';
import BAirplane from '../pages/img/bigAirplane.png';

const Slide = styled.div`
    position: relative;
    height: 520px;
    background-color: #e9f2ff;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
        180deg,
        rgba(255, 242, 205, 0.1) 10%,
        rgba(255, 242, 205, 0.4) 64%,
        rgba(255, 241.78, 205.42, 0.8) 100%
    );
`;

const Cloud = styled.img`
    position: absolute;
    opacity: 1;
`;

const Airplane = styled.img`
    position: absolute;
    opacity: 1;
`;

// 구름 위치 설정 (고정된 배치)
const Cloud1Styled = styled(Cloud)`
    top: 30px;
    left: 50px;
    width: 180px;
`;

const Cloud2Styled = styled(Cloud)`
    top: 50px;
    right: 80px;
    width: 220px;
`;

const Cloud3Styled = styled(Cloud)`
    top: 130px;
    left: 250px;
    width: 160px;
`;

const Cloud4Styled = styled(Cloud)`
    bottom: 120px;
    right: 200px;
    width: 200px;
`;

const Cloud5Styled = styled(Cloud)`
    bottom: 70px;
    left: 100px;
    width: 250px;
`;

const Cloud6Styled = styled(Cloud)`
    bottom: 100px;
    right: 50px;
    width: 180px;
`;

const Cloud7Styled = styled(Cloud)`
    top: 60px;
    left: 100px;
    width: 250px;
`;

const AirplaneSMStyled = styled(Airplane)`
    bottom: -10px;
    left: 50px;
    width: 250px;
    height: 330px;
`;

const AirplaneBIStyled = styled(Airplane)`
    top: -45px;
    right: 50px;
    width: 550px;
    height: 350px;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const BannerContent = styled.div`
    position: relative;
    z-index: 2;
    text-align: center;
`;

const BannerTitle = styled.div`
    font-size: 46px;
    font-weight: 500;
    margin-bottom: 30px;
`;

const BtnContainer = styled.div`
    margin-top: 30px;
`;

export default function BannerSlide2() {
    const navigate = useNavigate();
    return (
        <Slide>
            {/* 구름 배경 요소 */}
            <Cloud1Styled src={Cloud1} alt="Cloud1" />
            <Cloud2Styled src={Cloud2} alt="Cloud2" />
            <Cloud3Styled src={Cloud1} alt="Cloud3" />
            <Cloud4Styled src={Cloud2} alt="Cloud4" />
            <Cloud5Styled src={Cloud1} alt="Cloud5" />
            <Cloud6Styled src={Cloud2} alt="Cloud6" />
            <Cloud7Styled src={Cloud1} alt="Cloud7" />

            <AirplaneSMStyled src={SAirplane} alt="AirplaneS" />
            <AirplaneBIStyled src={BAirplane} alt="AirpalneB" />

            {/* 텍스트와 버튼을 중앙에 배치 */}
            <BannerContent>
                <BannerTitle>
                    여행을 소중히 <BoldText>여기다.</BoldText>
                    <br />
                    여행 계획 짤 땐 <BoldText>여기다.</BoldText>
                </BannerTitle>
                <BtnContainer>
                    <Button
                        onClick={() => navigate('/signup')}
                        width="170px"
                        height="60px"
                        borderColor="#FDBA2E"
                        backgroundColor="#FDBA2E"
                        hoverBackgroundColor="#FFAF08"
                        hoverBorderColor="#FFAF08"
                        borderRadius="10px"
                        fontSize="22px"
                        text="회원가입"
                    />
                </BtnContainer>
            </BannerContent>
        </Slide>
    );
}
