import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import searchIcon from '../assets/icons/search_icon.png';
import addIcon from '../assets/icons/friend_add_icon.png';
import slashIcon from '../assets/icons/slash_icon.png';
import deleteIcon from '../assets/icons/delete_friend_icon.png';
import approveIcon from '../assets/icons/approve_request_icon.png';
import rejectIcon from '../assets/icons/reject_request_icon.png';
import useDebounce from '../assets/hooks/useDebounce';
import SortDropdown from '../components/SortDropdown';
import CommonModal from '../components/CommonModal';

const HeaderStyle = styled.div `
    margin-top: 150px;
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    justify-content: center;
`;

const ArticleStyle = styled.div `
    margin-bottom: 100px;
    // 원래는 274px
`;

const SearchBarStyle = styled.div `
    position: relative;
    width: 360px;
    margin: auto;

    input {
        width: 100%;
        height: 51px;
        padding-left: 40px;
        padding-right: 165px;
        border: 1px solid #707070;
        border-radius: 8px;
        font-size: 16px;
        box-sizing: border-box;

        &::placeholder {
            color: #707070;
        }

        &:focus {
            outline: none;
        }

        &::-webkit-search-cancel-button {
            -webkit-appearance: none;
            appearance: none;
        }
    }
`;

const LeftContent = styled.span `
    position: absolute;
    top: 55%;
    left: 10px;
    transform: translateY(-50%);
    color: #707070;

    img {
        width: 100%;
        height: 100%;
    }
`;

const RightContent = styled.div `
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #707070;
    display: flex;
    align-items: center;

    span {
        margin-right: 5px;
        margin-bottom: 3px;
        font-size: 18px;
    }

    img {
        width: 27px;
        height: 27px;
        cursor: pointer;
    }
`;

const MiniNavStyle = styled.div `
    width: 494px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px auto 0;
`;

const MiniMenuStyle = styled.div `
    display: flex;
    align-items: center;

    img {
        width: 15px;
        height: 25px;
        margin: 0 3px;
    }
`;

const MiniMenuBtn = styled.button `
    color: ${(props) => (props.selected ? "#F4A193" : "#000")};
    font-weight: ${(props) => (props.selected ? "bold" : "normal")};
    font-size: 20px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
`;

const StyledSlider = styled(Slider)`
    .slick-dots {
        
    }
`;

const SliderContainer = styled.div `
    width: 520px;
    height: 535px;
    margin: auto;
`;

const FriendListSlide = styled.div `
    width: 95% !important;
    display: flex !important;
    height: 110px;
    box-sizing: border-box;
    align-items: center;

    // 아래 요소들은 피그마랑 다름
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border-left: 10px solid #508c4e;
    margin: 10px 0 10px 15px;

    &:focus {
        outline: none;
}
`;

const FriendImage = styled.div `
    width: 90px;
    height: 90px;
    border-radius: 180px;
    background-color: #e0e0e0;
    margin: 0 30px 0 20px;
`;

const FriendName = styled.span `
    font-size: 24px;
    margin-bottom: 10px;
`;

const FriendId = styled.span `
    font-size: 20px;
    color: #707070;
`;

const ListIconStyle = styled.img `
    height: 24px;
    // display: ${(props) => (props.selected ? "block" : "none")};
    cursor: pointer;
    filter: invert(99%) sepia(0%) saturate(6%) hue-rotate(146deg) brightness(92%) contrast(92%);

    &:hover {
        filter: invert(95%) sepia(7%) saturate(4256%) hue-rotate(297deg) brightness(85%) contrast(132%);
    }
`;

const RequestIconStyle = styled.img `
    height: 16px;
    // display: ${(props) => (props.selected ? "block" : "none")};
    cursor: pointer;
    filter: invert(99%) sepia(0%) saturate(6%) hue-rotate(146deg) brightness(92%) contrast(92%);

    &:hover {
        filter: invert(95%) sepia(7%) saturate(4256%) hue-rotate(297deg) brightness(85%) contrast(132%);
    }
`;

// ---------------친구 검색바 Component---------------
function FriendSearchBar({ inputValue, handleChange, onEnterPress }) {
    // const [isAddClicked, setIsAddClicked] = useState(0);
    const handleEnterDown = (event) => {
        if (event.key === 'Enter') {
            onEnterPress();
        }
    }

    return (
        <SearchBarStyle>
            <LeftContent>
                <img src={ searchIcon } alt='검색 돋보기 아이콘' />
            </LeftContent>
            <input 
                type='search' 
                placeholder='친구 아이디' 
                value={ inputValue }
                onChange={ handleChange }
                onKeyDown={ handleEnterDown }
            />
            {inputValue && (
                <RightContent>
                    <span>를(을) 친구 추가</span>
                    <img 
                        src={ addIcon } 
                        alt='친구 추가 아이콘' 
                        onClick={ () => console.log('친구추가 버튼 click') }
                    />
                </RightContent>
            )}
        </SearchBarStyle>
    );
}

