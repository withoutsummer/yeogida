import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import cardImg from './img/card_img.png';

export default function Scrap() {

    return (
        <div>
            <Card img={cardImg} title='스크랩 1' author='seoyoung' icon='1' />
        </div>
    )
}