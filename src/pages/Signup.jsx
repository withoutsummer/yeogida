import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../components/Btn';
import CommonModal from '../components/CommonModal';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column; /* 세로 방향으로 요소 배치 */
    align-items: center; /* 중앙 정렬 */
    width: 865px; /* 폼의 최대 너비 */
    padding: 20px; /* 여백 추가 */
    margin: 0 auto; /* 중앙 정렬을 위한 여백 */
    margin-top: 100px;
`;

const TitleLabel = styled.h2`
    margin-bottom: 80px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
`;

const Asterisk = styled.div`
    color: red;
    margin-left: 4px;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    align-items: center;
    position: relative; /* 타이머 위치를 위한 상대 위치 */
`;

const Label = styled.div`
    width: 185px;
    display: flex;
    align-items: center;
    font-size: 20px;
`;

const ErrorStyled = styled.div`
    width: 490px;
    margin-bottom: 20px;
`;
const ErrorMessage = styled.small`
    color: red; /* 에러 메시지 색상 */
    font-size: 16px; /* 에러 메시지 글자 크기 */
`;

const InputField = styled.input`
    width: 448.3px;
    height: 65px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 0 20px;
    font-size: 20px;
    outline: none;

    &:focus {
        border: 1px solid #29613a;
    }
`;

const BtnStyled = styled.div`
    margin-left: 20px;
`;
// 타이머 스타일
const TimerStyled = styled.div`
    position: absolute;
    right: 205px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #555;
