import React from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput'; // TextInput 컴포넌트 가져오기
import SUbButton from '../components/SubButton'; // SubButton 컴포넌트 가져오기

const InputFieldContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px; /* 각 필드 간의 간격 설정 */
    width: 100%; /* 전체 필드가 가로로 확장되도록 */
`;

const LabelContainer = styled.div`
    display: flex;
    width: 150px; /* 라벨 너비 고정 */
    align-items: center; /* 라벨과 별표를 수직 중앙 정렬 */
    margin-right: 10px; /* 라벨과 입력 필드 간의 간격 설정 */
    font-size: 20px;
`;

const Asterisk = styled.div`
    color: red; /* 별표 색상 지정 */
    margin-left: 4px; /* 별표와 텍스트 간격 */
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center; /* 입력 필드와 버튼을 수직 중앙 정렬 */
    flex: 1; /* 입력 필드가 차지할 비율 설정 */
`;

const StyledTextInput = styled(TextInput)`
    width: 100%; /* TextInput의 너비를 100%로 설정하여 InputWrapper에 맞게 확장 */
    max-width: 320px; /* 최대 너비를 320px로 설정 */
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center; /* 버튼을 수직 중앙 정렬 */
`;

const InputField = ({
    label,
    id,
    type,
    placeholder,
    showButton,
    buttonText = '중복 확인',
}) => {
    return (
        <InputFieldContainer>
            <LabelContainer>
                <div>{label}</div>
                <Asterisk>*</Asterisk>
            </LabelContainer>
            <InputWrapper>
                <StyledTextInput
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    marginbottom="0px"
                    autoFocus
                />
                {showButton && (
                    <ButtonWrapper>
                        <SUbButton>{buttonText}</SUbButton>
                    </ButtonWrapper>
                )}
            </InputWrapper>
        </InputFieldContainer>
    );
};

export default InputField;
