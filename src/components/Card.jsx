import React from 'react';
import styled from 'styled-components';

// Styled Components 설정
const CardContainer = styled.div`
  background: #fff;
  width: 620px;
  height: 510px;
  border-radius: 0.6em;
  margin: 13px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 
              0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 
              0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
  transition: all ease 200ms;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 
                0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 
                0 -6px 32px -6px hsla(0, 0%, 0%, 0.02);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 340px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 5px;
`;

const CardTitle = styled.h2`
  color: #000;
  font-family: NanumGothic;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  margin-top: 5px;
  margin-left: 5px;
`;

const CardDate = styled.p`
  color: #707070;
  font-family: NanumGothic;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 34.79px; /* 173.95% */
  margin-top: 5px;
  margin-left: 5px;
`;

const CardAuthor = styled.h5`
  font-family: NanumGothic;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 5px;
  margin-left: 5px;
`;

// Card 컴포넌트 정의
export default function Card({ img, title, date, author }) {
  return (
    <CardContainer>
      <CardImage src={img} alt={title} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardDate>{date}</CardDate>
        <CardAuthor>{author}</CardAuthor>
      </CardBody>
    </CardContainer>
  );
}