`;

function SignUp() {
    const {
        register,
        handleSubmit,
        watch, // watch 추가
        trigger,
        formState: { isSubmitting, errors },
    } = useForm();
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isPhoneChecked, setIsPhoneChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isCheckingId, setIsCheckingId] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);

    const [isCheckingPhone, setIsCheckingPhone] = useState(false);
    const [isEmailDisabled, setIsEmailDisabled] = useState(false);

    const [timer, setTimer] = useState(180);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [isCertified, setIsCertified] = useState(false);

    // 아이디 체크
    const handleIdCheck = async (event) => {
        event.preventDefault();
        const userIdValue = watch('userId');

        // 아이디 필드만 유효성 검사
        const isUserIdValid = await trigger('userId');

        // 유효하지 않거나 값이 없으면 중복 확인을 하지 않음
        if (!isUserIdValid || !userIdValue) {
            return;
        }
        setIsCheckingId(true);

        const isDuplicate = await checkIdDuplicate(userIdValue);

        if (!isDuplicate) {
            setModalMessage('사용 가능한 아이디입니다.');
            setIsIdChecked(true);
        } else {
            setModalMessage('이미 사용 중인 아이디입니다.');
            setIsIdChecked(false);
        }

        setIsModalOpen(true);
        setIsCheckingId(false);
    };

    // 전화번호 체크
    const handlePhoneCheck = async (event) => {
        event.preventDefault();
        const phoneValue = watch('phone');

        // 빈 값이면 유효성 검사를 하지 않음
        if (!phoneValue) {
            return;
        }

        // 전화번호 필드만 유효성 검사 (trigger 함수 호출)
        const isPhoneValid = await trigger('phone');

        if (!isPhoneValid) {
            return; // 유효성 검사 실패 시 추가 동작을 하지 않음
        }

        setIsCheckingPhone(true);

        const isDuplicate = await checkPhoneDuplicate(phoneValue);

        if (!isDuplicate) {
            setModalMessage('사용 가능한 전화번호입니다.');
            setIsPhoneChecked(true);
        } else {
            setModalMessage('이미 사용 중인 전화번호입니다.');
            setIsPhoneChecked(false);
        }

        setIsModalOpen(true);
        setIsCheckingPhone(false);
    };

    // 이메일 체크 및 인증번호 요청 함수
    const handleEmailCheck = async (event) => {
        event.preventDefault();
        const emailValue = watch('email');
        const isEmailValid = await trigger('email');

        if (!isEmailValid || !emailValue) {
            return;
        }

        setIsCheckingEmail(true);

        // 이메일 중복 체크
        const isDuplicate = await checkEmailDuplicate(emailValue);

        if (isDuplicate) {
            setModalMessage('이미 사용 중인 이메일입니다.');
            setIsModalOpen(true); // 모달을 띄움
            setIsCheckingEmail(false);
            return; // 중복이면 인증번호 절차로 넘어가지 않도록 함
        } else {
            // 중복이 아니면 이메일 인증번호 전송 절차로 넘어감
            setModalMessage(
                '해당 이메일로 인증번호를 전송했습니다. 이메일을 확인해주세요.'
            );
            setIsEmailDisabled(true);
            setTimer(180);
            setIsTimerRunning(true);
            setShowCertificationInput(true); // 인증번호 입력 필드 표시
            setIsModalOpen(true); // 모달을 띄움
        }

        setIsCheckingEmail(false);
    };

    // 타이머가 작동하는 동안 매초마다 시간을 감소시키는 useEffect
    useEffect(() => {
        if (isTimerRunning && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timer === 0) {
            setIsTimerRunning(false);
            setIsEmailDisabled(false); // 타이머 종료 시 버튼 활성화
        }
    }, [timer, isTimerRunning]);

    useEffect(() => {
        // 이메일 변경될 때 타이머와 버튼 상태 초기화
        setTimer(180);
        setIsTimerRunning(false);
        setShowCertificationInput(false);
        setIsEmailDisabled(false);
    }, [watch('email')]);

    const handleCertificationCheck = async () => {
        const enteredCode = watch('certificationNum');
        const correctCode = '123456'; // 이곳에 실제 인증번호 로직 적용

        if (enteredCode === correctCode) {
            setModalMessage('인증이 성공했습니다.');
            setIsCertified(true);
            setShowCertificationInput(false); // 인증번호 필드 숨기기
            setIsTimerRunning(false); // 타이머 정지
        } else {
            setModalMessage('인증에 실패했습니다. 다시 시도해주세요.');
            setIsCertified(false);
            setShowCertificationInput(false);
            setIsTimerRunning(false);
        }

        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage(''); // 메시지 초기화
    };

    // 가정된 API 호출 함수 (실제 API 로직으로 대체 필요)
    const checkIdDuplicate = async (userId) => {
        // 예시로 간단히 중복 체크를 시뮬레이션 (여기서 실제 API 요청을 구현하세요)
        const dummyExistingIds = ['sieun1156', 'test2003'];
        return dummyExistingIds.includes(userId);
    };

    const checkPhoneDuplicate = async (phone) => {
        const dummyExistingPhones = ['01012345678', '01040785939'];
        return dummyExistingPhones.includes(phone);
    };

    const checkEmailDuplicate = async (email) => {
        const dummyExistingEmails = [
            'existingemail@domain.com',
            'test3@example.com',
        ];
        return dummyExistingEmails.includes(email);
    };

    return (
        <FormContainer
            noValidate
            onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
        >
            <TitleLabel>회원가입</TitleLabel>
            {/*아이디 */}
            <InputContainer>
                <Label>
                    아이디<Asterisk>*</Asterisk>
                </Label>

                <InputField
                    id="userId"
                    type="text"
                    placeholder="아이디"
                    {...register('userId', {
                        required: '아이디는 필수 입력입니다.',
                        minLength: {
                            value: 6,
                            message:
                                '6자 이상 16자 이하의 영문 혹은 숫자를 조합해주세요.',
                        },
                        maxLength: {
                            value: 16,
                            message:
                                '6자 이상 16자 이하의 영문 혹은 숫자를 조합해주세요.',
                        },
                    })}
                    onChange={(e) => {
                        register('userId').onChange(e);
                        trigger('userId');
                    }}
                    aria-invalid={errors.userId ? 'true' : 'false'}
                />
                <BtnStyled>
                    <Button
                        width="170px"
                        height="65px"
                        borderRadius="10px"
                        fontSize="20px"
                        text="중복확인"
                        type="button" // 버튼 타입을 submit에서 button으로 변경
                        onClick={handleIdCheck} // 중복 확인 버튼 클릭 시 호출
                        disabled={
                            isCheckingId ||
                            isIdChecked ||
                            !!errors.userId ||
                            !watch('userId')
                        }
                    />
                </BtnStyled>
            </InputContainer>
            <ErrorStyled>
                {errors.userId && (
                    <ErrorMessage>{errors.userId.message}</ErrorMessage>
                )}
            </ErrorStyled>

            <InputContainer>
                <Label>
                    비밀번호<Asterisk>*</Asterisk>
                </Label>
                <InputField
                    id="password"
                    type="password"
                    placeholder="*********"
                    {...register('password', {
                        required: '비밀번호는 필수 입력입니다.',
                        minLength: {
                            value: 10,
                            message: '최소 10자 이상 입력해주세요.',
                        },
                        validate: {
                            containsSpecialChar: (value) =>
                                /(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?~-])/.test(
                                    value
                                ) || '특수 문자가 포함되어야 합니다.',
                            containsNumber: (value) =>
                                /(?=.*\d)/.test(value) ||
                                '숫자가 포함되어야 합니다.',
                            containsLetter: (value) =>
                                /(?=.*[a-zA-Z])/.test(value) ||
                                '영문자가 포함되어야 합니다.',
                        },
                    })}
                    onChange={(e) => {
                        register('password').onChange(e);
                        trigger('password'); // 유효성 검사 트리거
                    }}
                    aria-invalid={errors.password ? 'true' : 'false'}
                />
            </InputContainer>
            <ErrorStyled>
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </ErrorStyled>

            <InputContainer>
                <Label>
                    비밀번호 확인<Asterisk>*</Asterisk>
                </Label>
                <InputField
                    id="PasswordConfirm"
                    type="password"
                    placeholder="비밀번호 확인"
                    {...register('passwordConfirm', {
                        required: '동일한 비밀번호를 입력해주세요.',
                        validate: {
                            matchesPreviousPassword: (value) =>
                                value === watch('password') ||
                                '비밀번호가 일치하지 않습니다.',
                        },
                    })}
                    onChange={(e) => {
                        register('passwordConfirm').onChange(e);
                        trigger('passwordConfirm'); // 유효성 검사 트리거
                    }}
                    aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
                />
            </InputContainer>
            <ErrorStyled>
                {errors.passwordConfirm && (
                    <ErrorMessage>
                        {errors.passwordConfirm.message}
                    </ErrorMessage>
                )}
            </ErrorStyled>
            {/* 이름 */}
            <InputContainer>
                <Label>
                    이름<Asterisk>*</Asterisk>
                </Label>

                <InputField
                    id="userName"
                    type="text"
                    placeholder="이름"
                    {...register('userName', {
                        required: '이름은 필수 입력입니다.',
                    })}
                    onChange={(e) => {
                        register('userName').onChange(e);
                        trigger('userName'); // 유효성 검사 트리거
                    }}
                    aria-invalid={errors.userName ? 'true' : 'false'}
                />
            </InputContainer>
            <ErrorStyled>
                {errors.userName && (
                    <ErrorMessage>{errors.userName.message}</ErrorMessage>
                )}
            </ErrorStyled>

            {/* 전화번호 */}
            <InputContainer>
                <Label>
                    전화번호<Asterisk>*</Asterisk>
                </Label>

                <InputField
                    id="phone"
                    type="tel"
                    placeholder="숫자만 입력해주세요."
                    {...register('phone', {
                        required: '숫자만 입력해주세요.',
                        pattern: {
                            value: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
                            message: '010-1234-5678 형식으로 입력해주세요.',
                        },
                    })}
                    onInput={(e) => {
                        // 숫자 외의 문자를 제거
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                    onChange={(e) => {
                        // 값 변경 시 유효성 검사 트리거하지 않도록 수정
                        register('phone').onChange(e);
                        trigger('phone');
                    }}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                />
                <BtnStyled>
                    <Button
                        width="170px"
                        height="65px"
                        borderRadius="10px"
                        fontSize="20px"
                        text="중복확인"
                        type="button" // 버튼 타입을 submit에서 button으로 변경
                        onClick={handlePhoneCheck}
                        disabled={
                            isCheckingPhone ||
                            isPhoneChecked ||
                            !!errors.phone ||
                            !watch('phone')
                        }
                    />
                </BtnStyled>
            </InputContainer>
            <ErrorStyled>
                {errors.phone && (
                    <ErrorMessage>{errors.phone.message}</ErrorMessage>
                )}
            </ErrorStyled>

            {/* 이메일 */}
            <InputContainer>
                <Label>
                    이메일<Asterisk>*</Asterisk>
                </Label>

                <InputField
                    id="email"
                    type="email"
                    placeholder="ex) yeogida@travel.com"
                    {...register('email', {
                        required: '이메일은 필수 입력입니다.',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: '이메일 형식이 맞지 않습니다',
                        },
                    })}
                    onChange={(e) => {
                        register('email').onChange(e);
                        trigger('email'); // 유효성 검사 트리거
                    }}
                    aria-invalid={errors.email ? 'true' : 'false'}
                />
                <BtnStyled>
                    <Button
                        width="170px"
                        height="65px"
                        borderRadius="10px"
                        fontSize="20px"
                        text="인증번호 받기"
                        type="button" // 버튼 타입을 submit에서 button으로 변경
                        onClick={handleEmailCheck}
                        disabled={
                            isEmailDisabled || !!errors.email || !watch('email')
                        }
                    />
                </BtnStyled>
            </InputContainer>

            <ErrorStyled>
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </ErrorStyled>
            {/* 인증번호 */}
            {showCertificationInput && (
                <InputContainer>
                    <Label></Label>

                    <InputField
                        id="certificationNum"
                        type="tel"
                        placeholder="인증번호 6자리를 입력해주세요."
                        {...register('certificationNum', {
                            maxLength: { value: 6 },
                        })}
                        onChange={(e) => {
                            register('certificationNum').onChange(e);
                            trigger('certificationNum'); // 유효성 검사 트리거
                        }}
                        aria-invalid={
                            errors.certificationNum ? 'true' : 'false'
                        }
                    />
                    <BtnStyled>
                        <Button
                            width="170px"
                            height="65px"
                            borderRadius="10px"
                            fontSize="20px"
                            text="인증번호 확인"
                            type="button" // 버튼 타입을 submit에서 button으로 변경
                            onClick={handleCertificationCheck}
                            disabled={!watch('certificationNum')}
                        />
                    </BtnStyled>
                    {/* 타이머가 작동 중일 때만 타이머 표시 */}
                    {isTimerRunning && (
                        <TimerStyled>
                            {Math.floor(timer / 60)}:{timer % 60}
                        </TimerStyled>
                    )}
                </InputContainer>
            )}

            {/* 닉네임 */}

            {/* 생년월일 */}

            <Button
                width="490px"
                height="80px"
                borderRadius="10px"
                fontSize="26px"
                text="회원가입"
                type="submit"
                disabled={isSubmitting}
            />

            {/* Modal for alerts */}
            <CommonModal
                isOpen={isModalOpen}
                onRequestClose={closeModal} // Changed from onClose to onRequestClose
                title={modalMessage}
            />
        </FormContainer>
    );
}

export default SignUp;
