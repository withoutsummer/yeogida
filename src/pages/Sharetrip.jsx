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

const CardsContainer = styled.div`
  width: 1300px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const NavBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 440px;
    height: 34px;
    flex-shrink: 0;
`;

const NavButton = styled.button`
    display: inline-flex;
    margin: 10px;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: #F6F6F6;
    color: #000;
    font-family: NanumGothic;
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
    border: none;
    &:hover {
        background-color: #F4A192;
        color: #FFF;
    }
`;

const SharetripContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 220px;
    margin-bottom: 100px;
`;

const Index = styled.div`
    width: 1280px;
    display: flex; /* Flexbox를 사용하여 자식 요소들을 가로로 나열 */
    justify-content: space-between; /* 요소들 사이의 공간을 자동으로 분배 */
    margin-top: 10px; /* 상단 마진 */
    border-top: 1px solid #424242; /* 상단 테두리 */
    border-bottom: 1px solid #424242; /* 하단 테두리 */

    .title {
        text-align: center; /* 텍스트 중앙 정렬 */
        font-family: NanumGothic;
        font-size: 16px;
        font-weight: 600;
        line-height: 54px; /* 높이와 같은 line-height 설정 */
    }

    .no {
        width: 84px;    /* 너비 설정 */
    }

    .min{
        width: 220px; /* 너비 설정 */
    }

    .max {
        width: 360px; /* 너비 설정 */
    }
`;

const Line = styled.div`
    width: 1280px;
    display: flex; /* Flexbox를 사용하여 자식 요소들을 가로로 나열 */
    justify-content: space-between; /* 요소들 사이의 공간을 자동으로 분배 */
    border-bottom: 1px solid #E0E0E0; /* 하단 테두리 */

    .list {
        text-align: center; /* 텍스트 중앙 정렬 */
        font-family: NanumGothic;
        font-size: 16px;
        font-weight: 600;
        line-height: 54px; /* 높이와 같은 line-height 설정 */
    }

    .no {
        width: 84px;    /* 너비 설정 */
    }

    .min{
        width: 220px; /* 너비 설정 */
    }

    .max {
        width: 360px; /* 너비 설정 */
    }

    &:hover {
        background-color: #F4BFB4;
        color: #FFF;
    }
`;

export default function Sharetrip() {
    const [activeButton, setActiveButton] = useState('popular');
    const [page, setPage] = useState(1); // 페이지 상태 추가
    const limit = 5; // 한 페이지에 보여줄 데이터 수
    const offset = (page - 1) * limit; // 현재 페이지의 시작 index 계산
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/details/${id}`);
    };

    const [tags, setTags] = useState([]); // 빈 배열로 초기화
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

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1500,   /* 헤더보다 위로 설정 */
        },
        content: {
            width: "400px",
            height: "500px",
            borderRadius: "16px",
            backgroundColor: "#fff",
            position: 'relative',
            inset: 'auto',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
        }
    };

    return (
        <SharetripContainer>
            <NavBtnContainer>
                <NavButton>최신</NavButton>
                <NavButton>인기</NavButton>
            </NavBtnContainer>
            <Title>여행 공유</Title>
            <CardsContainer>
                {/* 카드 형식 콘텐츠 */}
                {cardData.map((card) => (
                    <div key={card.id} onClick={() => handleCardClick(card.id)}>
                        <Card
                        key={card.id}
                        img={card.썸네일}
                        title={card.제목}
                        date={card.날짜}
                        author={card.소유자}
                        comment={card.댓글}
                        likes={card.좋아요}
                        />
                    </div>
                ))}
            </CardsContainer>
        </SharetripContainer>
    );
}