// ---------------친구 목록 Component---------------
function ListAndRequest({ selected, inputValue, sortOption }) {
    const sliderRef = useRef(null);
    const debouncedInputValue = useDebounce(inputValue, 1000); // 1초의 지연 시간 설정

    // 모달 열림 상태와 삭제할 친구 이름 상태 관리
    const [modals, setModals] = useState({
        oneBtnModal: false,
        deleteModal: false,
        addModal: false,
    });
    const [modalTitle, setModalTitle] = useState('');
    const [thisFriendName, setThisFriendName] = useState('');
    const [thisUserId, setThisUserId] = useState('');
    const [modalAction, setModalAction] = useState(''); // 'reject' 또는 'approve'
    
    // 임시 데이터
    const friendListData = [
        { friendId: 1, friendName: 'alice', userId: 'alice1234', addDate: '2024-01-15' },
        { friendId: 2, friendName: 'bob', userId: 'bob5678', addDate: '2024-01-20' },
        { friendId: 3, friendName: 'charlie', userId: 'charlie9101', addDate: '2024-01-25' },
        { friendId: 4, friendName: 'david', userId: 'david2345', addDate: '2024-02-01' },
        { friendId: 5, friendName: 'eve', userId: 'eve6789', addDate: '2024-02-05' },
        { friendId: 6, friendName: 'frank', userId: 'frank1230', addDate: '2024-02-10' },
        { friendId: 7, friendName: 'grace', userId: 'grace5670', addDate: '2024-02-15' },
        { friendId: 8, friendName: 'hannah', userId: 'hannah9102', addDate: '2024-02-20' },
        { friendId: 9, friendName: 'isaac', userId: 'isaac3456', addDate: '2024-02-25' },
        { friendId: 10, friendName: 'jack', userId: 'jack7890', addDate: '2024-03-01' },
    ];

    const friendRequestData = [
        { friendId: 1, friendName: 'kate', userId: 'kate2341', addDate: '2024-03-05' },
        { friendId: 2, friendName: 'leo', userId: 'leo6782', addDate: '2024-03-10' }
    ];

    let dataToShow = []

    /* ----------------------친구 목록/요청 필터링 관련 코드---------------------- */
    if (selected) {
        dataToShow = [...friendListData];
        if (sortOption === 1) {
            // 최신순 정렬
            dataToShow = [...dataToShow].sort((a, b) => new Date(b.addDate) - new Date(a.addDate));
        } else if (sortOption === 2) {
            // 이름순 정렬
            dataToShow = [...dataToShow].sort((a, b) => a.friendName.localeCompare(b.friendName));
        }
    } else {
        // 오래된 순 정렬
        dataToShow = [...friendRequestData].sort((a, b) => new Date(a.dateRequested) - new Date(b.dateRequested));
    }
    
    // inputValue로 친구 목록을 필터링
    // const filteredData = dataToShow.filter(friend => 
    //     friend.friendId.includes(inputValue)
    // );

    // Debounce된 입력값으로 친구 목록을 필터링
    const filteredData = dataToShow.filter(friend =>
        friend.userId.toLowerCase().includes(debouncedInputValue.toLowerCase())
    );

    const settings = {
        arrows: false,
        dots: true,
        infinite: filteredData.length > 4,  // 현재 선택된 데이터의 길이에 따라 설정
        speed: 500,
        slidesToShow: 1,  
        slidesToScroll: 1,
        rows: 4,
        slidesPerRow: 1,
    };

    /* ----------------------Modal 관련 코드---------------------- */
    // 특정 모달 열기
    const openModal = (modalKey) => {
        setModals((prev) => ({ ...prev, [modalKey]: true }));
    };

    // 특정 모달 닫기
    const closeModal = (modalKey) => {
        setModals((prev) => ({ ...prev, [modalKey]: false }));
    };

    // 친구 삭제 Modal
    const handleDeleteFriend = (friendName, userId) => {
        setThisFriendName(friendName);
        setThisUserId(userId);
        openModal('deleteModal');
        setModalTitle(`'${userId}(${friendName})'님을 친구 목록에서 삭제하시겠습니까?`);
    };

    // 친구 삭제 완료 Modal
    const completeDeleteFriend = () => {
        console.log(`'${thisUserId}(${thisFriendName})'을 친구 목록에서 삭제 완료`)
        openModal('oneBtnModal');
        setModalTitle('친구를 목록에서 삭제하였습니다.');
    };

    // 친구 요청 거절 Modal
    const handleRejectFriend = (friendName, userId) => {
        setThisFriendName(friendName);
        setThisUserId(userId);
        setModalAction('reject');
    }

    // 친구 요청 수락 Modal
    const handleApproveFriend = (friendName, userId) => {
        setThisFriendName(friendName);
        setThisUserId(userId);
        setModalAction('approve');
    }

    // 친구 목록 & 친구 요청 정렬 업데이트
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        }
    }, [selected, sortOption]);

    useEffect(() => {
        if (debouncedInputValue === '' && sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        }
    }, [debouncedInputValue]);

    // 모달 상태 업데이트
    useEffect(() => {
        if (thisFriendName && thisUserId) {
            if (modalAction === 'reject') {
                openModal('oneBtnModal');
                setModalTitle(`'${thisUserId}(${thisFriendName})'님의 친구 요청을 거절하였습니다.`);
            } else if (modalAction === 'approve') {
                openModal('oneBtnModal');
                setModalTitle(`'${thisUserId}(${thisFriendName})'님의 친구 요청을 수락하였습니다.`);
            }
        }
    }, [modalAction]); // 상태가 변경될 때마다 모달 상태 업데이트
    

    return (
        <>
            <SliderContainer>
                <StyledSlider ref={sliderRef} {...settings} key={filteredData.length}>
                {filteredData.map((friend) => (
                    <FriendListSlide key={friend.friendId}>
                        <FriendImage />
                        <div 
                            style={{ 
                                display: 'flex',
                                flexDirection: 'column'
                        }}>
                            <FriendName>{friend.friendName}</FriendName>
                            <FriendId>{friend.userId}</FriendId>
                        </div>
                        {/* 친구 삭제 아이콘 */}
                        {selected && (
                            <ListIconStyle 
                                src={deleteIcon} 
                                alt='친구 삭제 아이콘' 
                                style={{ margin: '0 20px 0 auto' }}
                                onClick={() => handleDeleteFriend(friend.friendName, friend.userId) }
                            />
                        )}
                        {/* 친구 요청 거절 아이콘 */}
                        {!selected && (
                            <RequestIconStyle 
                                src={rejectIcon} 
                                alt='친구요청 거절 아이콘' 
                                style={{ marginLeft: 'auto' }}
                                onClick={() => handleRejectFriend(friend.friendName, friend.userId)}
                            />
                        )}
                        {/* 친구 요청 승인 아이콘 */}
                        {!selected && (
                            <RequestIconStyle 
                                src={approveIcon} 
                                alt='친구요청 승인 아이콘' 
                                style={{ margin: '0 20px 0 30px' }}
                                onClick={() => handleApproveFriend(friend.friendName, friend.userId)}
                            />
                        )}
                    </FriendListSlide>
                ))}
                </StyledSlider>
            </SliderContainer>

            {/* Modals */}
            <CommonModal 
                isOpen={modals.oneBtnModal} 
                onRequestClose={ () => closeModal('oneBtnModal') }
                title={modalTitle}
                type={1}
            />
            <CommonModal 
                isOpen={modals.deleteModal} 
                onRequestClose={ () => closeModal('deleteModal') }
                title={modalTitle}
                type={2}
                onConfirm={completeDeleteFriend}
            />
            {/* <CommonModal 
                isOpen={isAddModalOpen} 
                onRequestClose={ () => closeModal('addModal') }
                title={modalTitle}
                type={2}
                onConfirm={''}
            /> */}
        </>
    )
}

