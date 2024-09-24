import React from 'react';
import styled from 'styled-components';
import Button from './Btn';
import TextInput from '../components/TextInput';

const InputFieldContainer = styled.div`
    margin-bottom: 25px;
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
    padding-right: 40px;
`;

const Timer = styled.div`
    position: absolute;
    right: 165px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: red;
`;

const Btntyle = styled.div`
    margin-left: 15px;
`;

const ErrorText = styled.div`
    color: red;
    font-size: 16px;
    margin-top: 10px;
`;

const EmailVerificationField = ({
    emailValue,
    onEmailChange,
    onSubmitEmail,
    verificationValue,
    onVerificationChange,
    onResendCode,
    showVerificationField,
    timerValue,
    emailError,
    verificationError,
}) => {
    return (
        <InputFieldContainer>
            <InputWrapper>
                <StyledTextInput
                    type="email"
                    id="email"
                    placeholder="이메일"
                    onChange={onEmailChange}
                    value={emailValue}
                />
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
                        onClick={onSubmitEmail}
                        hoverBackgroundColor="#F4A192"
                        hoverColor="white"
                        hoverBorderColor="#F4A192"
                    />
                </Btntyle>
            </InputWrapper>
            {emailError && <ErrorText>{emailError}</ErrorText>}

            {showVerificationField && (
                <>
                    <InputWrapper>
                        <StyledTextInput
                            type="tel"
                            id="certificationNum"
                            placeholder="인증 번호 6자리"
                            onChange={onVerificationChange}
                            value={verificationValue}
                        />
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
                                onClick={onResendCode}
                                hoverBackgroundColor="#F4A192"
                                hoverColor="white"
                                hoverBorderColor="#F4A192"
                            />
                        </Btntyle>
                        {timerValue && <Timer>{timerValue}</Timer>}
                    </InputWrapper>
                    {verificationError && (
                        <ErrorText>{verificationError}</ErrorText>
                    )}
                </>
            )}
        </InputFieldContainer>
    );
};

export default EmailVerificationField;
