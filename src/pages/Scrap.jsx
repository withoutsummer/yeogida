import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import cardImg from './img/card_img.png';

const HeaderStyle = styled.div`
    margin-top: 100px;
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    justify-content: center;
`;

const ScrapContainer = styled.div`
    margin: 0 86px;
`;

const ScrapMiniHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const ScrapNum = styled.div`
    background-color: #f6f6f6;
    border-radius: 20px;
    width: 93px;
    height: 34px;
    color: #000;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    line-height: 34px;
`;

const FolderName = styled.span`
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
`;

const ScrapBtn = styled.span`
    border-radius: 3px;
    width: 85px;
    height: 36px;
    background-color: #f4a192;
    color: #fff;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
`;

const ScrapCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 26px;
    min-height: 400px;
    align-items: center;
    margin-bottom: 20px;
`;

const EmptyMessage = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #e0e0e0;
    text-align: center;
    width: 100%;
`;

// ---------------폴더 Component---------------
function ScrapFolders({ onSelectFolder }) {
    const folderData = [
        { folderId: 1, folderName: '부산' },
        { folderId: 2, folderName: '제주도' },
        { folderId: 3, folderName: '속초' },
        { folderId: 4, folderName: '경주' },
    ];

    return (
        <ScrapContainer>
            <ScrapMiniHeader>
                <ScrapNum>Total {folderData.length}</ScrapNum>
                <ScrapBtn>새 폴더 생성</ScrapBtn>
            </ScrapMiniHeader>
            <ScrapCards>
                {folderData.map((folder) => (
                    <Card
                        key={folder.folderId}
                        img={cardImg}
                        title={folder.folderName}
                        icon='menu'
                        onClick={() => onSelectFolder(folder.folderId, folder.folderName)}
                    />
                ))}
            </ScrapCards>
        </ScrapContainer>
    );
}

// ---------------스크랩 Component---------------
function ScrapInFolder({ selectedFolderId, selectedFolderName, onBackToFolders }) {
    // 임시 데이터 - 스크랩
    const scrapData = [
        { folderId: 1, folderName: '부산' , scrapId: 1, scrapName: '부산 여행 1', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 2, scrapName: '부산 여행 2', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 3, scrapName: '부산 여행 3', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 4, scrapName: '부산 여행 4', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 5, scrapName: '부산 여행 5', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 6, scrapName: '부산 여행 6', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 7, scrapName: '부산 여행 7', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 8, scrapName: '부산 여행 8', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 9, scrapName: '부산 여행 9', addDate: '2024-05-13' },
        { folderId: 1, folderName: '부산' , scrapId: 10, scrapName: '부산 여행 10', addDate: '2024-05-13' },
        { folderId: 2, folderName: '제주도' , scrapId: 1, scrapName: '제주도 여행 1', addDate: '2024-05-23' },
        { folderId: 2, folderName: '제주도' , scrapId: 2, scrapName: '제주도 여행 2', addDate: '2024-05-23' },
        { folderId: 2, folderName: '제주도' , scrapId: 3, scrapName: '제주도 여행 3', addDate: '2024-05-23' },
        { folderId: 2, folderName: '제주도' , scrapId: 4, scrapName: '제주도 여행 4', addDate: '2024-05-23' },
    ];

    const filteredScrap = scrapData.filter((scrap) => scrap.folderId === selectedFolderId);

    return (
        <ScrapContainer>
            <ScrapMiniHeader>
                <ScrapNum>Total {filteredScrap.length}</ScrapNum>
                <FolderName>in {selectedFolderName}</FolderName>
                <ScrapBtn onClick={onBackToFolders}>폴더 선택</ScrapBtn>
            </ScrapMiniHeader>
            <ScrapCards>
                {filteredScrap.length > 0 ? (
                    filteredScrap.map((scrap) => (
                        <Card
                            key={scrap.scrapId}
                            img={cardImg}
                            title={scrap.scrapName}
                            date={scrap.addDate}
                            icon="delete"
                        />
                    ))
                ) : (
                    <EmptyMessage>empty</EmptyMessage>
                )}
            </ScrapCards>
        </ScrapContainer>
    );
}

export default function Scrap() {
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [selectedFolderName, setSelectedFolderName] = useState(null);

    const handleSelectFolder = (folderId, folderName) => {
        setSelectedFolderId(folderId);
        setSelectedFolderName(folderName);
    };

    const handleBackToFolders = () => {
        setSelectedFolderId(null);
    };

    return (
        <>
            <HeaderStyle>스크랩</HeaderStyle>
            {selectedFolderId === null ? (
                <ScrapFolders onSelectFolder={handleSelectFolder} />
            ) : (
                <ScrapInFolder selectedFolderId={selectedFolderId} selectedFolderName={selectedFolderName} onBackToFolders={handleBackToFolders} />
            )}
        </>
    );
}