export default function Friend() {
    const [isMiniMenuClicked, setIsMiniMenuClicked] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [sortOption, setSortOption] = useState(1);

    const handleClick = (index) => {
        setIsMiniMenuClicked(index);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSortOptionChange = (option) => {
        setSortOption(option);
    };

    // isMiniMenuClicked 변경 시 inputValue 초기화
    useEffect(() => {
        setInputValue('');
    }, [isMiniMenuClicked]);

    return (
        <div>
            <section>
                {/* 헤더 */}
                <header>
                    <HeaderStyle>친구 목록</HeaderStyle>
                </header>

                {/* 친구 목록 / 친구 요청 */}
                <article>
                    {/* 친구 검색바 */}
                    <FriendSearchBar 
                        inputValue={inputValue}
                        handleChange={handleChange}
                    />
                    
                    <ArticleStyle>
                        {/* 버튼 & 드롭다운 */}
                        <MiniNavStyle>
                            {/* 미니 메뉴 버튼 */}
                            <MiniMenuStyle>
                                <MiniMenuBtn
                                    selected={ isMiniMenuClicked === 0 }
                                    onClick={ () => handleClick(0) }
                                >
                                    친구 목록
                                </MiniMenuBtn>
                                <img src={ slashIcon } alt='슬래시 아이콘' />
                                <MiniMenuBtn
                                    selected={ isMiniMenuClicked === 1 }
                                    onClick={ () => handleClick(1) }
                                >
                                    친구 요청
                                </MiniMenuBtn>
                            </MiniMenuStyle>
                            {/* 드롭다운 - 최신순 / 이름순 */}
                            {isMiniMenuClicked === 0 && (
                                <SortDropdown
                                    firstMenu="최신순"
                                    secondMenu="이름순"
                                    handleMenuClick={handleSortOptionChange}
                                />
                            )}
                        </MiniNavStyle>
                        {/* 목록 */}
                        <ListAndRequest 
                            selected={ isMiniMenuClicked === 0 }
                            inputValue={inputValue}
                            sortOption={sortOption}
                        />
                    </ArticleStyle>
                </article>
            </section>
        </div>
    )
}