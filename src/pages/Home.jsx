import React, { useEffect, useRef, useState } from 'react';
// import Image from '../pages/img';
import styled from 'styled-components';
import Button from '../components/Btn';
import Input from '../components/FindInputField';

const HomeContainer = styled.div`
    margin-top: 100px;
`;

export default function Home() {
    return <HomeContainer>홈입니다.</HomeContainer>;
}
