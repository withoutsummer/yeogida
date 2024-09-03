import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput'; // TextInput 컴포넌트 가져오기
import Button from '../components/SubButton'; // SubButton 컴포넌트 가져오기

const InputFieldContainer = styled.div`
    margin-bottom: ${({ error }) => (error ? '10px' : '40px')};
    width: 100%;
`;

const LabelContainer = styled.div`
    display: ${({ showLabel }) => (showLabel ? 'flex' : 'flex')};
    width: 200px;
    align-items: center;
    margin-right: 10px;
    font-size: 20px;
    visibility: ${({ showLabel }) => (showLabel ? 'visible' : 'hidden')};
    height: ${({ showLabel }) => (showLabel ? 'auto' : '0')};
`;

const Asterisk = styled.div`
    color: red;
    margin-left: 4px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    position: relative; /* position을 relative로 설정 */
`;

const StyledTextInput = styled(TextInput)`
    width: 100%;
    max-width: 320px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Timer = styled.div`
    position: absolute;
    right: 220px; /* 입력 필드 오른쪽에 위치 */
    top: 50%;
    transform: translateY(-50%); /* 세로 중앙 정렬 */
    font-size: 16px; /* 타이머 폰트 크기 */
    color: red; /* 타이머 색상을 빨간색으로 변경 */
`;

const ErrorText = styled.div`
    color: red;
    font-size: 16px;
    margin: 10px 0 20px 210px;
`;

const InputField = ({
    label,
    showLabel = true,
    id,
    type,
    placeholder,
    showButton,
    buttonText = '중복 확인',
    onChange,
    value,
    error,
    errorMessage,
    onButtonClick,
    isVerificationCode = false, // 인증번호 입력 여부 prop 추가
    timerValue, // 타이머 값을 받는 prop 추가
    btnDisabled = false,
}) => {
    return (
        <InputFieldContainer error={error}>
            <InputWrapper>
                <LabelContainer showLabel={showLabel}>
                    <div>{label}</div>
                    <Asterisk>*</Asterisk>
                </LabelContainer>
                <StyledTextInput
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    isVerificationCode={isVerificationCode} // 인증번호 입력 여부 전달
                />
                {timerValue && <Timer>{timerValue}</Timer>} {/* 타이머 표시 */}
                {showButton && (
                    <ButtonWrapper>
                        <Button onClick={onButtonClick} disabled={btnDisabled}>
                            {buttonText}
                        </Button>
                    </ButtonWrapper>
                )}
            </InputWrapper>
            {error && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </InputFieldContainer>
    );
};

export default InputField;
