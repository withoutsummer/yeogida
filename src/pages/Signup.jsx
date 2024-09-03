import React from 'react';
import InputField from '../components/SingnUpInputField'; // 새로 만든 InputField 컴포넌트 import
import { useNavigate } from 'react-router-dom';
import MainButton from '../components/MainButton';

export default function Signup() {
    return (
        <div className="container">
            <form className="signUpForm">
                <div>
                    <h3 id="signUp_title">회원가입</h3>
                </div>
                <div className="input_field">
                    <InputField
                        label="아이디"
                        id="userId"
                        type="text"
                        placeholder="아이디"
                        showButton
                    />
                    <InputField
                        label="비밀번호"
                        id="userPassword"
                        type="password"
                        placeholder="비밀번호"
                    />
                    <InputField
                        label="비밀번호 확인"
                        id="userPasswordConfirm"
                        type="password"
                        placeholder="비밀번호 확인"
                    />
                    <InputField
                        label="이름"
                        id="userName"
                        type="text"
                        placeholder="이름"
                    />
                    <InputField
                        label="이메일"
                        id="email"
                        type="email"
                        placeholder="ex) yeogida@travel.com"
                        showButton
                    />

                    <InputField
                        label="휴대폰"
                        id="phone"
                        type="phone"
                        placeholder="숫자만 입력해주세요."
                        showButton
                        buttonText="인증번호 받기"
                    />
                    <InputField
                        label="닉네임"
                        id="nickname"
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                    />
                </div>
                <MainButton>가입하기</MainButton>
            </form>
        </div>
    );
}
