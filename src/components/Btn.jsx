import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button.attrs(({ style }) => ({
    style: style || {},
}))`
    width: ${({ width }) => width || '63px'};
    height: ${({ height }) => height || '41px'};
    border-radius: ${({ borderRadius }) => borderRadius || '8px'};
    color: ${({ color }) => color || '#fff'};
    background-color: ${({ backgroundColor }) => backgroundColor || '#59ABE6'};
    border-color: ${({ borderColor }) => borderColor || '#59ABE6'};
    font-size: ${({ fontSize }) => fontSize || '16px'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) =>
        disabled ? 0.5 : 1}; /* 비활성화 시 투명도 조정 */
    transition: background-color 0.2s, color 0.3s;

    font-weight: ${({ fontWeight }) => fontWeight || 'regular'};
    cursor: pointer;
    border-width: 1px;
    border-style: solid;

    &:hover {
        background-color: ${({ hoverBackgroundColor, disabled }) =>
            disabled ? undefined : hoverBackgroundColor || '#0D90EE'};
        color: ${({ hoverColor, disabled }) =>
            disabled ? undefined : hoverColor || 'white'};
        border-color: ${({ hoverBorderColor, disabled }) =>
            disabled
                ? undefined
                : hoverBorderColor || '#0D90EE'}; // 호버 시 테두리 색상 변경
    }
`;

export default function BtnPink({
    width,
    height,
    borderRadius,
    color,
    backgroundColor,
    borderColor,
    fontSize,
    fontWeight,
    style,
    text,
    onClick = () => {},
    hoverBackgroundColor,
    hoverColor,
    hoverBorderColor,
    disabled = false, // disabled props 추가 및 기본값 설정
}) {
    return (
        <StyledButton
            width={width}
            height={height}
            borderRadius={borderRadius}
            color={color}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            style={style}
            onClick={onClick}
            hoverBackgroundColor={hoverBackgroundColor}
            hoverColor={hoverColor}
            hoverBorderColor={hoverBorderColor}
            disabled={disabled} // disabled 속성 전달
        >
            {text}
        </StyledButton>
    );
}
