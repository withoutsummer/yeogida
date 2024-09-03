import React, {useState} from 'react';
import styled from 'styled-components';
import eyeIcon from '../assets/icons/eye_icon.png';
import eyeHideIcon from '../assets/icons/eye_hide_icon.png';

const Container = styled.div.attrs(props => ({
    style: props.style, // 외부에서 전달된 style props를 병합
}))`
    position: relative;
    width: 490px;
`;

const PasswordInput = styled.input`
    width: 100%;
    height: 65px;
    border-radius: 15px;
    border: 1px solid #707070;
    color: #000;
    padding-left: 20px;
    padding-right: 50px;
    font-size: 20px;
    box-sizing: border-box;

    &::placeholder {
        color: #707070;
    }

    &:focus {
        outline: none;
    }
`;

const EyeIconButton = styled.button`
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BasicInput = styled.input`
    width: 100%;
    height: 65px;
    border-radius: 15px;
    border: 1px solid #707070;
    color: #000;
    padding-left: 20px;
    font-size: 20px;
    box-sizing: border-box;

    &::placeholder {
        color: #707070;
    }

    &:focus {
        outline: none;
    }
`;

export default function InputPassword({ type = 'text', placeholder, style }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container style={style}>
            {type === 'password' ? (
                <>
                    <PasswordInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder={placeholder}
                    />
                    <EyeIconButton type="button" onClick={handleTogglePasswordVisibility}>
                        <img
                            src={showPassword ? eyeHideIcon : eyeIcon}
                            alt="비밀번호 표시 여부"
                            style={{
                                width: '100%',
                                height: '100%',
                                // 눈 모양 아이콘 색깔 #707070으로 변경
                                filter: 'invert(44%) sepia(1%) saturate(2129%) hue-rotate(314deg) brightness(94%) contrast(73%)'
                            }}
                        />
                    </EyeIconButton>
                </>
            ) : (
                <BasicInput
                    type={type}
                    placeholder={placeholder}
                />
            )}
        </Container>
    );
}

