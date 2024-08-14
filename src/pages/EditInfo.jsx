import React from 'react';
import styled from 'styled-components';
import Btn from '../components/Btn';

const HeaderStyle = styled.div `
    margin-top: 100px;
    margin-bottom: 172px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    justify-content: center;
`;

const ArticleStyle = styled.div `
    margin-bottom: 274px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MiniProfile = styled.div `
    width: 214px;
    height: 274px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MiniProfileImage = styled.div `
    width: 214px;
    height: 214px;
    border-radius: 180px;
    background-color: #F4A192;
`;

const MiniProfileName = styled.div `
    margin-top: 33px;
    font-size: 28px;
    display: flex;
    justify-content: center;
    line-height: 1;
`;

const CheckPassword = styled.div `
    margin-left: 66px;
    width: 495px;
    height: 222px;
    display: flex;
    flex-direction: column;
`;

const CheckPasswordText = styled.div `
    font-size: 24px;
`;

const CheckPasswordInput = styled.input `
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

export default function EditInfo() {

    return (
        <section>
            {/* 헤더 */}
            <header>
                <HeaderStyle>개인정보 수정</HeaderStyle>
            </header>

            {/* 비밀번호 확인 */}
            <article>
                <ArticleStyle>
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
                        <CheckPasswordInput type='password' placeholder='비밀번호를 한번 더 입력해주세요.'/>
                        {/* 버튼 */}
                        <Btn 
                        text='확인'
                        style={{marginLeft: 'auto'}}
                        ></Btn>
                    </CheckPassword>
                </ArticleStyle>
            </article>
        </section>
    )
}