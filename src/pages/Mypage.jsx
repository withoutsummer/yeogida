import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import styled from 'styled-components';
import EditInfo from './EditInfo';
import Friend from './Friend';
import Scrap from './Scrap';

export default function Mypage() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="friend" />} />
            <Route path="editinfo" element={<EditInfo />} />
            <Route path="friend" element={<Friend />} />
            <Route path="scrap" element={<Scrap />} />
        </Routes>
    )
}