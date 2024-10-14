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
    font-size: 36px;
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
        border: 1px solid #59abe6;
        outline: none; /* 기본 포커스 아웃라인 제거 */
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
    color: red;
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

        try {
            const response = await checkIdDuplicate(userIdValue);

            if (response.status === 200) {
                setModalMessage(response.message); // '사용할 수 있는 아이디입니다.' 메시지 설정
                setIsIdChecked(true);
            } else if (response.status === 409) {
                setModalMessage(response.message); // '이미 사용 중인 아이디입니다.' 메시지 설정
                setIsIdChecked(false);
            }
        } catch (error) {
            setModalMessage(
                '아이디 확인 중 오류가 발생했습니다. 다시 시도해주세요.'
            );
        }

        setIsModalOpen(true);
        setIsCheckingId(false);
    };

    //ID API 호출
    const checkIdDuplicate = async (userId) => {
        try {
            console.log('ID 중복 확인 요청:', userId); // 요청을 보내기 전 로그 출력

            const bodyData = JSON.stringify({ id: userId });
            console.log('요청 본문 (body):', bodyData); // 요청 본문 로그 출력

            const response = await fetch(
                'https://yeogida.net/users/verify-id',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // 요청 헤더 설정
                    },
                    body: bodyData, // 요청 본문에 userId 전달
                }
            );

            console.log('서버 응답 상태 코드:', response.status); // 서버 응답 상태 코드 출력

            // 서버 응답 처리
            if (!response.ok) {
                console.error(
                    'HTTP 에러 발생:',
                    response.status,
                    response.statusText
                ); // 에러 로그 출력
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('서버 응답 데이터:', responseData); // 서버로부터의 응답 데이터 출력

            return responseData; // 서버로부터의 응답 데이터 반환
        } catch (error) {
            console.error('ID 중복 확인 중 에러 발생:', error); // 에러 발생 시 에러 로그 출력
            throw error; // 에러 다시 던지기
        }
    };

    // 전화번호 체크
    const handlePhoneCheck = async (event) => {
        event.preventDefault();
        const phoneValue = watch('phone');

        // 전화번호 필드만 유효성 검사 (trigger 함수 호출)
        const isPhoneValid = await trigger('phone');

        // 빈 값이면 유효성 검사를 하지 않음
        if (!isPhoneValid || !phoneValue) {
            return;
        }
        setIsCheckingPhone(true);

        try {
            const response = await checkPhoneDuplicate(phoneValue);
            if (response.status === 200) {
                setModalMessage(response.message);
                setIsPhoneChecked(true);
            } else if (response.status === 409) {
                setModalMessage(response.message);
                setIsPhoneChecked(false);
            }
        } catch (error) {
            setModalMessage(
                '전화번호 확인 중 오류가 발생했습니다. 다시 시도해주세요.'
            );
        }

        setIsModalOpen(true);
        setIsCheckingPhone(false);
    };

    //전화번호 API 요청
    const checkPhoneDuplicate = async (phone) => {
        const response = await fetch('/users/verify-phone', {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
            },
            body: JSON.stringify({ phonenumber: phone }),
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };

    // 이메일 체크 및 인증번호 요청 함수
    const handleEmailCheck = async (email, userName) => {
        const emailValue = watch('email');
        const nameValue = watch('userName'); // Assuming you have a name input field as well
        const isEmailValid = await trigger('email');
        const isNameValid = await trigger('userName');

        if (!isEmailValid || !emailValue || !isNameValid || !nameValue) {
            return;
        }

        setIsCheckingEmail(true);

        try {
            // API 요청
            const response = await fetch('/users/signup-sendnum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: userName,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setModalMessage(data.message);
                setIsEmailDisabled(true);
                setTimer(180);
                setIsTimerRunning(true);
                setShowCertificationInput(true); // 인증번호 입력 필드 표시
            } else if (response.status === 409) {
                setModalMessage('기존에 회원가입한 이메일입니다.');
            } else if (response.status === 500) {
                setModalMessage('500 서버 에러 발생');
            } else {
                setModalMessage('알 수 없는 오류가 발생했습니다.');
            }

            setIsModalOpen(true); // 모달을 띄움
        } catch (error) {
            setModalMessage(
                '서버와 연결할 수 없습니다. 나중에 다시 시도해주세요.'
            );
            setIsModalOpen(true); // 모달을 띄움
        } finally {
            setIsCheckingEmail(false);
        }
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

    const handleCertificationCheck = async (email, certificationNum) => {
        try {
            const response = await fetch('/users/verify-number', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    code: certificationNum,
                }),
            });
            if (response.status === 200) {
                const result = await response.json();
                setModalMessage(result.message); // 성공 메시지
                setIsModalOpen(true);
            } else {
                const errorData = await response.json();
                switch (response.status) {
                    case 404:
                        setModalMessage(errorData.message); // 이미 회원가입 된 개인정보
                        break;
                    case 400:
                        setModalMessage(errorData.message); // 비밀번호 불일치
                        break;
                    case 500:
                        setModalMessage(errorData.message); // 비밀번호 불일치
                        break;
                    default:
                        setModalMessage('인증에 실패했습니다.');
                }
                setIsModalOpen(true);
            }
        } catch (error) {
            setModalMessage('인증에 실패했습니다. 다시 시도해주세요.');
            setIsModalOpen(true);
        }
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage(''); // 메시지 초기화
    };

    // 회원가입 처리
    const onSubmit = async (
        userId,
        password,
        passwordCheck,
        userName,
        phone,
        email,
        nickName,
        birth
    ) => {
        try {
            const response = await fetch(
                '/users/signup', // API 경로
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // 요청 헤더
                    },
                    body: JSON.stringify({
                        id: userId,
                        password: password,
                        passwordCheck: passwordCheck,
                        name: userName,
                        phonenumber: phone,
                        nickName: nickName,
                        birth: birth,
                    }), // 유효한 데이터 전송
                }
            );

            if (response.status === 201) {
                const result = await response.json();
                setModalMessage('회원가입에 성공하셨습니다.'); // 성공 메시지
                setIsModalOpen(true);
            } else {
                const errorData = await response.json();
                switch (response.status) {
                    case 409:
                        setModalMessage(errorData.message); // 이미 회원가입 된 개인정보
                        break;
                    case 400:
                        setModalMessage(errorData.message); // 비밀번호 불일치
                        break;
                    default:
                        setModalMessage('회원가입에 실패했습니다.');
                }
                setIsModalOpen(true);
            }
        } catch (error) {
            setModalMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
            setIsModalOpen(true);
        }
    };

    return (
        <FormContainer noValidate onSubmit={handleSubmit(onSubmit)}>
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
                    id="passwordCheck"
                    type="password"
                    placeholder="비밀번호 확인"
                    {...register('passwordCheck', {
                        required: '동일한 비밀번호를 입력해주세요.',
                        validate: {
                            matchesPreviousPassword: (value) =>
                                value === watch('password') ||
                                '비밀번호가 일치하지 않습니다.',
                        },
                    })}
                    onChange={(e) => {
                        register('passwordCheck').onChange(e);
                        trigger('passwordCheck'); // 유효성 검사 트리거
                    }}
                    aria-invalid={errors.passwordCheck ? 'true' : 'false'}
                />
            </InputContainer>
            <ErrorStyled>
                {errors.passwordCheck && (
                    <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
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
                            isEmailDisabled ||
                            !!errors.email ||
                            !!errors.userName ||
                            !watch('email') ||
                            !watch('userName')
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
            <InputContainer>
                <Label>
                    닉네임<Asterisk>*</Asterisk>
                </Label>

                <InputField
                    id="nickName"
                    type="text"
                    placeholder="닉네임"
                    {...register('nickName', {
                        required: '닉네임은 필수 입력입니다.',
                    })}
                    onChange={(e) => {
                        register('nickName').onChange(e);
                        trigger('nickName'); // 유효성 검사 트리거
                    }}
                    aria-invalid={errors.nickName ? 'true' : 'false'}
                />
            </InputContainer>
            <ErrorStyled>
                {errors.nickName && (
                    <ErrorMessage>{errors.nickName.message}</ErrorMessage>
                )}
            </ErrorStyled>

            {/* 생년월일 */}
            <InputContainer>
                <Label>
                    생년월일<Asterisk>*</Asterisk>
                </Label>

                <InputField
                    id="birth"
                    type="date"
                    placeholder="생년월일"
                    {...register('birth', {
                        required: '생년월일은 필수 입력입니다.',
                        pattern: {
                            value: /^\d{4}-\d{2}-\d{2}$/,
                            message: '유효한 생년월일을 입력해주세요.',
                        },
                    })}
                    onChange={(e) => {
                        register('birth').onChange(e);
                        trigger('birth'); // 유효성 검사 트리거
                    }}
                    aria-invalid={errors.birth ? 'true' : 'false'}
                />
            </InputContainer>
            <ErrorStyled>
                {errors.birth && (
                    <ErrorMessage>{errors.birth.message}</ErrorMessage>
                )}
            </ErrorStyled>

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
