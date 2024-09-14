import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../assets/icons/trash_outline_icon.png';
import menuIcon from '../assets/icons/dot_menu_icon.png';

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
  margin: -0.2em 0 0 0;
  line-height: 1.4;
  font-size: 1.3em;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  transition: all ease-in 100ms;
`;

const CardTitleAndIcon = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardDescription = styled.p`
  color: #777;
`;

const CardIcon = styled.img`
  width: 1.3em;
  height: 1.3em;
  filter: invert(99%) sepia(0%) saturate(6%) hue-rotate(146deg) brightness(92%) contrast(92%);

  &:hover {
    filter: invert(95%) sepia(7%) saturate(4256%) hue-rotate(297deg) brightness(85%) contrast(132%);
  }
`;

const CardAuthor = styled.h5`
  color: #bbb;
  font-weight: 700;
  font-size: 0.7em;
  letter-spacing: 0.04em;
  margin: 1.4em 0 0 0;
  text-transform: uppercase;
`;

const CardAddDate = styled.span`
  color: #bbb;
  font-weight: bold;
  // font-size: 1.25em;
  font-size: 1em;
`;

// Card 컴포넌트 정의
export default function Card({ img, title, icon = 'none', author, date, onClick }) {
  return (
    <CardContainer onClick={onClick}>
      <CardImage src={img} alt={title} />
      <CardBody>
        {icon === 'delete' && (
          <CardTitleAndIcon>
            <CardTitle>{title}</CardTitle>
            <CardIcon src={deleteIcon} alt="Delete" />
          </CardTitleAndIcon>
        )}
        {icon === 'menu' && (
          <CardTitleAndIcon>
            <CardTitle>{title}</CardTitle>
            <CardIcon src={menuIcon} alt="Menu" />
          </CardTitleAndIcon>
        )}
        {icon === 'none' && (
          <CardTitle>{title}</CardTitle>
        )}
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </CardDescription>
        <CardAuthor>{author}</CardAuthor>
        <CardAddDate>{date}</CardAddDate>
      </CardBody>
    </CardContainer>
  );
}
