import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Btn from '../components/Btn'; // Btn 컴포넌트 임포트

// Styled Components 정의
const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
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

// 호버 효과를 포함한 Btn 스타일링
const HoverableBtn = styled(Btn)`
  &:hover {
    background-color: #F4A192; /* 호버 시 배경 색상 변경 */
  }
`;

export default function Sharetrip() {
    const [activeButton, setActiveButton] = useState('popular');

    const handlePopularClick = () => {
        setActiveButton('popular');
    };

    const handleLatestClick = () => {
        setActiveButton('latest');
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
                <HoverableBtn
                    text="인기"
                    width="80px"
                    height="40px"
                    borderRadius="20px"
                    color={activeButton === 'popular' ? '#fff' : '#000'}
                    backgroundColor={activeButton === 'popular' ? '#F4A192' : '#E0E0E0'}
                    onClick={handlePopularClick}
                />
                <HoverableBtn
                    text="최신"
                    width="80px"
                    height="40px"
                    borderRadius="20px"
                    color={activeButton === 'latest' ? '#fff' : '#000'}
                    backgroundColor={activeButton === 'latest' ? '#F4A192' : '#E0E0E0'}
                    onClick={handleLatestClick}
                />
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
