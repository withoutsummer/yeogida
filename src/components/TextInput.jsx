import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: 490px;
    height: ${({ height }) => height || '65px'};
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 0 20px;
    margin-bottom: ${({ marginbottom }) => marginbottom || '40px'};
    font-size: 20px;
    transition: border-color 0.1s ease, border-width 0.1s ease;

    &:focus {
        border: 1px solid #828282;
        outline: none; /* 기본 포커스 아웃라인 제거 */
    }
`;

export default function TextInput({
    type,
    id,
    placeholder,
    autoFocus,
    height,
    marginbottom,
}) {
    return (
        <StyledInput
            type={type}
            id={id}
            placeholder={placeholder}
            autoFocus={autoFocus}
            height={height} // height prop 전달
            marginbottom={marginbottom}
        />
    );
}
