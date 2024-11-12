import React from 'react';
import Modal from 'react-modal';
import Button from './Btn';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const ModalContent = styled.div`
    display: flex;
    width: 390px;
    height: 385px;
    padding: var(--Spacing-S, 24px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background: #FFF;

    svg {
        display: flex;
        padding: 24px;
        align-items: center;
        gap: 10px;
    }
`;

const ModalWrapper = styled.div`
    align-self: stretch;
    color: #000;
    text-align: center;
    font-family: NanumGothic;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 87.5% */
    margin-bottom: 16px; /* 타이틀과 Body 사이 간격 */
    padding: 24px;
`;

const BodyText = styled.div`
    width: 350px;
    color: #000;
    text-align: center;
    font-family: NanumGothic;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 131.25% */
    margin-bottom: 40px; /* Body와 버튼 사이 간격 */
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 24px;
    gap: 16px;
    color: #000;
    text-align: center;
    font-family: NanumGothic;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 87.5% */
`;

const YesButton = styled.button`
    width: 115px;
    height: 40px;
    border-radius: 8px;
    background-color: #59ABE6;
    border: 1px solid #E0E0E0;
    display: flex;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    color: #FFF;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 131.25% */
    &:hover {
        background-color: #0D90EE;
    }
`;

const NoButton = styled.button`
    display: flex;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    width: 115px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #E0E0E0;
    background-color: #fff;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    &:hover {
        background-color: #0D90EE;
        color: #fff;
    }
`;

// 모달의 루트 엘리먼트 설정
Modal.setAppElement('#root');

const YesNoModal = ({
    isOpen,
    onRequestClose,
    title,
    bodyText,
    navigateTo,
}) => {
    const navigate = useNavigate();

    const handleConfirm = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1500,   /* 헤더보다 위로 설정 */
                },
                content: {
                    display: 'flex',
                    width: "400px",
                    height: "380px",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    inset: 'auto',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '24px',
                    overflow: 'hidden'
                }
            }}
        >
            <ModalContent>
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="51" viewBox="0 0 52 51" fill="none">
                    <path d="M25.9998 48.8346C38.8865 48.8346 49.3332 38.388 49.3332 25.5013C49.3332 12.6147 38.8865 2.16797 25.9998 2.16797C13.1132 2.16797 2.6665 12.6147 2.6665 25.5013C2.6665 38.388 13.1132 48.8346 25.9998 48.8346Z" stroke="#0579A4" stroke-width="4"/>
                    <path d="M26 36.0026V37.1693M26 13.8359V27.8359V13.8359Z" stroke="#0579A4" stroke-width="4" stroke-linecap="round"/>
                </svg>
                <ModalWrapper>{title}</ModalWrapper>
                <BodyText>{bodyText}</BodyText>                
                <ButtonWrapper>
                    <YesButton onClick={handleConfirm}>확인</YesButton>
                    <NoButton onClick={onRequestClose}>취소</NoButton>
                </ButtonWrapper>
            </ModalContent>
        </Modal>
    );
};

export default YesNoModal;
