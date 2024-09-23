import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Btn';
import styled from 'styled-components';
import CommonModal from '../components/CommonModal';
import profileImg from '../assets/icons/profile.png';

const SuccessForm = styled.div`
    max-width: 500px;
    padding: 50px;
    margin: auto;
    position: relative;
`;

const TitleStyle = styled.div`
    padding-top: 50px;
    font-weight: 500;
    font-size: 28px;
    line-height: 23px;
`;

const TitleLabel = styled.div`
    display: block;
    padding-top: 15px;
    font-weight: 400;
    font-size: 20px;
    color: rgb(153, 153, 153);
    line-height: 18px;
`;

const IdUl = styled.ul`
    padding: 12px 0px;
`;

const IdLi = styled.li`
    display: flex;
`;

const IdImg = styled.img`
    width: 40px;
    height: 40px;
    display: block;
    margin: 10px 12px 10px 0px;
`;

const FindId = styled.div`
    padding-top: 17px;
    font-weight: 500;
    font-size: 22px;
    line-height: 21px;
`;

const BtnContainer = styled.div`
    margin-top: 60px;
`;
export default function FindIdSuccess() {
    const navigate = useNavigate();
    return (
        <SuccessForm>
            <TitleStyle>
                고객님의 여기다 계정을 찾았습니다.
                <TitleLabel>아이디 확인 후 로그인해 주세요.</TitleLabel>
            </TitleStyle>

            <IdUl>
                <IdLi>
                    <IdImg src={profileImg} />
                    <FindId>swuweb2024</FindId>
                </IdLi>
            </IdUl>
            <BtnContainer>
                <Button
                    onClick={() => navigate('/login')}
                    width="490px"
                    height="80px"
                    borderRadius="10px"
                    fontSize="26px"
                    text="로그인"
                    style={{ marginBottom: '15px' }}
                />
                <Button
                    onClick={() => navigate('/find/password')}
                    width="490px"
                    height="80px"
                    borderRadius="10px"
                    fontSize="26px"
                    text="비밀번호 찾기"
                    borderColor="#F4A192"
                    backgroundColor="white"
                    hoverBackgroundColor="#FFF3F1"
                    hoverColor="#F89A89"
                    hoverBorderColor="#F89A89"
                    color="#F4A192"
                />
            </BtnContainer>
        </SuccessForm>
    );
}
