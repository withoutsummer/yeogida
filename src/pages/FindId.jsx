import React, { useState, useEffect } from 'react';
import FindInput from '../components/FindInputField';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Btn';
import styled from 'styled-components';
import CommonModal from '../components/CommonModal';
import {
    checkAccountExists,
    sendVerificationCode,
    fetchUserId,
    resendCodeAPI,
} from '../api/FindId/FindIdApi';

const FindIdForm = styled.div`
    margin-top: 120px;
    box-sizing: border-box;
    min-width: 1050px;
    padding: 50px 0;
`;

const TitleStyle = styled.h3`
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    margin-bottom: 40px;
`;

const FindIdInput = styled.div`
    max-width: 490px;
    padding: 0 10px 6px;
    margin: auto;
    position: relative;
`;

const TitleLabel = styled.label`
    display: inline-block;
    padding-bottom: 15px;
    font-size: 24px;
    line-height: 19px;
    margin-top: 25px;
`;

const ButtonStyle = styled.div`
    margin-top: 25px;
`;

export default function FindId() {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        certificationNum: '',
    });
    const [errors, setErrors] = useState({});
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [timer, setTimer] = useState(180);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [navigateTo, setNavigateTo] = useState('');
    const [userId, setUserId] = useState(''); // ID 값을 저장할 상태 추가
    const navigate = useNavigate();

    // Validation function
    const validateField = (name, value) => {
        let error = '';
        if (!value) {
            error =
                name === 'userName'
                    ? '이름을 입력해주세요.'
                    : '이메일을 입력해주세요.';
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Allow only numbers for certification number
        if (id === 'certificationNum' && !/^\d*$/.test(value)) return;

        if (showCertificationInput && (id === 'userName' || id === 'email'))
            return;

        setFormData((prev) => ({ ...prev, [id]: value }));
        validateField(id, value);
    };

    const isFormValid = () =>
        formData.userName &&
        formData.email &&
        !errors.userName &&
        !errors.email;
    const isCertificationValid = () => formData.certificationNum?.length === 6;

    // Modal control
    const openModal = (message, target = '') => {
        setModalMessage(message);
        setNavigateTo(target);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    // Send verification code
    const handleSendCode = async () => {
        if (isFormValid()) {
            try {
                const accountExists = await checkAccountExists(
                    formData.userName,
                    formData.email
                );
                if (accountExists) {
                    openModal('인증번호를 전송했습니다.이메일을 확인해주세요.');
                    setShowCertificationInput(true);
                    setTimer(180); // reset timer
                }
            } catch (error) {
                openModal(error.message);
            }
        }
    };

    // Submit verification code
    const handleSubmit = async () => {
        if (isCertificationValid()) {
            try {
                const response = await sendVerificationCode(
                    formData.userName,
                    formData.email,
                    formData.certificationNum
                );
                if (response.status === 200) {
                    const id = await fetchUserId(); // ID 가져오기
                    setUserId(id); // ID 상태에 저장
                    navigate('/find/id/success', { state: { userId: id } }); // ID를 성공 페이지로 전달

                    setFormData((prev) => ({ ...prev, certificationNum: '' }));
                    setTimeout(() => navigate('/find/id/success'), 1000);
                }
            } catch (error) {
                openModal(error.message);
            }
        }
    };

    // Resend code handler with timing restriction
    const handleResendCode = async () => {
        if (timer > 60) {
            openModal(
                '재발송 요청이 너무 빠릅니다. 잠시 후 다시 시도해주세요.'
            );
        } else {
            try {
                setFormData((prev) => ({ ...prev, certificationNum: '' }));
                setTimer(180); // reset timer
                const message = await resendCodeAPI(
                    formData.email,
                    formData.userName
                );
                openModal(message);
            } catch (error) {
                openModal(error.message);
            }
        }
    };

    // Timer management
    useEffect(() => {
        if (showCertificationInput && timer > 0) {
            const interval = setInterval(
                () => setTimer((prev) => prev - 1),
                1000
            );
            return () => clearInterval(interval);
        } else if (timer === 0) {
            openModal('유효 시간이 만료되었습니다. 다시 시도해주세요.');
            setShowCertificationInput(false);
            setFormData((prev) => ({ ...prev, certificationNum: '' }));
        }
    }, [showCertificationInput, timer]);

    return (
        <FindIdForm>
            <TitleStyle>아이디 찾기</TitleStyle>
            <FindIdInput>
                <TitleLabel>이름</TitleLabel>
                <FindInput
                    type="text"
                    id="userName"
                    placeholder="이름을 입력해주세요."
                    height="80px"
                    marginbottom="40px"
                    onChange={handleChange}
                    value={formData.userName}
                    error={!!errors.userName}
                    errorMessage={errors.userName}
                    disabledInput={showCertificationInput}
                />
                <TitleLabel>이메일</TitleLabel>
                <FindInput
                    type="email"
                    id="email"
                    placeholder="이메일"
                    height="80px"
                    marginbottom="40px"
                    onChange={handleChange}
                    value={formData.email}
                    error={!!errors.email}
                    errorMessage={errors.email}
                    isEmailVerification={true}
                    onSendCode={handleSendCode}
                    disabledBtn={showCertificationInput || !isFormValid()}
                    disabledInput={showCertificationInput}
                />

                {showCertificationInput && (
                    <>
                        <TitleLabel>인증 번호</TitleLabel>
                        <FindInput
                            type="tel"
                            id="certificationNum"
                            placeholder="인증 번호 6자리"
                            height="80px"
                            marginbottom="40px"
                            onChange={handleChange}
                            value={formData.certificationNum || ''}
                            error={false}
                            timerValue={`${Math.floor(timer / 60)}:${
                                timer % 60 < 10 ? `0${timer % 60}` : timer % 60
                            }`}
                            isVerificationCode={true}
                            onResendCode={handleResendCode}
                        />
                    </>
                )}
                <ButtonStyle>
                    <Button
                        width="490px"
                        height="80px"
                        borderRadius="10px"
                        fontSize="26px"
                        text="확인"
                        onClick={handleSubmit}
                        disabled={!isCertificationValid()}
                    />
                </ButtonStyle>
                <CommonModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    title={modalMessage}
                    navigateTo={navigateTo}
                />
            </FindIdInput>
        </FindIdForm>
    );
}
