import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../components/CommentList';

const ButtonContainer = styled.div`
    display: flex;
    max-width: 1400px;
    justify-content: right;
    flex-shrink: 0;
    margin: 150px auto 0px; /* 좌우 가운데 정렬을 위해 margin을 사용 */
`;

const NavButton = styled.button`
    display: flex;
    width: 80px;
    height: 36px;
    margin: 0 5px 5px 0;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: #F6F6F6;
    color: #000;
    font-family: NanumGothic;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    border: none;
    &:hover {
        background-color: #000;
        color: #FFF;
    }
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  height: 400px;
  background-image: ${({ thumbnail }) => `url(${thumbnail})`};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: 0 auto; /* 좌우 가운데 정렬을 위해 margin을 사용 */
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const Title = styled.h1`
  font-family: NanumGothic;
  font-size: 60px;
  font-weight: bold;
  color: #fff;
  margin: 80px 0 60px 0;
  text-align: center;
`;

const UserId = styled.h3`
  font-family: NanumGothic;
  font-size: 18px;
  color: #fff;
  text-align: center;
`;

const DateRange = styled.h3`
  font-family: NanumGothic;
  font-size: 20px;
  color: #fff;
  text-align: center;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 100px;
  padding: 0 20px;
`;

const DayTabs = styled.div`
  display: flex;
  border-bottom: 2px solid #E0E0E0;
  width: 1400px;
  height: 60px; 
  margin: 0 auto;
  margin-bottom: 20px;
`;

const DayTab = styled.button`
  padding: 10px 20px;
  background-color: ${({ isSelected }) => (isSelected ? '#E0E0E0' : '#FFF')};
  color: ${({ isSelected }) => (isSelected ? '#000' : '#707070')};
  border: none;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
  font-family: NanumGothic;
  font-size: 20px;
  font-weight: 600;
`;

export default function TripDetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 사용

    const { posts } = location.state || {};

    // posts 배열에서 해당 ID에 맞는 여행 정보 찾기
    const trip = posts ? posts.find(post => post.id === Number(id)) : null;
    const { 제목: title = '', 기간: dateRange = '', 썸네일: thumbnail = '', 소유자: owner = 'Unknown' } = trip || {};

    const [currentDay, setCurrentDay] = useState(1);
    const [days] = useState(['DAY 1', 'DAY 2', 'DAY 3']);

    // 수정하기 버튼 클릭 시 editor로 이동
    const handleEditClick = () => {
      navigate(`/mytrip/editor/${id}`, { state: { trip } }); // 여행 데이터를 함께 전달
  };

    return (
        <div>
          <ButtonContainer>
              <NavButton onClick={handleEditClick}>수정하기</NavButton>
          </ButtonContainer>

          <HeaderContainer thumbnail={thumbnail}>
              <Title>{title}</Title>
              <UserId>{owner}</UserId>
              <DateRange>{dateRange}</DateRange>
          </HeaderContainer>

          <ContentContainer>
              <DayTabs>
                  {days.map((day, index) => (
                      <DayTab
                          key={index}
                          isSelected={currentDay === index + 1}
                          onClick={() => setCurrentDay(index + 1)}
                      >
                          {day}
                      </DayTab>
                  ))}
              </DayTabs>

              <h2>상세 내용</h2>
              <p>여행에 대한 상세 내용은 여기에 표시됩니다.</p>

              <h2>댓글</h2>
              <CommentList /> {/* 댓글 리스트 컴포넌트 추가 */}
          </ContentContainer>
        </div>
    );
}