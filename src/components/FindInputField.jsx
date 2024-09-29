import React from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput';
import Button from './Btn';

const InputFieldContainer = styled.div`
    margin-bottom: ${({ error }) => (error ? '25px' : '15px')};
    width: 100%;
`;

const InputWrapper = styled.div`
    display: flex;
    position: relative;
    flex: 1;
`;

const StyledTextInput = styled(TextInput)`
    width: 100%;
    max-width: 320px;
    padding-right: 40px; /* 타이머 공간을 위해 패딩 추가 */
`;

const Timer = styled.div`
    position: absolute;
    right: 165px; /* 입력 필드 오른쪽에 위치 */
    top: 50%;
    transform: translateY(-50%); /* 세로 중앙 정렬 */
    font-size: 16px; /* 타이머 폰트 크기 */
    color: red; /* 타이머 색상을 빨간색으로 변경 */
`;

const ErrorText = styled.div`
    color: red;
    font-size: 16px;
    margin-top: 10px;
`;

const Btntyle = styled.div`
    margin-left: 15px;
`;

const InputField = ({
    label,
    id,
    type,
    placeholder,
    onChange,
    value,
    error,
    errorMessage,
    timerValue, // 타이머 값을 받는 prop 추가
    isVerificationCode, // 인증번호 입력 필드 여부
    isEmailVerification,
    onResendCode, // 재전송 핸들러 추가
    onSendCode, //이메일 핸들러 추가
    disabledBtn = true,
    disabledInput = false,
}) => {
    return (
        <InputFieldContainer error={error}>
            <InputWrapper>
                <StyledTextInput
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    disabled={disabledInput}
                />
                {timerValue && <Timer>{timerValue}</Timer>} {/* 타이머 표시 */}
                {isVerificationCode && ( // 인증번호 입력 필드일 때만 버튼 표시
                    <Btntyle>
                        <Button
                            width="135px"
                            height="65px"
                            color="#F4A192"
                            backgroundColor="white"
                            borderColor="#F4A192"
                            borderRadius="10px"
                            fontSize="20px"
                            text="재전송"
                            onClick={onResendCode} // 재전송 클릭 핸들러
                            hoverBackgroundColor="#F4A192"
                            hoverColor="white"
                            hoverBorderColor="#F4A192"
                        />
                    </Btntyle>
                )}
                {isEmailVerification && (
                    <Btntyle>
                        <Button
                            width="130px"
                            height="65px"
                            color="#F4A192"
                            backgroundColor="white"
                            borderColor="#F4A192"
                            borderRadius="10px"
                            fontSize="20px"
                            text="인증하기"
                            onClick={onSendCode} // 재전송 클릭 핸들러
                            hoverBackgroundColor="#F4A192"
                            hoverColor="white"
                            hoverBorderColor="#F4A192"
                            disabled={disabledBtn}
                        />
                    </Btntyle>
                )}
            </InputWrapper>
            {error && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </InputFieldContainer>
    );
};

export default InputField;
