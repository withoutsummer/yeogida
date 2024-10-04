import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Slide1Img from '../pages/img/slide1_airplane.png';
import Button from '../components/Btn';

const Slide = styled.div`
    background-color: #eee;
    height: 520px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #333;
    margin: 0;
    background: linear-gradient(
        180deg,
        rgba(238, 245, 255, 0.3) 0%,
        rgba(238, 245, 255, 0.7) 48%,
        #e9f2ff 100%
    );
`;

const Img = styled.img`
    width: 220px;
    height: 350px;
`;
const BannerContainer = styled.div`
    margin-right: 130px;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const BannerTitle = styled.div`
    font-size: 42px;
    font-weight: 500;
    margin-bottom: 25px;
`;

export default function BannerSlide1() {
    const navigate = useNavigate();
    return (
        <Slide>
            <BannerContainer>
                <BannerTitle>
                    <BoldText>새로운 모험</BoldText>이 기다립니다. <br />
                    원하는 여행지를 선택하고 <br />
                    <BoldText>나만의 여행 계획</BoldText>을 세워보세요!
                </BannerTitle>
                <Button
                    onClick={() => navigate('/login')}
                    width="180px"
                    height="60px"
                    borderColor="#59ABE6"
                    backgroundColor="#59ABE6"
                    hoverBackgroundColor="#0D90EE"
                    hoverBorderColor="#0D90EE"
                    borderRadius="10px"
                    fontSize="22px"
                    text="계획 세우기"
                />
            </BannerContainer>

            <Img src={Slide1Img} />
        </Slide>
    );
}
