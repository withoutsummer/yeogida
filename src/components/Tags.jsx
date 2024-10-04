import React from 'react';
import styled from "styled-components";

const TagsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
`;

const Tag = styled.div`
    height: 30px;
    width: 60px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background-color: #59ABE6;
    border-radius: 25px;
    font-size: 16px;
    color: #fff;
    font-family: NanumGothic;
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