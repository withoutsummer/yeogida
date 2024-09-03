import React from 'react';
import Modal from 'react-modal';
import Button from './Btn';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트

// 모달의 루트 엘리먼트 설정
Modal.setAppElement('#root');

const CommonModal = ({
    isOpen,
    onRequestClose,
    title,
    children,
    navigateTo,
}) => {
    const navigate = useNavigate(); // navigate 훅 사용

    const handleConfirm = () => {
        if (navigateTo) {
            navigate(navigateTo); // navigateTo가 주어지면 해당 페이지로 이동
        }
        onRequestClose(); // 모달 닫기
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000,
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px',
                },
            }}
        >
            <div
                style={{
                    fontSize: '24px',
                    marginBottom: '40px',
                    textAlign: 'center',
                }}
            >
                {title}
            </div>
            <Button
                onClick={handleConfirm}
                width="400px"
                height="50px"
                borderRadius="10px"
                fontSize="18px"
                backgroundColor="#F4A192"
                hoverBackgroundColor="#E78B7A" // 호버 시 변경할 배경색
                text="확 인"
            />
            <div>{children}</div>
        </Modal>
    );
};

export default CommonModal;
