import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/ScrapCard';
import cardImg from './img/card_img.png';
import Modal from '../components/CommonModal';

const HeaderStyle = styled.div`
    margin-top: 150px;
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    justify-content: center;
`;

const ScrapContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ScrapMiniHeader = styled.div`
    width: 1275px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 16px 0;

    @media (max-width: 1275px) {
        width: 625px;
    }
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
    background-color: #f4a192;
    color: #fff;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    padding: 10px;
    line-height: normal;
    font-weight: bold;
    font-size: 16px;
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
    const [oneBtnModal, setOneBtnModal] = useState(false);
    const [twoBtnModal, setTwoBtnModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalChildren, setModalChildren] = useState('');
    const [thisFolderName, setThisFolderName] = useState('');

    // 스크랩 폴더 상태 관리
    // const [folderData, setFolderData] = useState([]);  // 폴더 데이터
    // const [loading, setLoading] = useState(true);      // 로딩 상태 관리
    // const [error, setError] = useState(null);          // 에러 상태 관리

    // 폴더 삭제 요청 Modal
    const handleDeleteFolder = (e, folderName) => {
        e.stopPropagation(); // 부모 요소로의 이벤트 전파 중단
        setThisFolderName(folderName);
        setModalTitle('폴더를 삭제하시겠습니까?');
        setModalChildren('해당 폴더 속 일정 스크랩도 모두 삭제됩니다.');
        setTwoBtnModal(true);
    };

    // 폴더 삭제 완료 Modal
    const completeDeleteFolder = () => {
        console.log(`'${thisFolderName}' 폴더 삭제 완료`)
        setModalTitle('폴더가 삭제되었습니다.');
        setOneBtnModal(true);
    };

    // 폴더 이름 변경 Modal
    const handleRenameFolder = () => {
        console.log('폴더 이름 변경 코드 실행')
    }

    // 임시 데이터 - 스크랩 폴더
    const folderData = [
        { folderId: 1, folderName: '부산' },
        { folderId: 2, folderName: '제주도' },
        { folderId: 3, folderName: '속초' },
        { folderId: 4, folderName: '경주' },
    ];

    // 스크랩 폴더 목록 조회 API
    // const getScrapFolderList = async () => {
    //     try {
    //         const response = await fetch('/mypage/scrap', {
    //             method: 'GET',
    //         });

    //         console.log('Response:', response);  // 응답 확인

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();  // 서버로부터 받은 JSON 데이터를 자바스크립트 객체로 변환
    //         console.log('Data:', data); 
    //         setFolderData(data);  // 받은 데이터를 상태로 저장
    //         setLoading(false);    // 로딩 완료
    //     } catch (error) {
    //         console.error('Error fetching folder data:', error);
    //         setError(error.message);  // 에러 상태 저장
    //         setLoading(false);
    //     }
    // };

    // 컴포넌트가 마운트될 때 API 호출
    // useEffect(() => {
    //     getScrapFolderList();
    // }, []);

    // if (loading) return <p>로딩 중...</p>;  // 로딩 중일 때
    // if (error) return <p>에러: {error}</p>; // 에러 발생 시

    return (
        <>
            <ScrapContainer>
                <ScrapMiniHeader>
                    <ScrapNum>Total {folderData.length}</ScrapNum>
                    <ScrapBtn>새 폴더 생성</ScrapBtn>
                </ScrapMiniHeader>
                <ScrapCards>
                    {folderData.map((folder) => (
                        <Card
                            key={folder.folderId}
                            type='folder'
                            img={cardImg}
                            title={folder.folderName}
                            onCardClick={() => onSelectFolder(folder.folderId, folder.folderName)}
                            onDeleteFolder={(e) => handleDeleteFolder(e, folder.folderName)}
                            onRenameFolder={(e) => handleRenameFolder(e, folder.folderName)}
                        />
                    ))}
                </ScrapCards>
            </ScrapContainer>

            {/* Modals */}
            <Modal 
                isOpen={oneBtnModal} 
                onRequestClose={ () => setOneBtnModal(false) }
                title={modalTitle}
                type={1}
            />
            <Modal 
                isOpen={twoBtnModal} 
                onRequestClose={ () => setTwoBtnModal(false) }
                title={modalTitle}
                children={modalChildren}
                type={2}
                onConfirm={completeDeleteFolder}
            />
        </>
    );
}

// ---------------스크랩 Component---------------
function ScrapInFolder({ selectedFolderId, selectedFolderName, onBackToFolders }) {
    const [oneBtnModal, setOneBtnModal] = useState(false);
    const [twoBtnModal, setTwoBtnModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [thisScrapName, setThisScrapName] = useState('');
    
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

    // 스크랩 삭제 요청 Modal
    const handleDeleteScrap = (e, scrapName) => {
        e.stopPropagation(); // 부모 요소로의 이벤트 전파 중단
        setThisScrapName(scrapName);
        setModalTitle('스크랩을 삭제하시겠습니까?');
        setTwoBtnModal(true);
    };

    // 스크랩 삭제 완료 Modal
    const completeDeleteScrap = () => {
        console.log(`'${thisScrapName}' 스크랩 삭제 완료`)
        setModalTitle('스크랩이 삭제되었습니다.');
        setOneBtnModal(true);
    };

    return (
        <>
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
                                type='scrap'
                                img={cardImg}
                                title={scrap.scrapName}
                                date={scrap.addDate}
                                onDeleteScrap={(e) => handleDeleteScrap(e, scrap.scrapName)}
                            />
                        ))
                    ) : (
                        <EmptyMessage>empty</EmptyMessage>
                    )}
                </ScrapCards>
            </ScrapContainer>

            {/* Modals */}
            <Modal 
                isOpen={oneBtnModal} 
                onRequestClose={ () => setOneBtnModal(false) }
                title={modalTitle}
                type={1}
            />
            <Modal 
                isOpen={twoBtnModal} 
                onRequestClose={ () => setTwoBtnModal(false) }
                title={modalTitle}
                type={2}
                onConfirm={completeDeleteScrap}
            />
        </>
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