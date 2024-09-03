import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Btn from '../components/Btn';

const HeaderStyle = styled.div`
    margin-top: 100px;
    margin-bottom: 172px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    justify-content: center;
`;

const ArticleStyle = styled.div`
    margin-bottom: 274px;
`;

const BeforeCheckStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MiniProfile = styled.div`
    width: 214px;
    height: 274px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MiniProfileImage = styled.div`
    width: 214px;
    height: 214px;
    border-radius: 180px;
    background-color: #f4a192;
`;

const MiniProfileName = styled.div`
    margin-top: 33px;
    font-size: 28px;
    display: flex;
    justify-content: center;
    line-height: 1;
`;

const CheckPassword = styled.div`
    margin-left: 66px;
    width: 495px;
    height: 222px;
    display: flex;
    flex-direction: column;
`;

const CheckPasswordText = styled.div`
    font-size: 24px;
`;

const CheckPasswordInput = styled.input`
    margin-top: 20px;
    margin-bottom: 60px;
    padding-left: 16px;
    width: 474px;
    height: 65px;
    border-radius: 8px;
    border: 1px solid #707070;
    font-size: 16px;

    &:placeholder {
        color: #707070;
    }

    &:focus {
        outline: none;
    }
`;

const AfterCheckStyle = styled.div``;

function BeforeCheck({ btnClick }) {
    const handleCheck = () => {
        btnClick(true);
    };

    return (
        <BeforeCheckStyle>
            {/* 프로필 */}
            <MiniProfile>
                <MiniProfileImage />
                <MiniProfileName>seoyoung</MiniProfileName>
            </MiniProfile>

            {/* 비밀번호 입력란 */}
            <CheckPassword>
                {/* 텍스트 */}
                <CheckPasswordText>비밀번호 입력</CheckPasswordText>
                {/* 입력칸 */}
                <CheckPasswordInput
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해주세요."
                />
                {/* 버튼 */}
                <Btn
                    text="확인"
                    style={{ marginLeft: 'auto' }}
                    onClick={handleCheck}
                />
            </CheckPassword>
        </BeforeCheckStyle>
    );
}

function AfterCheck() {
    return (
        <AfterCheckStyle>
            <div>*수정가능사항</div>
            <div>
                <table>
                    <tr>
                        <th>아이디</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호*</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인*</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                    <tr>
                        <th>이메일*</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                    <tr>
                        <th>휴대폰</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                    <tr>
                        <th>닉네임*</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                    <tr>
                        <th>프로필 사진*</th>
                        <td>
                            <input />
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <Btn
                    width="490px"
                    height="82px"
                    borderRadius="15px"
                    fontSize="26px"
                    text="수정하기"
                />
            </div>
        </AfterCheckStyle>
    );
}

export default function EditInfo() {
    const [isBtnClicked, setIsBtnClicked] = useState(false);

    return (
        <section>
            {/* 헤더 */}
            <header>
                <HeaderStyle>개인정보 수정</HeaderStyle>
            </header>

            {/* 비밀번호 확인 */}
            <article>
                <ArticleStyle>
                    {isBtnClicked ? (
                        // 비밀번호 확인 성공하면 개인정보 수정 페이지 렌더링
                        <AfterCheck />
                    ) : (
                        // 처음에는 비밀번호 확인 페이지 렌더링
                        <BeforeCheck btnClick={setIsBtnClicked} />
                    )}
                    {/* <AfterCheck /> */}
                </ArticleStyle>
            </article>
        </section>
    );
}
