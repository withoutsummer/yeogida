import React from 'react';
import styled from 'styled-components';
import menuIcon from '../assets/icons/dot_menu_icon.png';
import trashIcon from '../assets/icons/trash_outline_icon.png';

const StyledCard = styled.div`
    width: 621px;
    height: 435px;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    display: flex;
    flex-direction: column;
`;

const CardImage = styled.img`
    width: 621px;
    height: 341px;
    object-fit: cover;
`;

const CardInfoAndIcon = styled.div`
    height: 100%;
    margin: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const CardTitle = styled.span`
    font-weight: bold;
    font-size: 24px;
`;

const CardDate = styled.span`
    font-weight: bold;
    font-size: 20px;
    color: #707070;
`;

const CardIcon = styled.img`
    width: 30px;
    height: 30px;
`;

export default function Card({ type, img, title, date, onClick }) {
    return (
        <StyledCard onClick={onClick}>
            <CardImage 
                src={img}
                alt={title}
            />
            {type === 'folder' && (
                <CardInfoAndIcon>
                    <CardTitle>{title}</CardTitle>
                    <CardIcon 
                        src={menuIcon}
                        alt='menu'
                    />
                </CardInfoAndIcon>
            )}
            {type === 'scrap' && (
                <CardInfoAndIcon>
                    <CardInfo>
                        <CardTitle>{title}</CardTitle>
                        <CardDate>{date}</CardDate>
                    </CardInfo>
                    <CardIcon
                        src={trashIcon}
                        alt='delete'
                    />
                </CardInfoAndIcon>
            )}
        </StyledCard>
    );
}