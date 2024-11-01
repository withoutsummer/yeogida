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
    box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
    min-width: 1050px;
    padding: 50px 0px;
`;

const TitleStyle = styled.h3`
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    margin-bottom: 40px;
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
        email: '',
    });

    const [errors, setErrors] = useState({
        userName: '',
        email: '',
    });

    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [timer, setTimer] = useState(180);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [navigateTo, setNavigateTo] = useState('');
    const navigate = useNavigate();

    const validate = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'userName':
                if (!value) error = '이름을 입력해주세요.';
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

        // 인증번호 필드에서 숫자만 입력 가능하게 처리
        if (id === 'certificationNum' && !/^\d*$/.test(value)) {
            return; // 숫자가 아니면 상태 업데이트를 하지 않음
        }

        // 인증번호 입력 중이면 이름과 이메일 필드는 수정 불가
        if (showCertificationInput && (id === 'userName' || id === 'email')) {
            return;
        }

        setFormData({ ...formData, [id]: value });
        validate(id, value);
    };

    const isFormValid = () => {
        return (
            !errors.userName &&
            !errors.email &&
            formData.userName &&
            formData.email
        );
    };

    const isCertificationValid = () => {
        return (
            formData.certificationNum && formData.certificationNum.length === 6
        );
    };

    const isEmailValid = () => {
        return (
            formData.userName &&
            !errors.userName &&
            formData.email &&
            !errors.eamil
        );
    };

    // 모달
    const openModal = (message, navigateToPage = '') => {
        setModalMessage(message);
        setNavigateTo(navigateToPage);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // 이메일 인증하기 버튼 핸들러
    const handleSendCode = async () => {
        if (isFormValid()) {
            try {
                const accountExists = await checkAccountExists(
                    formData.userName,
                    formData.email
                );
                if (accountExists) {
                    openModal('인증번호를 전송했습니다.');
                    setShowCertificationInput(true);
                    setTimer(180);
                }
            } catch (error) {
                openModal(error.message);
            }
        }
    };

    //인증번호 입력 후 확인 버튼 핸들러
    const handleSubmit = async () => {
        if (isCertificationValid()) {
            try {
                await sendVerificationCode(
                    formData.email,
                    formData.certificationNum
                );
                const userId = await fetchUserId();
                navigate('/find/id/success', { state: { userId } });
            } catch (error) {
                openModal(error.message);
            }
        }
    };

    //인증번호 재전송 버튼 핸들러
    const handleResendCode = async () => {
        if (timer > 60) {
            // 타이머가 1분 이상 남았을 경우
            openModal(
                '재발송 요청이 너무 빠릅니다. 잠시 후 다시 시도해주세요.'
            );
        } else {
            try {
                setFormData((prev) => ({
                    ...prev,
                    certificationNum: '',
                }));
                setTimer(180);
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

    // 타이머가 종료되었을 때의 useEffect 수정
    useEffect(() => {
        let interval = null;
        if (showCertificationInput && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            openModal('유효 시간이 만료되었습니다. 다시 시도해주세요.');
            setShowCertificationInput(false); // 입력 필드 숨기기
            setFormData((prev) => ({
                ...prev,
                certificationNum: '', // 인증번호 필드 값 초기화
            }));
            // 인증번호 삭제 로직 추가
        }
        return () => clearInterval(interval);
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
                    disabledInput={showCertificationInput} // 인증번호 입력 중일 때 비활성화
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
                    disabledBtn={showCertificationInput || !isEmailValid()}
                    disabledInput={showCertificationInput} // 인증번호 입력 중일 때 비활성화
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
                        disabled={!isCertificationValid()} // 인증번호 입력 중이면 비활성화
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
