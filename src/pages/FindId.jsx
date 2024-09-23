import React, { useState, useEffect } from 'react';
import FindInput from '../components/FindInputField';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Btn';
import styled from 'styled-components';
import CommonModal from '../components/CommonModal';

const FindIdForm = styled.div`
    box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
    min-width: 1050px;
    padding: 50px 0px;
`;

const TitleStyle = styled.h3`
    font-weight: bold;
    font-size: 40px;
    text-align: center;
`;

const FindIdInput = styled.div`
    max-width: 490px;
    padding: 0px 10px 6px;
    margin: auto;
    position: relative;
`;
const TitleLabel = styled.label`
    display: inline-block;
    padding: 0px 0px 15px;
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
        birth: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        userName: '',
        birth: '',
        email: '',
    });

    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [timer, setTimer] = useState(180);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [navigateTo, setNavigateTo] = useState('');

    const validate = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'userName':
                if (!value) error = '이름을 입력해주세요.';
                break;
            case 'birth':
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    error = '생년월일은 YYYY-MM-DD 형식으로 입력해야 합니다.';
                } else {
                    const date = new Date(value);
                    if (date.getFullYear() < 1900 || date > new Date()) {
                        error = '유효한 생년월일을 입력해주세요.';
                    }
                }
                break;
            case 'email':
                if (!value) error = '이메일을 입력해주세요.';
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        validate(id, value);
    };

    const isFormValid = () => {
        return (
            !errors.userName &&
            !errors.birth &&
            !errors.email &&
            formData.userName &&
            formData.birth &&
            formData.email
        );
    };

    const checkAccountExists = async () => {
        try {
            const response = await fetch('users/find/id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.userName,
                    birth: formData.birth,
                    email: formData.email, // 전화번호는 하드코딩 예시
                }),
            });

            if (response.status === 200) {
                return true;
            } else if (response.status === 404) {
                openModal(
                    '가입 시 입력하신 회원 정보와 맞는지 다시 한번 확인해주세요.'
                );
                return false;
            } else {
                openModal(
                    '서버 에러가 발생했습니다. 나중에 다시 시도해주세요.'
                );
                return false;
            }
        } catch (error) {
            openModal('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (isFormValid()) {
            const accountExists = await checkAccountExists(); // 계정 존재 여부 확인
            if (accountExists) {
                openModal('인증번호를 전송했습니다.');
                setShowCertificationInput(true);
                setTimer(180); // 타이머 초기화
            }
        }
    };

    useEffect(() => {
        let interval = null;
        if (showCertificationInput && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            openModal('유효 시간이 만료되었습니다. 다시 시도해주세요.');
            setShowCertificationInput(false); // 입력 필드 숨기기
            // 인증번호 삭제 로직 추가
            // 예시: await fetch('/api/deleteCode', { method: 'DELETE' });
        }
        return () => clearInterval(interval);
    }, [showCertificationInput, timer]);

    // 모달
    const openModal = (title, navigateToPage = '') => {
        setModalTitle(title);
        setNavigateTo(navigateToPage);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleResendCode = () => {
        openModal('인증번호를 재전송하였습니다.');
        setFormData((prev) => ({
            ...prev,
            certificationNum: '', // 인증번호 입력 필드 초기화
        }));
        setTimer(180); // 타이머 초기화
    };

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
                />
                <TitleLabel>생년월일</TitleLabel>
                <FindInput
                    type="date"
                    id="birth"
                    placeholder="생년월일"
                    height="80px"
                    marginbottom="40px"
                    onChange={handleChange}
                    value={formData.birth}
                    error={!!errors.birth}
                    errorMessage={errors.birth}
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
                    handleSubmit={handleSubmit}
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
                        text="아이디 찾기"
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    />
                </ButtonStyle>
                <CommonModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    title={modalTitle}
                    navigateTo={navigateTo}
                />
            </FindIdInput>
        </FindIdForm>
    );
}
