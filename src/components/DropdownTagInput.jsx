import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

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
        backgroundColor: '#59ABE6', // 태그 배경 색상
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
            color: '#0579A4' // 태그 제거 버튼 호버 색상
        }
    }),
    control: (base, state) => ({
        ...base,
        minHeight: '44px', // 드롭다운 최소 높이 설정
        border: '1px solid #ccc', // 드롭다운 테두리 색상
        borderColor: '#ccc',
        boxShadow: 'none', // 드롭다운 그림자 제거
        borderRadius: '4px',
        ':focus': {
            borderColor: '#59ABE6', // 포커스 시 드롭다운 테두리 색상
            boxShadow: `0 0 0 1px #59ABE6`, // 포커스 시 그림자 색상
        },
        ':hover': {
            borderColor: '#424242'
        }
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
    }),
    menuList: (base) => ({
        ...base,
        padding: 0,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? '#59ABE6' : '#fff', // 호버 색상
        color: state.isFocused ? '#fff' : '#000', // 텍스트 색상
        ':active': {
            backgroundColor: '#59ABE6',
            color: '#fff'
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