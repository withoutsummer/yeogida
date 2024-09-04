import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

// Styled Components 정의
const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-family: NanumGothic;
  font-size: 40px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* 버튼 사이 간격 */
  margin-bottom: 20px; /* 제목과의 간격 */
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
    display: inline-flex;
    margin: 10px;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: ${(props) =>
        props.active ? '#F4A192' : (props.hover ? '#F4A192' : '#F6F6F6')};
    color: ${(props) => (props.active ? '#FFF' : (props.hover ? '#FFF' : '#000'))};
    font-family: NanumGothic;
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.active ? '#F4A192' : '#F4A192')};
        color: ${(props) => (props.active ? '#FFF' : '#FFF')};
    }
`;

export default function Sharetrip() {
    const [activeButton, setActiveButton] = useState('popular');
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    const handleMouseEnter = (buttonType) => {
        setHoveredButton(buttonType);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const cardData = [
        {
            img: 'https://picsum.photos/id/54/400/300',
            title: 'Lorem ipsum dolor sit amet,',
            author: 'mijin'
        },
        {
            img: 'https://picsum.photos/id/55/400/300',
            title: 'Lorem ipsum dolor sit amet,',
            author: 'seoyoung'
        },
        {
            img: 'https://picsum.photos/id/56/400/300',
            title: 'Lorem ipsum dolor sit amet,',
            author: 'sieun'
        },
        {
            img: 'https://picsum.photos/id/54/400/300',
            title: 'Lorem ipsum dolor sit amet,',
            author: 'seorin'
        },
        {
            img: 'https://picsum.photos/id/55/400/300',
            title: 'Lorem ipsum dolor sit amet,',
            author: 'mijin'
        },
        {
            img: 'https://picsum.photos/id/56/400/300',
            title: 'Lorem ipsum dolor sit amet,',
            author: 'seoyoung'
        }
    ];

    return (
        <div>
            <ButtonContainer>
                <NavButton
                    active={activeButton === 'popular'}
                    onClick={() => handleButtonClick('popular')}
                >
                    인기
                </NavButton>
                <NavButton
                    active={activeButton === 'latest'}
                    onClick={() => handleButtonClick('latest')}
                >
                    최신
                </NavButton>
            </ButtonContainer>
            <Title>여행 공유</Title>
            <CardsContainer>
                {cardData.map((card, index) => (
                    <Card key={index} img={card.img} title={card.title} author={card.author} />
                ))}
            </CardsContainer>
        </div>
    );
}
