import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import styled from 'styled-components';
import UserInfo from './UserInfo';
import Friend from './Friend';
import Scrap from './Scrap';


export default function Mypage() {

    return (
        <Routes>

            <Route path="/" element={<Navigate to="userInfo" />} />
            <Route path="userInfo" element={<UserInfo />} />
            <Route path="friend" element={<Friend />} />
            <Route path="scrap" element={<Scrap />} />

        </Routes>
    )
}