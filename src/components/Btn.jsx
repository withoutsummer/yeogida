import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button.attrs(({ style }) => ({
    style: style || {},
}))`
    width: ${({ width }) => width || '63px'};
    height: ${({ height }) => height || '41px'};
    border-radius: ${({ borderRadius }) => borderRadius || '8px'};
    color: ${({ color }) => color || '#fff'};
    background-color: ${({ backgroundColor }) => backgroundColor || '#F4A192'};
    border-color: ${({ borderColor }) => borderColor || '#e0e0e0'};
    font-size: ${({ fontSize }) => fontSize || '16px'};

    font-weight: ${({ fontWeight }) => fontWeight || 'regular'};
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
`;


export default function BtnPink({ width, height, borderRadius, color, backgroundColor, borderColor, fontSize, fontWeight, style, text, onClick }) {
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
        onClick={onClick}>
            {text}
        </StyledButton>
    )
}