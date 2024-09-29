import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../components/CommentList';

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

const ContentContainer = styled.div`
  padding: 20px;
`;

export default function SharetripDetail() {
    const { id } = useParams();
    
    const cardData = [
        { id: 1, no: 1, 제목: "부산 3박 4일", 여행지: ["부산"], 소유자: "seorin", 날짜: "2024-09-13", 썸네일: "https://via.placeholder.com/300", 댓글: "0", 좋아요: "0"},
        { id: 2, no: 2, 제목: "부산 1박 2일", 여행지: ["부산"], 소유자: "seorin", 날짜: "2024-09-14", 썸네일: "https://via.placeholder.com/300", 댓글: "0", 좋아요: "0"},
        { id: 3, no: 3, 제목: "강릉 2박 3일", 여행지: ["강릉"], 소유자: "seorin", 날짜: "2024-09-15", 썸네일: "https://via.placeholder.com/300", 댓글: "0", 좋아요: "0"},
        { id: 4, no: 4, 제목: "부산 당일치기", 여행지: ["부산"], 소유자: "seorin", 날짜: "2024-09-13", 썸네일: "https://via.placeholder.com/300", 댓글: "0", 좋아요: "0"},
        { id: 5, no: 5, 제목: "대구 당일치기", 여행지: ["대구"], 소유자: "seoyoung", 날짜: "2024-09-14", 썸네일: "https://via.placeholder.com/300", 댓글: "0", 좋아요: "0"},
        { id: 6, no: 6, 제목: "제주도 3박 4일", 여행지: ["제주도"], 소유자: "seoyoung", 날짜: "2024-09-15", 썸네일: "https://via.placeholder.com/300", 댓글: "0", 좋아요: "0"},
        { id: 7, no: 7, 제목: "여수, 순천 여행", 여행지: ["여수"], 소유자: "sieun", 날짜: "2024-09-13", 썸네일: "https://via.placeholder.com/300", 댓글: "0", 좋아요: "0"},
        { id: 8, no: 8, 제목: "글램핑", 여행지: ["가평"], 소유자: "mijin", 날짜: "2024-09-14", 썸네일: "https://via.placeholder.com/300", 댓글: "0", 좋아요: "0"},
    ];

    const card = cardData.find((card) => card.id === parseInt(id));

    return (
        <div>
            {card && (
                <ThumbnailContainer img={card.썸네일}>
                    <Title>{card.제목}</Title>
                    <Author>by {card.소유자}</Author>
                    <Date>{card.날짜}</Date>
                </ThumbnailContainer>
            )}
            <ContentContainer>
                {/* 상세 페이지 내용 */}
                <h2>댓글</h2>
                <CommentList /> {/* 댓글 리스트 컴포넌트 추가 */}
            </ContentContainer>
        </div>
    );
}
