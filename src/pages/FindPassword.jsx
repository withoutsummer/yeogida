import React, { useState, useEffect } from 'react';
import FindInput from '../components/FindInputField'; // 새로 만든 InputField 컴포넌트 import
import EmailVerificationField from '../components/EmailVerificationField'; // New component
import { useNavigate } from 'react-router-dom';
import Button from '../components/Btn';
import styled from 'styled-components';
import CommonModal from '../components/CommonModal';

const FindPasswordForm = styled.div`
    box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
    min-width: 1050px;
    padding: 50px 0px;
`;

const TitleStyle = styled.h3`
    font-weight: bold;
    font-size: 40px;
    text-align: center;
`;

const FindPasswordInput = styled.div`
    max-width: 490px;
    padding: 0px 10px 6px;
    margin: auto;
    position: relative;
`;

const TitleLabel = styled.label`
    display: inline-block;
    padding: 8px 0px 15px;
    font-size: 24px;
    line-height: 19px;
    margin-top: 25px;
`;

const ButtonStyle = styled.div`
    margin-top: 25px;
`;

export default function FindPassword() {
    const [formData, setFormData] = useState({
        userName: '',
        userId: '',
        birth: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        userName: '',
        userId: '',
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
            case 'userId':
                if (value.length < 6 || value.length > 16) {
                    error =
                        '6자 이상 16자 이하의 영문 혹은 숫자를 조합해주세요.';
                }
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
                if (!/\S+@\S+\.\S+/.test(value))
                    error = '이메일 형식이 맞지 않습니다.';
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
            !errors.userId &&
            !errors.birth &&
            !errors.email &&
            formData.userName &&
            formData.userId &&
            formData.birth &&
            formData.email
        );
    };

    const checkAccountExists = async () => {
        try {
            const response = await fetch('users/find/password', {
                method: 'POST',
                headers: {
                    ContentType: 'application/json',
                },
                body: JSON.stringify({
                    name: formData.userName,
                    id: formData.userId,
                    birth: formData.birth,
                    email: formData.email,
                }),
            });

            if (response.status === 200) {
                return true;
            } else if (response.status === 404) {
                openModal('해당하는 회원정보가 없습니다.');
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
        setNavigateTo(navigateToPage); // navigateTo 설정
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //인증번호 재전송
    const handleResendCode = () => {
        // 인증번호 재전송 로직 (예: API 호출)
        openModal('인증번호를 재전송하였습니다.');
        setFormData((prev) => ({
            ...prev,
            certificationNum: '', // 인증번호 입력 필드 초기화
        }));
        setTimer(180); // 타이머 초기화
    };

    return (
        <FindPasswordForm>
            <TitleStyle>비밀번호 찾기</TitleStyle>
            <FindPasswordInput>
                <TitleLabel>이름</TitleLabel>
                <FindInput
                    type="text"
                    id="userName"
                    placeholder="이름을 입력해주세요."
                    height="80px"
                    marginbottom="15px"
                    onChange={handleChange}
                    value={formData.userName}
                    error={!!errors.userName} // 에러가 있는 경우 true로 설정
                    errorMessage={errors.userName} // 에러 메시지 전달
                />
                <TitleLabel>아이디</TitleLabel>
                <FindInput
                    type="text"
                    id="userId"
                    placeholder="아이디를 입력해주세요."
                    height="80px"
                    marginbottom="15px"
                    onChange={handleChange}
                    value={formData.userId}
                    error={!!errors.userId} // 에러가 있는 경우 true로 설정
                    errorMessage={errors.userId} // 에러 메시지 전달
                />
                <TitleLabel>생년월일</TitleLabel>
                <FindInput
                    type="date"
                    id="birth"
                    placeholder="생년월일"
                    height="80px"
                    marginbottom="15px"
                    onChange={handleChange}
                    value={formData.birth}
                    error={!!errors.birth} // 에러가 있는 경우 true로 설정
                    errorMessage={errors.birth} // 에러 메시지 전달
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
                    verifiDisabled={!isFormValid()}
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
                            error={false} // 인증 번호 입력 필드는 에러 처리하지 않음
                            timerValue={`${Math.floor(timer / 60)}:${
                                timer % 60 < 10 ? `0${timer % 60}` : timer % 60
                            }`} // 타이머 값 전달
                            isVerificationCode={true} //재전송 버튼
                            onResendCode={handleResendCode} // 재전송 핸들러 전달
                        />
                    </>
                )}
                <ButtonStyle>
                    <Button
                        width="490px"
                        height="80px"
                        borderRadius="10px"
                        fontSize="26px"
                        text="비밀번호 찾기"
                        onClick={handleSubmit}
                        disabled={!isFormValid()} // 유효성 검증에 따라 비활성화
                    />
                </ButtonStyle>
                {/* 모달 추가 */}
                <CommonModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    title={modalTitle}
                    navigateTo={navigateTo} // navigateTo 전달
                ></CommonModal>
            </FindPasswordInput>
        </FindPasswordForm>
    );
}
