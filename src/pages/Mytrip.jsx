import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';
import Modal from 'react-modal';
import Newtrip from './Newtrip';
import { Select, MenuItem } from '@mui/material'; // MUI Select 및 MenuItem import

const MyTripContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;

const ButtonContainer = styled.div`
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

const TextTitle = styled.p`
    margin-top: 40px;
    display: flex;
    width: 440px;
    height: 40px;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: NanumGothic;
    font-size: 40px;
    font-weight: 700;
    line-height: 40px;
`;

const ViewButton = styled.button`
    display: flex;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    height: 24px;
    background-color: transparent;
    border: none;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const PlusButton = styled.button`
    display: inline-flex;
    margin: 10px;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #F4A192;
    color: #fff;
    font-family: NanumGothic;
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
    border: 1px solid #E0E0E0;
`;

const Index = styled.div`
    width: 100%;
    display: flex; /* Flexbox를 사용하여 자식 요소들을 가로로 나열 */
    justify-content: space-between; /* 요소들 사이의 공간을 자동으로 분배 */
    margin-top: 10px; /* 상단 마진 */
    border-top: 1px solid #424242; /* 상단 테두리 */
    border-bottom: 1px solid #E0E0E0; /* 하단 테두리 */

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
    width: 100%;
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
`;

export default function MyTrip() {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [isListView, setIsListView] = useState(false);
    const [sortPath, setSortPath] = useState('latest'); // 초기값을 'latest'로 설정

    const toggleView = () => {
        setIsListView(!isListView);
    };

    // 정렬 옵션 정의
    const SORT_OPTIONS = [
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' }
    ];

    const onSortChange = (type, value) => {
        setSortPath(value);
        // 추가적으로 구현 예정
    };

    // 빈 배열을 사용
    const posts = []; // 실제 데이터 설정할 예정

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
        <MyTripContainer>
            <ButtonContainer>
                <NavButton>전체 일정</NavButton>
                <NavButton>내가 만든 일정</NavButton>
                <NavButton>공유 받은 일정</NavButton>
            </ButtonContainer>
            <TextTitle>나의 여행 일정</TextTitle>
            {isListView ? (
                <ViewButton onClick={toggleView}>
                    {/* 리스트형 버튼 (클릭하면 카드형으로 바뀜) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V9C3 9.53043 3.21071 10.0391 3.58579 10.4142C3.96086 10.7893 4.46957 11 5 11H9C9.53043 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53043 11 9V5C11 4.46957 10.7893 3.96086 10.4142 3.58579C10.0391 3.21071 9.53043 3 9 3ZM5 9V5H9V9H5Z" fill="black"/>
                        <path d="M19 3H15C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5V9C13 9.53043 13.2107 10.0391 13.5858 10.4142C13.9609 10.7893 14.4696 11 15 11H19C19.5304 11 20.0391 10.7893 20.4142 10.4142C20.7893 10.0391 21 9.53043 21 9V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM15 9V5H19V9H15Z" fill="black"/>
                        <path d="M9 13H5C4.46957 13 3.96086 13.2107 3.58579 13.5858C3.21071 13.9609 3 14.4696 3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H9C9.53043 21 10.0391 20.7893 10.4142 20.4142C10.7893 20.0391 11 19.5304 11 19V15C11 14.4696 10.7893 13.9609 10.4142 13.5858C10.0391 13.2107 9.53043 13 9 13ZM5 19V15H9V19H5Z" fill="black"/>
                        <path d="M19 13H15C14.4696 13 13.9609 13.2107 13.5858 13.5858C13.2107 13.9609 13 14.4696 13 15V19C13 19.5304 13.2107 20.0391 13.5858 20.4142C13.9609 20.7893 14.4696 21 15 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V15C21 14.4696 20.7893 13.9609 20.4142 13.5858C20.0391 13.2107 19.5304 13 19 13ZM15 19V15H19V19H15Z" fill="black"/>
                    </svg>
                </ViewButton>
            ) : (
                <ViewButton onClick={toggleView}>
                    {/* 카드형 버튼 (클릭하면 리스트형으로 바뀜) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20.05 11H3.95C3.42533 11 3 11.4253 3 11.95V12.05C3 12.5747 3.42533 13 3.95 13H20.05C20.5747 13 21 12.5747 21 12.05V11.95C21 11.4253 20.5747 11 20.05 11Z" fill="black"/>
                        <path d="M20.05 16H3.95C3.42533 16 3 16.4253 3 16.95V17.05C3 17.5747 3.42533 18 3.95 18H20.05C20.5747 18 21 17.5747 21 17.05V16.95C21 16.4253 20.5747 16 20.05 16Z" fill="black"/>
                        <path d="M20.05 6H3.95C3.42533 6 3 6.42533 3 6.95V7.05C3 7.57467 3.42533 8 3.95 8H20.05C20.5747 8 21 7.57467 21 7.05V6.95C21 6.42533 20.5747 6 20.05 6Z" fill="black"/>
                    </svg>
                </ViewButton>
            )}
            <Select
                labelId="filter-select-label"
                id="filter-select"
                value={sortPath}
                sx={{ fontSize: '0.9rem', borderRadius: 0 }}
                onChange={(event) =>
                    onSortChange('sort', event.target.value)
                }                
            >
                {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <PlusButton onClick={openModal}>새 여행 추가하기</PlusButton>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <Newtrip closeModal={closeModal} />
            </Modal>
            {/* 리스트 또는 카드 형식의 콘텐츠가 렌더링 되는 부분 */}
            {isListView ? (
                <div>
                    <Index>
                        <div className="title no">No</div>
                        <div className="title max">제목</div>
                        <div className="title min">여행지</div>
                        <div className="title min">소유자</div>
                        <div className="title min">날짜</div>
                        <div className="title no"></div>
                    </Index>
                    {posts.slice(offset, offset + limit).map(({ id, no, 제목, 여행지, 소유자, 날짜, 아이콘 }) => (
                        <Line key={id}>
                            <div className="list no">{no}</div>
                            <div className="list max">{제목}</div>
                            <div className="list min">{여행지}</div>
                            <div className="list min">{소유자}</div>
                            <div className="list min">{날짜}</div>
                            <div className="list no">{아이콘}</div>
                        </Line>
                    ))}
                    <Pagination 
                        total={posts.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            ) : (
                <div>카드</div>
            )}
        </MyTripContainer>
    );
}