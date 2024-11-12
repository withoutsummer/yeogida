import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import YesNoModal from '../components/YesNoModal';
import CommentList from '../components/CommentList';
import Map from '../components/Map'
import { deletePost, getPosts } from '../mockdata/mytripMockData';

const ButtonContainer = styled.div`
    display: flex;
    max-width: 1400px;
    justify-content: right;
    flex-shrink: 0;
    margin: 150px auto 0px;
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
  margin: 0 auto;
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

const MapContainer = styled.div`
  max-width: 950px;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;  /* 탭과 콘텐츠를 세로로 배치 */
  border: 1px solid #ddd;
  width: 450px;
  margin: 20px auto;
  background-color: #EEF5FF;
`;

// 지도와 탭 들어있는 부분
const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  margin: 20px auto;
  padding: 0 20px;
`;

const DayTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #E0E0E0;
  width: 450px;
  margin: 10px auto;
  margin-bottom: 20px;
`;

const DayTab = styled.div`
  flex-shrink: 0;  /* 탭이 축소되지 않도록 설정 */
  padding: 10px 20px 20px;
  font-size: 20px;
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
  color: ${(props) => (props.isSelected ? '#59ABE6' : '#888')};
  cursor: pointer;
  border-bottom: ${(props) => (props.isSelected ? '3px solid #59ABE6' : '1px solid transparent')};
  white-space: nowrap;
  text-align: center;  /* 텍스트를 중앙 정렬 */
  font-family: NanumGothic;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-top: 20px;
`;

// 여행 상세 페이지 컴포넌트
export default function TripDetailPage( ) {
    const { id } = useParams(); // URL 파라미터에서 ID 가져오기
    const location = useLocation(); // 현재 위치 정보 가져오기
    const navigate = useNavigate(); // 페이지 이동 함수 가져오기

    // 위치 상태에서 게시물 가져오기
    const { posts, editedTrip } = location.state || {};
    const trip = editedTrip || (posts ? posts.find(post => post.id === Number(id)) : null);
    const { 제목: title = '', 날짜: dateRange = '', 썸네일: thumbnail = '', 소유자: user_id = 'seorin', 내용: content = '' } = trip || {};

    const [currentDay, setCurrentDay] = useState(1);
    const [days, setDays] = useState([]);

    // content 상태 정의
    const [contentState, setContentState] = useState(content);

    // const [tripData, setTripData] = useState(null); // 초기 상태 null로 설정
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // 삭제 모달 닫기 및 삭제 처리
    const handleModalClose = () => {
        if (trip) {
            deletePost(trip.id);
            setModalOpen(false); // 모달 닫기
            navigate('/mytrip'); // 삭제 후 이동할 페이지
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
      };
    
    // 수정 버튼 클릭 시 핸들러
    const handleEditClick = () => {
        navigate(`/mytrip/editor/${id}`, { state: { trip } }); // 편집 페이지로 이동
    };

    // 삭제 버튼 클릭 시 핸들러
    const handleDeleteClick = () => {
        setModalOpen(true); // 모달 열기
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
        setCurrentDay(index + 1);
    };

    useEffect(() => {
        // state로 전달된 content 값을 가져오기
        if (location.state && location.state.content) {
            setContentState(location.state.content);
        } else {
            // localStorage에서 가져오는 방법
            const savedContent = localStorage.getItem('editorValue');
            if (savedContent) {
                setContentState(savedContent);
            }
        }
    }, [location.state]);
    
  return (
      <div>
        <ButtonContainer>
            <NavButton onClick={handleEditClick}>수정하기</NavButton>
            <NavButton onClick={handleDeleteClick}>삭제하기</NavButton>
        </ButtonContainer>

        {/* 삭제하기 모달창 */}
        <YesNoModal
            isOpen={modalOpen}
            onRequestClose={handleModalClose}
            title="일정을 삭제하시겠습니까?"
            bodyText="삭제된 일정은 다시 복구할 수 없습니다."
            navigateTo="/mytrip"
        />

        <HeaderContainer thumbnail={thumbnail || ''}>
            <Title>{title}</Title>
            <UserId>{user_id}</UserId>
            <DateRange>{dateRange}</DateRange>
        </HeaderContainer>

        <ContentContainer>
            <DetailContainer>
                <MapContainer>
                    <Map />
                </MapContainer>

                <TabContainer>
                    <DayTabs>
                        {/* Swiper 컴포넌트를 사용하여 탭을 스와이프 가능하게 만들기 */}
                        <Swiper
                        spaceBetween={0} // 슬라이드 간 간격을 0으로 설정하여 탭들이 붙어서 보이게 함
                        slidesPerView={3} // 한 화면에 3개의 탭을 보여줌
                        onSlideChange={(swiper) => setActiveTab(swiper.realIndex)} // 슬라이드가 변경될 때 activeTab 업데이트
                        loop={false} // loop 활성화로 무한 스와이프를 방지
                        >
                        {days.map((day, index) => (
                            <SwiperSlide key={index}>
                            <DayTab
                                isSelected={activeTab === index}
                                onClick={() => handleTabClick(index)}>
                                {day}
                            </DayTab>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </DayTabs>
                    {/* 콘텐츠 부분 */}
                    <Content>
                        {`DAY ${activeTab + 1} Content`}
                    </Content>
                </TabContainer>
            </DetailContainer>

            <h2>상세 내용</h2>
            {/* editorValue 출력 */}
            <div 
                dangerouslySetInnerHTML={{ __html: content }}  // HTML 태그가 실제로 렌더링
            />
            <h2>댓글</h2>
            <CommentList /> {/* 댓글 목록 렌더링 */}
          </ContentContainer>
      </div>
  );
}