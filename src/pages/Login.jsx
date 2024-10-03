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
    height: 80vh;
    padding: 20px;
    flex-direction: column;
    margin-top: 200px;
    margin-bottom: 100px;
    box-sizing: border-box;
`;

const TitleStyle = styled.h3`
    margin-bottom: 55px;
    font-weight: bold;
    font-size: 36px;
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
    color: #000;

    &:hover {
        color: #59abe6;
    }
`;

export default function Login() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [navigateTo, setNavigateTo] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const openModal = (title, navigateToPage = '') => {
        setModalTitle(title);
        setNavigateTo(navigateToPage);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // mokdata 이용한 api 연결 구현
    const handleLogin = async () => {
        if (userId && password) {
            try {
                // mockdata.json 파일에서 데이터 가져오기
                const response = await fetch('/data/loginMokData.json');
                const mockData = await response.json();

                const user = mockData.users.find(
                    (u) => u.id === userId && u.password === password
                );

                if (user) {
                    // mock JWT 토큰 저장
                    localStorage.setItem('token', user.token);

                    // 홈 페이지로 이동
                    navigate('/home');
                } else {
                    openModal('아이디 또는 비밀번호가 일치하지 않습니다.');
                }
            } catch (error) {
                openModal('서버와의 연결에 문제가 발생했습니다.');
            }
        } else {
            openModal('아이디와 비밀번호를 입력해주세요.');
        }
    };

    // 실제 api 명세서 작성 시 코드
    // const handleLogin = async () => {
    //     if (userId && password) {
    //         try {
    //             // 서버로 로그인 요청
    //             const response = await fetch('users/login', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     id: userId,
    //                     password: password,
    //                 }),
    //             });

    //             const data = await response.json();

    //             if (response.ok && data.status === 200) {
    //                 // JWT 토큰이 있다면 로컬 스토리지에 저장 (서버 응답에 따라 수정 가능)
    //                 localStorage.setItem('token', data.token);

    //                 // 홈 페이지로 이동
    //                 navigate('/home');
    //             } else if (response.status === 401) {
    //                 // 아이디 또는 비밀번호가 일치하지 않음
    //                 openModal('아이디 또는 비밀번호가 일치하지 않습니다.');
    //             } else {
    //                 // 기타 서버 에러
    //                 openModal(
    //                     '로그인 중 문제가 발생했습니다. 다시 시도해주세요.'
    //                 );
    //             }
    //         } catch (error) {
    //             // 네트워크 에러 또는 서버 문제 처리
    //             openModal('서버와의 연결에 문제가 발생했습니다.');
    //         }
    //     } else {
    //         openModal('아이디와 비밀번호를 입력해주세요.');
    //     }
    // };

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
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    height="80px"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LinkContainer>
                    <Link onClick={() => navigate('/find/id')}>
                        아이디 찾기
                    </Link>
                    <div>&ensp;|&ensp;</div>
                    <Link onClick={() => navigate('/find/password')}>
                        비밀번호 찾기
                    </Link>
                </LinkContainer>
                <Button
                    onClick={handleLogin}
                    width="490px"
                    height="80px"
                    borderColor="#59ABE6"
                    backgroundColor="#59ABE6"
                    hoverBackgroundColor="#0D90EE"
                    hoverBorderColor="#0D90EE"
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
                    borderColor="#59ABE6"
                    backgroundColor="white"
                    hoverBackgroundColor="#59ABE6"
                    hoverBorderColor="#59ABE6"
                    color="#59ABE6"
                    text="회원가입"
                />
            </LoginInput>
            <CommonModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                title={modalTitle}
                navigateTo={navigateTo}
            />
        </LoginForm>
    );
}
