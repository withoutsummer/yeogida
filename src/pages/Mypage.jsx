import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import styled from 'styled-components';
import EditInfo from './EditInfo';

export default function Mypage() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="editinfo" />} />
            <Route path="editinfo" element={<EditInfo />} />
        </Routes>
    )
}