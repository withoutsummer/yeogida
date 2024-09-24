import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// 썸네일과 관련된 스타일 정의
const ThumbnailContainer = styled.div`
  width: 1276px;
  height: 427px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  color: #fff;
  font-family: NanumGothic;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-family: NanumGothic;
  font-size: 40px;
  color: #333;
`;

const Author = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Date = styled.div`
  font-size: 16px;
  opacity: 0.8;
`;

export default function SharetripDetail() {
    const { id } = useParams();
    
    const cardData = [
        { id: 1, img: 'https://picsum.photos/id/54/1276/427', title: 'Lorem ipsum', author: 'mijin', date: '2024-09-15' },
        { id: 2, img: 'https://picsum.photos/id/55/1276/427', title: 'Lorem ipsum', author: 'seoyoung', date: '2024-09-14' },
        { id: 3, img: 'https://picsum.photos/id/56/1276/427', title: 'Lorem ipsum', author: 'seoyoung', date: '2024-09-14' },
    ];

    const card = cardData.find((card) => card.id === parseInt(id));

    return (
        <div>
            {card && (
                <ThumbnailContainer img={card.img}>
                    <Title>{card.title}</Title>
                    <Author>by {card.author}</Author>
                    <Date>{card.date}</Date>
                </ThumbnailContainer>
            )}
            {/* 상세 페이지 내용 */}
        </div>
    );
}
