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
        phone: '',
    });

    const [errors, setErrors] = useState({
        userName: '',
        birth: '',
        phone: '',
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
            case 'phone':
                if (!value) error = '휴대폰 번호를 입력해주세요.';
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const numericValue =
            id === 'phone' ? value.replace(/[^0-9]/g, '') : value;
        setFormData({ ...formData, [id]: numericValue });
        validate(id, numericValue);
    };

    const isFormValid = () => {
        return (
            !errors.userName &&
            !errors.birth &&
            !errors.phone &&
            formData.userName &&
            formData.birth &&
            formData.phone
        );
    };

    const checkAccountExists = () => {
        // 여기에 서버 요청을 통해 계정 존재 여부를 확인하는 로직을 추가하세요.
        // 예시: return fetch('/api/checkAccount', { method: 'POST', body: JSON.stringify(formData) })
        // .then(response => response.json());

        // 이곳에서는 예시로 계정이 존재한다고 가정합니다.
        return true; // 또는 false;
    };

    const handleSubmit = async () => {
        if (isFormValid()) {
            const accountExists = checkAccountExists(); // 계정 존재 여부 확인
            if (accountExists) {
                alert('인증번호를 전송했습니다.');
                setShowCertificationInput(true);
                setTimer(180); // 타이머 초기화
            } else {
                openModal(
                    '가입 시 입력하신 회원 정보와 맞는지 다시 한번 확인해주세요.'
                );
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
                    error={!!errors.userName} // 에러가 있는 경우 true로 설정
                    errorMessage={errors.userName} // 에러 메시지 전달
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
                    error={!!errors.birth} // 에러가 있는 경우 true로 설정
                    errorMessage={errors.birth} // 에러 메시지 전달
                />
                <TitleLabel>휴대폰 번호</TitleLabel>
                <FindInput
                    type="tel"
                    id="phone"
                    placeholder="휴대폰 번호를 입력해주세요."
                    height="80px"
                    marginbottom="40px"
                    onChange={handleChange}
                    value={formData.phone}
                    error={!!errors.phone} // 에러가 있는 경우 true로 설정
                    errorMessage={errors.phone} // 에러 메시지 전달
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
                        text="인증번호 받기"
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
            </FindIdInput>
        </FindIdForm>
    );
}
