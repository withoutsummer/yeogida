import React, { useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../assets/icons/search_icon.png';
import addIcon from '../assets/icons/friend_add_icon.png';
import slashIcon from '../assets/icons/slash_icon.png';

const HeaderStyle = styled.div `
    margin-top: 100px;
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

// ---------------친구 검색바 Component---------------
function FriendSearchBar() {
    const [inputValue, setInputValue] = useState('');
    // const [isAddClicked, setIsAddClicked] = useState(0);

    const handleChange = (event) => {
        setInputValue(event.target.value);
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
    )
}

// ---------------친구 목록 Component---------------
function FriendList() {
    return (
        <div>
            친구 목록
        </div>
    )
}

// ---------------친구 요청 Component---------------
function FriendRequest() {
    return (
        <div>
            친구 요청
        </div>
    )
}

export default function Friend() {
    const [isMiniMenuClicked, setIsMiniMenuClicked] = useState(0);

    const handleClick = (index) => {
        setIsMiniMenuClicked(index);
    }

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
                    <FriendSearchBar />
                    
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
                            <div>
                                <div style={{ border: '1px solid #000', display: 'inline-block' }}>최신순</div>
                            </div>
                        </MiniNavStyle>
                        {/* 목록 */}
                        {isMiniMenuClicked ? (
                            <FriendRequest />
                        ) : (
                            <FriendList />
                        )}
                    </ArticleStyle>
                </article>
            </section>
        </div>
    )
}