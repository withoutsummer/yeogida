import React from 'react';
import TextInput from '../components/TextInput'; // 새로 만든 컴포넌트 import
import MainButton from '../components/MainButton';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate(); // navigate 함수 생성

    return (
        <form className="loginForm">
            <div>
                <h3 id="login_title">로그인</h3>
            </div>
            <div className="login_input">
                <TextInput
                    type="text"
                    id="userId"
                    placeholder="아이디"
                    height="50px"
                    autoFocus
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    height="50px"
                />
                <MainButton onClick={() => navigate('/home')} primary>
                    로그인
                </MainButton>
                <MainButton
                    onClick={() => navigate('/signup')} // 회원가입 페이지로 이동}
                >
                    회원가입
                </MainButton>
            </div>
        </form>
    );
}
