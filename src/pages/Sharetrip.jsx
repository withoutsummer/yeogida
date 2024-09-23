import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  gap: 10px;
  margin-bottom: 20px;
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
  background: ${(props) => (props.active ? '#F4A192' : '#F6F6F6')};
  color: ${(props) => (props.active ? '#FFF' : '#000')};
  font-family: NanumGothic;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #F4A192;
    color: #FFF;
  }
`;

export default function Sharetrip() {
    const [activeButton, setActiveButton] = useState('popular');
    const navigate = useNavigate();

    const cardData = [
        { id: 1, img: 'https://picsum.photos/id/54/400/300', title: 'Lorem ipsum', author: 'mijin', date: '2024-09-15' },
        { id: 2, img: 'https://picsum.photos/id/55/400/300', title: 'Lorem ipsum', author: 'seoyoung', date: '2024-09-14' },
        { id: 3, img: 'https://picsum.photos/id/56/400/300', title: 'Lorem ipsum', author: 'seoyoung', date: '2024-09-14' },
    ];

    const handleCardClick = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div>
            <ButtonContainer>
                <NavButton active={activeButton === 'popular'} onClick={() => setActiveButton('popular')}>
                    인기
                </NavButton>
                <NavButton active={activeButton === 'latest'} onClick={() => setActiveButton('latest')}>
                    최신
                </NavButton>
            </ButtonContainer>
            <Title>여행 공유</Title>
            <CardsContainer>
                {cardData.map((card) => (
                    <div key={card.id} onClick={() => handleCardClick(card.id)}>
                        <Card img={card.img} title={card.title} author={card.author} />
                    </div>
                ))}
            </CardsContainer>
        </div>
    );
}
