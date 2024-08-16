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
    margin-left: 18px;
    transition: background 0.2s ease, color 0.2s ease;
    background: #f4a192;
    color: white;

    &:hover {
        background: #ee9484;
    }
`;

export default function SUbButton({ onClick, children, primary }) {
    return (
        <StyledButton onClick={onClick} primary={primary}>
            {children}
        </StyledButton>
    );
}
