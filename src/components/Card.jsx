import React from 'react';
import styled from 'styled-components';

// Styled Components 설정
const CardContainer = styled.div`
  background: #fff;
  width: 24em;
  border-radius: 0.6em;
  margin: 1em;
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
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1.2em;
`;

const CardTitle = styled.h2`
  color: #222;
  margin-top: -0.2em;
  line-height: 1.4;
  font-size: 1.3em;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  transition: all ease-in 100ms;
`;

const CardDescription = styled.p`
  color: #777;
`;

const CardAuthor = styled.h5`
  color: #bbb;
  font-weight: 700;
  font-size: 0.7em;
  letter-spacing: 0.04em;
  margin: 1.4em 0 0 0;
  text-transform: uppercase;
`;

// Card 컴포넌트 정의
export default function Card({ img, title, author }) {
  return (
    <CardContainer>
      <CardImage src={img} alt={title} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </CardDescription>
        <CardAuthor>{author}</CardAuthor>
      </CardBody>
    </CardContainer>
  );
}
