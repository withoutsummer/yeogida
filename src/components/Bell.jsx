import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BellWrapper = styled.div`
    width: 24px;
    height: 24px;
    margin-left: 407px; /* <li> 태그와의 간격 조절 */
    cursor: pointer;
`;

const NotificationDropdown = styled.div`
    width: 400px;
    position: absolute;
    top: 95px;
    left: 810px;
    background: #F6F6F6;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 0;
    z-index: 1000;
`;

const NotificationTitle = styled.div`
    display: flex;
    width: 70px;
    height: 49px;
    flex-direction: column;
    justify-content: center;
    color: #000;
    text-align: center;
    font-family: NanumGothic;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 116.667% */
`;

const Divider = styled.div`
    width: 400px;
    height: 1px;
    background-color: #E0E0E0;
    margin: 5px 0;
`;

const Triangle = styled.svg`
    position: absolute;
    top: 70px;
    left: 1170px;
`;

const NotificationItem = styled.div`
    display: flex;
    justify-content: space-between; /* 텍스트와 버튼 그룹을 양쪽으로 배치 */
    align-items: center; /* 세로 정렬 */
    padding: 10px;
    &:last-child {
        border-bottom: none;
    }
`;

const NotificationText = styled.div`
    margin-left: 10px;
    flex-grow: 1;
    color: #333;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: left;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const NotificationButton = styled.button`
    display: flex;
    width: 63px;
    height: 32px;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border: none;
    border-radius: 20px;
    background: #FFF;
    color: #424242;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 131.25% */

    &:hover {
        background-color: #0D90EE;
        color: #fff;
    }
`;

const NotificationYesButton = styled.button`
    display: flex;
    width: 63px;
    height: 32px;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border: none;
    border-radius: 20px;
    background: #59ABE6;
    color: #FFF;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 131.25% */

    &:hover {
        background-color: #0D90EE;
    }
`;

const FriendRequestContainer = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
`;

