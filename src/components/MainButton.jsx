import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 320px;
    height: 50px;
    border: 1px solid #f4a192;
    border-radius: 10px;
    padding: 0 10px;
    color: white;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: background 0.2s ease, color 0.2s ease;
    background: ${(props) => (props.primary ? '#F4A192' : 'white')};
    color: ${(props) => (props.primary ? 'white' : '#f4a192')};

    &:hover {
        background: ${(props) => (props.primary ? '#EE9484' : '#f4a192')};
        color: ${(props) => (props.primary ? 'white' : 'white')};
    }
`;

export default function MainButton({ onClick, children, primary }) {
    return (
        <StyledButton onClick={onClick} primary={primary}>
            {children}
        </StyledButton>
    );
}
