import React, { useState } from 'react';
import styled from "styled-components";

const TagInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin-left: 10px;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    margin-top: 2px;
    margin-right: 5px;
    background-color: #59ABE6;
    border-radius: 25px;
    font-size: 16px;
    color: #fff;
    font-family: NanumGothic;
`;

const RemoveTag = styled.button`
    border: none;
    background: transparent;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    margin-left: 8px;
    padding: 0;
    line-height: 1;
`;

const TagInputField = styled.input`
    width: 300px;
    min-height: 44px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    color: #000;
    font-family: NanumGothic;
    background-color: #fff;
    
    &:focus {
        outline: none; /* 기본 포커스 윤곽선 제거 */
        border: 1px solid #424242; /* 포커스 시 테두리 색상 */
        background-color: #fff; /* 포커스 시 배경색 유지 */
    }
`;

export default function TagInput({ tags, setTags }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedValue = inputValue.trim();
            if (trimmedValue && !tags.includes(trimmedValue)) {
                setTags([...tags, trimmedValue]);
                setInputValue('');
            }
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <TagInputContainer>
            <TagInputField
                placeholder="여행지 입력 후, 엔터키를 눌러주세요."
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <Tags>
                {tags.map(tag => (
                    <Tag key={tag}>
                        {tag}
                        <RemoveTag onClick={() => handleRemoveTag(tag)} aria-label={`Remove ${tag}`}>x</RemoveTag>
                    </Tag>
                ))}
            </Tags>
        </TagInputContainer>
    );
}