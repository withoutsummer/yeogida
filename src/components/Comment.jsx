import React from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
  margin: 8px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  border: 1px solid grey;
  border-radius: 16px;
  align-items: flex-start;
  position: relative; /* 수정 및 삭제 텍스트를 배치하기 위한 상대 위치 */
`;

const ImageContainer = styled.div`
  margin-right: 8px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%; /* 원형 이미지 */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameText = styled.span`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const DateText = styled.span`
  color: grey;
  font-size: 14px;
`;

const CommentText = styled.span`
  color: black;
  font-size: 16px;
  margin-top: 4px; /* 댓글과 이름-날짜 사이 간격 */
`;

const ActionText = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
  display: flex;
  gap: 8px; /* 수정 및 삭제 간의 간격 */
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ActionButton = styled.span`
  color: grey;
  font-size: 14px;
  cursor: pointer; /* 클릭 가능한 텍스트 표시 */
`;

function Comment({ name, date, comment, onEdit, onDelete }) {
  return (
    <Wrapper>
      <ImageContainer>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="Profile"
        />
      </ImageContainer>

      <ContentContainer>
        <InfoContainer>
          <NameText>{name}</NameText>
          <DateText>{date}</DateText>
        </InfoContainer>
        <CommentText>{comment}</CommentText>
      </ContentContainer>

      {/* 수정 및 삭제 텍스트 */}
      <ActionText>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onDelete}>삭제</ActionButton>
      </ActionText>
    </Wrapper>
  );
}

export default Comment;
