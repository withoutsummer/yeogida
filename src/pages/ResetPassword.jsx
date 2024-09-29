import React, { useState, useEffect } from 'react';
import FindInput from '../components/FindInputField';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Btn';
import styled from 'styled-components';
import CommonModal from '../components/CommonModal';

const ResetForm = styled.div`
    box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
    min-width: 1050px;
    padding: 50px 0px;
`;

const TitleStyle = styled.h3`
    font-weight: bold;
    font-size: 40px;
    text-align: center;
`;

const ResetInput = styled.div`
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

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: '',
    });

    const [errors, setErrors] = useState({
        password: '',
        passwordConfirm: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [navigateTo, setNavigateTo] = useState('');
    const navigate = useNavigate();

    // 비밀번호 유효성 검사
    const validate = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'password':
                if (value.length < 10) {
                    error = '비밀번호는 최소 10자 이상이어야 합니다.';
                } else if (
                    !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?~-])/.test(
                        value
                    )
                ) {
                    error =
                        '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.';
                }
                break;
            case 'passwordConfirm':
                if (value !== formData.password) {
                    error = '비밀번호가 일치하지 않습니다.';
                }
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

    // 폼 유효성 검사
    const isFormValid = () => {
        return (
            !errors.password &&
            !errors.passwordConfirm &&
            formData.password.length >= 10 &&
            formData.passwordConfirm === formData.password
        );
    };

    // 모달 열기
    const openModal = (title, navigateToPage = '') => {
        setModalTitle(title);
        setNavigateTo(navigateToPage);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 서버로 데이터 전송
    const handleSubmit = async () => {
        if (isFormValid()) {
            try {
                const response = await fetch('/users/reset-pw?token=${token}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newPassword: formData.password,
                        newPasswordCheck: formData.passwordConfirm,
                    }),
                });

                if (response.ok) {
                    openModal(
                        '비밀번호가 성공적으로 변경되었습니다.',
                        '/login'
                    );
                } else {
                    openModal('비밀번호 변경에 실패했습니다.');
                }
            } catch (error) {
                openModal('서버 오류가 발생했습니다.');
            }
        }
    };

    return (
        <ResetForm>
            <TitleStyle>비밀번호 재설정</TitleStyle>
            <ResetInput>
                <TitleLabel>새 비밀번호</TitleLabel>
                <FindInput
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요."
                    height="80px"
                    marginbottom="40px"
                    onChange={handleChange}
                    value={formData.password}
                    error={!!errors.password}
                    errorMessage={errors.password}
                />
                <TitleLabel>비밀번호 확인</TitleLabel>
                <FindInput
                    type="password"
                    id="passwordConfirm"
                    placeholder="비밀번호를 한번 더 입력해주세요."
                    height="80px"
                    marginbottom="40px"
                    onChange={handleChange}
                    value={formData.passwordConfirm}
                    error={!!errors.passwordConfirm}
                    errorMessage={errors.passwordConfirm}
                />
                <ButtonStyle>
                    <Button
                        width="490px"
                        height="80px"
                        borderRadius="10px"
                        fontSize="26px"
                        text="비밀번호 변경"
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
            </ResetInput>
        </ResetForm>
    );
}
