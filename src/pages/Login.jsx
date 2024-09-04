import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Btn';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CommonModal from '../components/CommonModal';

const LoginForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 20px;
    flex-direction: column;
    margin: 0;
    box-sizing: border-box;
`;

const TitleStyle = styled.h3`
    margin-bottom: 55px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
`;

const LoginInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 490px;
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 30px;
`;

const Link = styled.span`
    cursor: pointer;
    color: #000; // 기본 색상

    &:hover {
        color: #f4a192; // 호버 시 색상 변경
    }
`;

export default function Login() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [navigateTo, setNavigateTo] = useState('');
    const [userId, setUserId] = useState(''); // 아이디 상태 추가
    const [password, setPassword] = useState(''); // 비밀번호 상태 추가

    const openModal = (title, navigateToPage = '') => {
        setModalTitle(title);
        setNavigateTo(navigateToPage);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogin = () => {
        // 아이디와 비밀번호가 모두 입력되어 있는지 확인
        if (userId && password) {
            // 홈 페이지로 이동
            navigate('/home'); // 홈 페이지 경로로 수정
        } else {
            openModal('아이디와 비밀번호를 다시 확인해주세요.');
        }
    };

    return (
        <LoginForm>
            <TitleStyle>로그인</TitleStyle>
            <LoginInput>
                <TextInput
                    type="text"
                    id="userId"
                    placeholder="아이디"
                    height="80px"
                    marginbottom="15px"
                    autoFocus
                    value={userId} // 아이디 상태 연결
                    onChange={(e) => setUserId(e.target.value)} // 아이디 입력 처리
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    height="80px"
                    value={password} // 비밀번호 상태 연결
                    onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 처리
                />
                <LinkContainer>
                    <Link onClick={() => navigate('/find/id')}>
                        아이디 찾기
                    </Link>
                    <div>&ensp;|&ensp; </div>
                    <Link onClick={() => navigate('/find/password')}>
                        비밀번호 찾기
                    </Link>
                </LinkContainer>
                <Button
                    onClick={handleLogin} // 로그인 처리 함수 호출
                    width="490px"
                    height="80px"
                    borderRadius="10px"
                    fontSize="26px"
                    text="로그인"
                    style={{ marginBottom: '15px' }}
                />
                <Button
                    onClick={() => navigate('/signUp')}
                    width="490px"
                    height="80px"
                    borderRadius="10px"
                    fontSize="26px"
                    borderColor="#F4A192"
                    backgroundColor="white"
                    hoverBackgroundColor="#FFF3F1"
                    hoverColor="#F89A89"
                    hoverBorderColor="#F89A89"
                    text="회원가입"
                    color="#F4A192"
                />
            </LoginInput>
            <CommonModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                title={modalTitle}
                navigateTo={navigateTo}
            ></CommonModal>
        </LoginForm>
    );
}
