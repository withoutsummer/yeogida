import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DateInput from '../components/DateInput';
import TagInput from '../components/TagInput';
import DropdownTagInput from '../components/DropdownTagInput';

const NewTripContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NewTripForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px; /* Form width 제한 */
    margin-top: 30px;
`;

const FormLabel = styled.label`
    width: 100%;
    line-height: 21px;
    font-family: NanumGothic;
    color: #000;
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-bottom: 15px; /* 폼 요소 간의 간격 */
`;

const FormLabelText = styled.h4`
    flex: 1;
    font-size: 18px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormInput = styled.input`
    width: 300px;
    height: 44px;
    padding: 8px;
    margin-left: 10px;
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

const ModalButton = styled.button`
    width: 100px;
    display: inline-flex;
    margin: 10px;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #F6F6F6;
    color: #000;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
    border: none; /* 버튼 선 없애기 */
    &:hover {
        background-color: #F4A192;
        color: #FFF; /* 호버 시 텍스트 컬러 */
    }
`;

export default function Newtrip({ closeModal }) {
    const sharedOptions = [
        { value: 'user1', label: 'User 1' },
        { value: 'user2', label: 'User 2' },
        { value: 'user3', label: 'User 3' },
    ];

    const [inputs, setInputs] = useState({
        제목: "",
        기간: "",
        여행지: [], // 여행지 태그로 저장
        공유자: [], // 공유자 태그로 저장
        썸네일: "", // 파일명을 저장
    });

    const { 제목, 기간, 여행지, 공유자, 썸네일 } = inputs;
    const navigate = useNavigate();

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const handleTagsChange = (type, tags) => {
        setInputs({
            ...inputs,
            [type]: tags
        });
    };

    const handleDateRangeChange = (startDate, endDate) => {
        const formattedPeriod = startDate && endDate ? 
            `${startDate.toISOString().split('T')[0].replace(/-/g, '/')} ~ ${endDate.toISOString().split('T')[0].replace(/-/g, '/')}` : 
            '';
        setInputs({
            ...inputs,
            기간: formattedPeriod,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // 모든 필드가 입력되었는지 확인
        if (!제목 || !기간 || 여행지.length === 0 || 공유자.length === 0 || !썸네일) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }
    
        // 입력된 데이터를 state로 editor로 전달
        navigate('/editor', {
            state: inputs
        });
    };    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 이미지 업로드 후 URL을 받는 로직
            const imageUrl = URL.createObjectURL(file); // 로컬 파일 미리보기 URL
            setInputs({
                ...inputs,
                썸네일: imageUrl, // URL을 썸네일로 설정
            });
        }
    };

    return (
        <NewTripContainer>
            <h2>새 여행 일정 만들기</h2>
            <NewTripForm onSubmit={handleSubmit}>
                <FormLabel>
                    <FormLabelText>제목</FormLabelText>
                    <FormInput type="text" name="제목" value={제목} onChange={onChange} />
                </FormLabel>
                <FormLabel>
                    <FormLabelText>기간</FormLabelText>
                    <DateInput onDateRangeChange={handleDateRangeChange} />
                </FormLabel>
                <FormLabel>
                    <FormLabelText>여행지</FormLabelText>
                    <TagInput tags={여행지} setTags={(tags) => handleTagsChange('여행지', tags)} />
                </FormLabel>
                <FormLabel>
                    <FormLabelText>공유자</FormLabelText>
                    <DropdownTagInput tags={공유자} setTags={(tags) => handleTagsChange('공유자', tags)} options={sharedOptions} />
                </FormLabel>
                <FormLabel>
                    <FormLabelText>썸네일</FormLabelText>
                    <FormInput type="file" accept="image/*" onChange={handleImageChange} />
                </FormLabel>
                <div>
                    <ModalButton type="button" onClick={closeModal}>취소</ModalButton>
                    <ModalButton type="submit">다음</ModalButton>   
                </div>
            </NewTripForm>
        </NewTripContainer>
    );
}
