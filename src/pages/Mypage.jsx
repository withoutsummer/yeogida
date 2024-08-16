import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import styled from 'styled-components';
import EditInfo from './EditInfo';
import FriendList from './FriendList';
import Scrap from './Scrap';

export default function Mypage() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="editinfo" />} />
            <Route path="editinfo" element={<EditInfo />} />
            <Route path="friendlist" element={<FriendList />} />
            <Route path="scrap" element={<Scrap />} />
        </Routes>
    )
}