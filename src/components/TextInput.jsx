import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: ${({ width }) => width || '450px'};
    height: ${({ height }) => height || '65px'};
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 0 20px;
    margin-bottom: ${({ marginbottom }) => marginbottom || '0px'};
    font-size: ${({ fontSize }) => fontSize || '20px'};
    transition: border-color 0.1s ease, border-width 0.1s ease;

    &:focus {
        border: 1px solid #59abe6;
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
    onChange, // onChange 핸들러 추가
    onFocus, // onFocus 핸들러 추가
    value, // value prop 추가
    disabled = false,
}) {
    return (
        <StyledInput
            type={type}
            id={id}
            placeholder={placeholder}
            autoFocus={autoFocus}
            height={height} // height prop 전달
            marginbottom={marginbottom}
            onChange={onChange} // onChange 핸들러 전달
            onFocus={onFocus} // onFocus 핸들러 전달
            value={value} // value prop 전달
            disabled={disabled}
        />
    );
}
