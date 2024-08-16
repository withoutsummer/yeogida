import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
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
`;

const BeforeCheckStyle = styled.div `
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

const AfterCheckStyle = styled.div `
    width: 875px;
    height: 1203px;
    margin: auto;
    display: flex;
    flex-direction: column;
    // background-color: red;
`;

const Pink = styled.div `
    display: inline;
    color: #FC6449;
`;

const IsAbleToEdit = styled.div `
    margin-left: auto;
    font-size: 18px;
`;

const TextEditInfo = styled.div `
    margin-top: 35px;
    margin-right: 30px;
    font-size: 20px;
    font-weight: normal;
    text-align: left;
`;

const InputEditInfo = styled.input `
    margin-top: 35px;
    width: 490px;
    height: 65px;
    border-radius: 15px;
    border: 1px solid #707070;
    color: #000;
    padding-left: 20px;
    font-size: 20px;
    box-sizing: border-box;

    &:placeholder {
        color: #707070;
    }

    &:focus {
        outline: none;
    }
`;

const AlertTextEditInfo = styled.div `
    font-size: 16px;
    color: #FC6449;
`;

const BtnContainer = styled.div `
    margin: auto;
    margin-top: 72px;
`;

function BeforeCheck ({ btnClick }) {
    const handleCheck = () => {
        btnClick(true);
    }

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
                <CheckPasswordText>비밀번호 확인</CheckPasswordText>
                {/* 입력칸 */}
                {/* <CheckPasswordInput type='password' placeholder='비밀번호를 한번 더 입력해주세요.'/> */}
                <InputEditInfo 
                type='password' placeholder='비밀번호를 한번 더 입력해주세요.' 
                style={{ marginTop:'20px', marginBottom:'60px' }}/>
                {/* 버튼 */}
                <Btn 
                text='확인'
                style={{marginLeft: 'auto'}}
                onClick={ handleCheck } />
            </CheckPassword>
        </BeforeCheckStyle>
    )
}

function AfterCheck () {
    return (
        <AfterCheckStyle>
            <IsAbleToEdit><Pink>*</Pink>수정가능사항</IsAbleToEdit>
            <div>
                <table style={{ margin: 'auto' }}>
                    <tr>
                        <th><TextEditInfo>아이디</TextEditInfo></th>
                        <td><TextEditInfo>baeksy1234</TextEditInfo></td>
                    </tr>
                    <tr>
                        <th><TextEditInfo>비밀번호<Pink>*</Pink></TextEditInfo></th>
                        <td>
                            <InputEditInfo type='password' placeholder='비밀번호를 입력해주세요.'/>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <AlertTextEditInfo>영문/숫자/특수 문자(공백 제외)만 허용하며, 3가지 모두 조합</AlertTextEditInfo>
                        </td>
                    </tr>
                    <tr>
                        <th><TextEditInfo>비밀번호 확인<Pink>*</Pink></TextEditInfo></th>
                        <td>
                            <InputEditInfo type='password' placeholder='비밀번호를 한번 더 입력해주세요.' />
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <AlertTextEditInfo>동일한 비밀번호를 입력</AlertTextEditInfo>
                        </td>
                    </tr>
                    <tr>
                        <th><TextEditInfo>이름</TextEditInfo></th>
                        <td><TextEditInfo>백서영</TextEditInfo></td>
                    </tr>
                    <tr>
                        <th><TextEditInfo>이메일<Pink>*</Pink></TextEditInfo></th>
                        <td>
                            <InputEditInfo type='email' placeholder='ex: swuweb@travel.com'/>
                        </td>
                        <td style={{ display:'inline-block' }}>
                            <Btn 
                            width='189px'
                            height='65px'
                            backgroundColor='#FAD5CE'
                            borderRadius='15px'
                            borderColor='#FAD5CE'
                            style={{ verticalAlign:'top', marginTop:'35px', marginLeft:'20px' }}
                            fontSize='20px'
                            fontWeight='bold'
                            text='중복확인'
                            />
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <AlertTextEditInfo>이메일 형식으로 입력해 주세요.</AlertTextEditInfo>
                        </td>
                    </tr>
                    <tr>
                        <th><TextEditInfo>휴대폰</TextEditInfo></th>
                        <td><TextEditInfo>010 - 1234 - 5678</TextEditInfo></td>
                    </tr>
                    <tr>
                        <th><TextEditInfo>닉네임<Pink>*</Pink></TextEditInfo></th>
                        <td><InputEditInfo type='text' placeholder='닉네임을 입력해주세요.'/></td>
                    </tr>
                    <tr>
                        <th><TextEditInfo>생년월일</TextEditInfo></th>
                        <td><TextEditInfo>2000  /  07  /  20</TextEditInfo></td>
                    </tr>
                    <tr>
                        <th><TextEditInfo>프로필 사진<Pink>*</Pink></TextEditInfo></th>
                        <td><MiniProfileImage style={{ margin:'35px auto 0' }}/></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <Btn 
                                width='240px'
                                height='82px'
                                borderRadius='15px'
                                fontSize='26px'
                                backgroundColor='#fff'
                                color='#F4A192'
                                borderColor='#F4A192'
                                style={{ marginTop:'72px' }}
                                text='회원 탈퇴' />
                            <Btn 
                                width='240px'
                                height='82px'
                                borderRadius='15px'
                                fontSize='26px'
                                fontWeight='bold'
                                borderColor='#F4A192'
                                style={{ marginLeft: '10px', marginTop:'72px' }}
                                text='수정하기'/>
                        </td>
                    </tr>
                </table>
            </div>
        </AfterCheckStyle>
    )
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
                        <BeforeCheck btnClick={setIsBtnClicked}/>
                    )}
                    {/* <AfterCheck /> */}
                </ArticleStyle>
            </article>
        </section>
    )
}