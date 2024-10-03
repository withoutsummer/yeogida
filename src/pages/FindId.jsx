import React, { useState, useEffect } from 'react';
import FindInput from '../components/FindInputField';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Btn';
import styled from 'styled-components';
import CommonModal from '../components/CommonModal';

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

    //해당 계정 유무 확인(api 요청)
    const checkAccountExists = async () => {
        // try {
        //     const response = await fetch('users/find/id', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             name: formData.userName,
        //             email: formData.email, // 전화번호는 하드코딩 예시
        //         }),
        //     });

        //     if (response.status === 200) {
        //         return true;
        //     } else if (response.status === 404) {
        //         openModal(
        //             '가입 시 입력하신 회원 정보와 맞는지 다시 한번 확인해주세요.'
        //         );
        //         return false;
        //     } else {
        //         openModal(
        //             '서버 에러가 발생했습니다. 나중에 다시 시도해주세요.'
        //         );
        //         return false;
        //     }
        // } catch (error) {
        //     openModal('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        //     return false;
        // }

        return true;
    };

    // 이메일 인증하기 버튼 핸들러
    const handleSendCode = async () => {
        if (isFormValid()) {
            const accountExists = await checkAccountExists(); // 계정 존재 여부 확인
            if (accountExists) {
                openModal('인증번호를 전송했습니다.');
                setShowCertificationInput(true);
                setTimer(180); // 타이머 초기화
            }
        }
    };

    //인증번호 입력 후 확인 버튼 핸들러
    const handleSubmit = async () => {
        if (isCertificationValid()) {
            try {
                const response = await fetch('/users/idpw-sendnum', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        code: formData.certificationNum,
                    }),
                });

                const data = await response.json();

                if (response.status === 200) {
                    // 인증 성공 시 ID를 가져오는 API 호출
                    const idResponse = await fetch('/api/findId', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (idResponse.status === 200) {
                        const data = await idResponse.json();
                        const userId = data.id;

                        // 성공 페이지로 아이디를 전달하면서 이동
                        navigate('/find/id/success', { state: { userId } });
                    } else {
                        openModal('서버에서 아이디를 가져오지 못했습니다.');
                    }
                } else if (response.status === 404) {
                    openModal(response.message);
                } else if (response.status === 400) {
                    openModal(response.message);
                } else if (response.status === 400) {
                    openModal(response.message);
                } else {
                    openModal('서버 오류가 발생했습니다. 다시 시도해주세요.');
                }
            } catch (error) {
                openModal('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
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

    // 모달
    const openModal = (message, navigateToPage = '') => {
        setModalMessage(message);
        setNavigateTo(navigateToPage);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //인증번호 재전송 버튼 핸들러
    const handleResendCode = () => {
        if (timer > 60) {
            // 타이머가 1분 이상 남았을 경우
            openModal(
                '재발송 요청이 너무 빠릅니다. 잠시 후 다시 시도해주세요.'
            );
        } else {
            // 타이머가 1분 미만 남았을 경우
            // openModal('인증번호를 재전송하였습니다.');
            setFormData((prev) => ({
                ...prev,
                certificationNum: '', // 인증번호 입력 필드 초기화
            }));
            setTimer(180); // 타이머 초기화

            // API 요청을 통해 인증번호를 재전송
            resendCodeAPI();
        }
    };

    // 인증번호 재전송 API 호출 함수
    const resendCodeAPI = async () => {
        try {
            const response = await fetch('/api/resendCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.userName,
                }),
            });

            if (response.status === 200) {
                openModal('인증번호가 재전송되었습니다.');
            } else {
                openModal('서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            openModal('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        }
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
