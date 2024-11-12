import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 190px;
    height: 65px;
    border: 1px solid #f4a192;
    border-radius: 10px;
    padding: 0 10px;
    color: white;
    font-weight: 400;
    font-size: 20px;
    cursor: pointer;
    margin-left: 20px;
    transition: background 0.2s ease, color 0.2s ease;
    background: #f4a192;
    color: white;

    &:hover {
        background: #f89a89;
    }
`;

export default function SUbButton({
    onClick,
    children,
    primary,
    disabled = false,
}) {
    return (
        <StyledButton onClick={onClick} primary={primary} disabled={disabled}>
            {children}
        </StyledButton>
    );
}
