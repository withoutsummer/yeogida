import React from 'react';
import styled from "styled-components";

const TagsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    padding: 10px;
    max-width: 100%; /* 최대 너비 설정 */
`;

const Tag = styled.div`
    height: 30px;
    min-width: 60px; /* 최소 너비를 설정 */
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2px;
    background-color: #59ABE6;
    border-radius: 25px;
    font-size: 16px;
    color: #fff;
    font-family: NanumGothic;
    white-space: nowrap;
`;

export default function Tags({ tags }) {
    return (
        <TagsContainer>
            {tags.map((tag, index) => (
                <Tag key={index}>
                    {tag}
                </Tag>
            ))}
        </TagsContainer>
    );
}