const Bell = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, friendId: 'sieun', message: '제주도 여행' },
        { id: 2, friendId: 'seoyoung', message: '경주 2박 3일' },
    ]);
    
    // 친구 요청 여부 (임시 데이터)
    const [friendRequest, setFriendRequest] = useState(true);

    const handleBellClick = () => {
        setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기 토글
    };

    const handleAccept = (id) => {
        // 나의 여행에 추가하기
        // 추후 구현 예정
    };

    const handleReject = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <BellWrapper
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => !isDropdownOpen && setHovered(false)}
            onClick={handleBellClick} // 클릭 이벤트 추가
        >
            {hovered ? (
                isDropdownOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20.5196 15.2116L18.7196 13.4016V8.9416C18.7435 7.28543 18.1674 5.67651 17.0977 4.41194C16.028 3.14737 14.5368 2.31254 12.8996 2.0616C11.9494 1.93647 10.9834 2.01542 10.0662 2.29318C9.14893 2.57094 8.30146 3.04113 7.58031 3.67236C6.85916 4.3036 6.28093 5.08138 5.88419 5.9538C5.48745 6.82622 5.28133 7.77321 5.27958 8.7316V13.4016L3.47958 15.2116C3.25349 15.4415 3.10017 15.7329 3.03879 16.0494C2.9774 16.3659 3.01068 16.6935 3.13446 16.9912C3.25824 17.289 3.46704 17.5436 3.73474 17.7233C4.00244 17.903 4.31717 17.9998 4.63958 18.0016H7.99958V18.3416C8.04629 19.3568 8.49354 20.3121 9.24331 20.9981C9.99308 21.6842 10.9842 22.045 11.9996 22.0016C13.0149 22.045 14.0061 21.6842 14.7559 20.9981C15.5056 20.3121 15.9529 19.3568 15.9996 18.3416V18.0016H19.3596C19.682 17.9998 19.9967 17.903 20.2644 17.7233C20.5321 17.5436 20.7409 17.289 20.8647 16.9912C20.9885 16.6935 21.0218 16.3659 20.9604 16.0494C20.899 15.7329 20.7457 15.4415 20.5196 15.2116V15.2116ZM13.9996 18.3416C13.9441 18.8226 13.7052 19.2637 13.3327 19.5729C12.9601 19.8821 12.4826 20.0357 11.9996 20.0016C11.5166 20.0357 11.0391 19.8821 10.6665 19.5729C10.2939 19.2637 10.055 18.8226 9.99958 18.3416V18.0016H13.9996V18.3416Z" fill="black"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.92827 8.32543C6.09393 6.8613 6.805 5.50846 7.92536 4.52588C9.04572 3.54329 10.4967 3 12.0004 3C13.5042 3 14.9551 3.54329 16.0755 4.52588C17.1958 5.50846 17.9069 6.8613 18.0726 8.32543L18.3482 10.7532L18.3547 10.8142C18.4959 12.0185 18.8963 13.1797 19.5293 14.2212L19.5622 14.2748L20.1932 15.3065C20.7674 16.2429 21.0539 16.7111 20.9916 17.0958C20.9504 17.3511 20.8164 17.5832 20.6143 17.7493C20.3091 18 19.7514 18 18.6369 18H5.36393C4.24837 18 3.69059 18 3.38655 17.7504C3.18378 17.5841 3.04935 17.3516 3.00813 17.0958C2.94689 16.7111 3.23343 16.2429 3.80652 15.3065L4.43977 14.2737L4.47258 14.2202C5.10512 13.1789 5.50509 12.0181 5.6461 10.8142L5.65266 10.7532L5.92827 8.32543Z" stroke="black" strokeWidth="2"/>
                        <path d="M9 18C9 19.0609 9.31607 20.0783 9.87868 20.8284C10.4413 21.5786 11.2044 22 12 22C12.7956 22 13.5587 21.5786 14.1213 20.8284C14.6839 20.0783 15 19.0609 15 18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5.92827 8.32543C6.09393 6.8613 6.805 5.50846 7.92536 4.52588C9.04572 3.54329 10.4967 3 12.0004 3C13.5042 3 14.9551 3.54329 16.0755 4.52588C17.1958 5.50846 17.9069 6.8613 18.0726 8.32543L18.3482 10.7532L18.3547 10.8142C18.4959 12.0185 18.8963 13.1797 19.5293 14.2212L19.5622 14.2748L20.1932 15.3065C20.7674 16.2429 21.0539 16.7111 20.9916 17.0958C20.9504 17.3511 20.8164 17.5832 20.6143 17.7493C20.3091 18 19.7514 18 18.6369 18H5.36393C4.24837 18 3.69059 18 3.38655 17.7504C3.18378 17.5841 3.04935 17.3516 3.00813 17.0958C2.94689 16.7111 3.23343 16.2429 3.80652 15.3065L4.43977 14.2737L4.47258 14.2202C5.10512 13.1789 5.50509 12.0181 5.6461 10.8142L5.65266 10.7532L5.92827 8.32543Z" stroke="black" strokeWidth="2"/>
                    <path d="M9 18C9 19.0609 9.31607 20.0783 9.87868 20.8284C10.4413 21.5786 11.2044 22 12 22C12.7956 22 13.5587 21.5786 14.1213 20.8284C14.6839 20.0783 15 19.0609 15 18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )}
            {isDropdownOpen && (
                <>
                    <Triangle xmlns="http://www.w3.org/2000/svg" width="29" height="16" viewBox="0 0 29 16" fill="#F6F6F6">
                        <path d="M14.5 0L28.7894 15.75H0.210581L14.5 0Z" />
                    </Triangle>
                    <NotificationDropdown>
                        <NotificationTitle>알림</NotificationTitle>
                        <Divider />
                        {friendRequest && (
                            <FriendRequestContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                                    <circle cx="15.5" cy="15.5" r="15.5" fill="#03BFEF"/>
                                    <g transform="translate(3.5, 3.5)">
                                        <path d="M21 6H20V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5V6H17C16.7348 6 16.4804 6.10536 16.2929 6.29289C16.1054 6.48043 16 6.73478 16 7C16 7.26522 16.1054 7.51957 16.2929 7.70711C16.4804 7.89464 16.7348 8 17 8H18V9C18 9.26522 18.1054 9.51957 18.2929 9.70711C18.4804 9.89464 18.7348 10 19 10C19.2652 10 19.5196 9.89464 19.7071 9.70711C19.8946 9.51957 20 9.26522 20 9V8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6Z" fill="white"/>
                                        <path d="M10 11C10.7911 11 11.5645 10.7654 12.2223 10.3259C12.8801 9.88635 13.3928 9.26164 13.6955 8.53074C13.9983 7.79983 14.0775 6.99556 13.9231 6.21964C13.7688 5.44372 13.3878 4.73098 12.8284 4.17157C12.269 3.61216 11.5563 3.2312 10.7804 3.07686C10.0044 2.92252 9.20017 3.00173 8.46927 3.30448C7.73836 3.60723 7.11365 4.11992 6.67412 4.77772C6.2346 5.43552 6 6.20888 6 7C6 8.06087 6.42143 9.07828 7.17157 9.82843C7.92172 10.5786 8.93913 11 10 11Z" fill="white"/>
                                        <path d="M16 21C16.2652 21 16.5196 20.8946 16.7071 20.7071C16.8946 20.5196 17 20.2652 17 20C17 18.1435 16.2625 16.363 14.9497 15.0503C13.637 13.7375 11.8565 13 10 13C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21" fill="white"/>
                                    </g>
                                </svg>
                                <NotificationText>새로운 친구 요청이 왔습니다.</NotificationText>
                                <NotificationButton onClick={() => navigate('/mypage/friend')}>확인</NotificationButton>
                            </FriendRequestContainer>
                        )}
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <NotificationItem key={index}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                        <circle cx="15" cy="15" r="15" fill="#D9D9D9" />
                                    </svg>
                                    <NotificationText>{notification.friendId}</NotificationText>
                                    <NotificationText>{notification.message}</NotificationText>
                                    <ButtonContainer>
                                        <NotificationYesButton onClick={() => handleAccept(notification.id)}>수락</NotificationYesButton>
                                        <NotificationButton onClick={() => handleReject(notification.id)}>거절</NotificationButton>
                                    </ButtonContainer>
                                </NotificationItem>
                            ))
                        ) : (
                            <NotificationItem>
                                <NotificationText>새로운 알림이 없습니다.</NotificationText>
                            </NotificationItem>
                        )}
                    </NotificationDropdown>
                </>
            )}
        </BellWrapper>
    );
};

export default Bell;