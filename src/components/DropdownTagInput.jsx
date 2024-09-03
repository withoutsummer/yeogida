import React from 'react';
import Select from 'react-select';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin-left: 10px;
`;

const customStyles = {
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#F4A192', // 태그 배경 색상
        borderRadius: '25px',
        padding: '2px 5px',
        margin: '2px',
        boxSizing: 'border-box'
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: '#fff' // 태그 텍스트 색상
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: '#fff', // 태그 제거 버튼 색상
        cursor: 'pointer',
        ':hover': {
            color: '#FC6449' // 태그 제거 버튼 호버 색상
        }
    }),
    control: (base, state) => ({
        ...base,
        minHeight: '44px', // 드롭다운 최소 높이 설정
        border: '1px solid #ccc', // 드롭다운 테두리 색상
        boxShadow: 'none', // 드롭다운 그림자 제거
        borderRadius: '4px',
        ':focus': {
            borderColor: '#F4A192', // 포커스 시 드롭다운 테두리 색상
            boxShadow: `0 0 0 1px #F4A192` // 포커스 시 그림자 색상
        }
    })
};

export default function TagDropdownInput({ tags, setTags, options }) {
    const handleSelectChange = (selectedOptions) => {
        const newTags = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setTags(newTags);
    };

    return (
        <InputContainer>
            <Select
                isMulti
                options={options}
                onChange={handleSelectChange}
                placeholder="공유자를 선택하세요"
                value={options.filter(option => tags.includes(option.value))}
                styles={customStyles} // 커스텀 스타일 적용
            />
        </InputContainer>
    );
}
