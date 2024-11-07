import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../assets/hooks/useGeolocation';

const SearchContainer = styled.div`
  max-width: 950px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 800px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #59ABE6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: NanumGothic;
  font-size: 16px;
`;

const SearchResultsContainer = styled.div`
  max-width: 950px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  border: 1px solid #ddd;
`;

const SearchResults = styled.ul`
  margin: 0;
  padding: 0;
  overflow-y: auto; /* 스크롤 추가 */
  list-style: none;
`;

const SearchResultItem = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  position: relative;

  .text-container {
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

  .title {
    font-family: NanumGothic;
    font-weight: bold;
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
  }

  .address {
    font-family: NanumGothic;
    font-size: 12px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
  }

  .add-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    width: 70px;
    background-color: transparent;
    color: #4CAF50;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid #4CAF50;
    border-radius: 4px;
    cursor: pointer;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  &:hover .add-button {
    background-color: #4CAF50;
    color: white;
  }
`;

const NoResultsMessage = styled.div`
  display: flex;
  width: 20%;
  margin-top: 250px;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: NanumGothic;
  font-size: 14px;
  color: #000;
  text-align: center;
`;

const MapContainer = styled.div`
  width: 80%;
  height: 500px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

function Map() {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeolocation();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0) {
      const mapOptions = {
        center: new naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        tileDuration: 200,
        zoom: 14,
        zoomControl: true,
        zoomControlOptions: { position: 9 },
        baseTileOpacity: 1,
        background: 'white',
        tileSpare: 7,
      };

      mapRef.current = new naver.maps.Map('map', mapOptions);
    }
  }, [currentMyLocation]);

  const handleSearch = async () => {
    if (!searchQuery) return; // 검색어가 없으면 함수 종료

    try {
        console.log('장소 검색 요청 시작'); // 요청 시작 로그
        console.log(`검색어: ${searchQuery}`); // 검색어 확인

        const response = await fetch(`https://yeogida.net/api/places/search?query=${encodeURIComponent(searchQuery)}`);
        
        if (response.status === 404) {
            console.error('검색 결과가 없습니다.');
            setSearchResults([]); // 빈 결과를 표시
            return;
        }

        if (!response.ok) {
            throw new Error('네트워크 응답이 실패했습니다.');
        }

        const data = await response.json();
        console.log('검색된 장소 결과:', data);

        setSearchResults((data || []).map((item) => ({
            title: item.title,
            address: item.roadAddress,
            lat: item.mapx,
            lng: item.mapy,
        })));

        console.log('장소 검색 완료');
    } catch (error) {
        console.error('장소 검색 중 오류 발생:', error); // 오류 발생 로그
    }
  };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Enter 키 입력 시 검색 실행
        }
    };

  const createCustomMarker = (index) => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" fill="none">
        <path d="M16 40C16 40 31 26.4348 31 16.2609C31 7.83252 24.2843 1 16 1C7.71573 1 1 7.83252 1 16.2609C1 26.4348 16 40 16 40Z" fill="black"/>
        <path d="M20.7923 15.6253C20.7923 18.3177 18.647 20.5003 16.0006 20.5003C13.3542 20.5003 11.2089 18.3177 11.2089 15.6253C11.2089 12.9329 13.3542 10.7503 16.0006 10.7503C18.647 10.7503 20.7923 12.9329 20.7923 15.6253Z" fill="black"/>
        <path d="M16 40C16 40 31 26.4348 31 16.2609C31 7.83252 24.2843 1 16 1C7.71573 1 1 7.83252 1 16.2609C1 26.4348 16 40 16 40Z" stroke="black" stroke-width="2"/>
        <path d="M20.7923 15.6253C20.7923 18.3177 18.647 20.5003 16.0006 20.5003C13.3542 20.5003 11.2089 18.3177 11.2089 15.6253C11.2089 12.9329 13.3542 10.7503 16.0006 10.7503C18.647 10.7503 20.7923 12.9329 20.7923 15.6253Z" stroke="black" stroke-width="2"/>
        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" style="fill: #FFF; font-family: NanumGothic; font-size: 20px; font-weight: 600;">${index}</text>
      </svg>
    `;
  };
  
  // 마커를 추가할 때
  const addMarker = (lat, lng, index) => {
    const markerContent = createCustomMarker(index);
    
    new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map: mapRef.current,
      icon: {
        content: markerContent,
        anchor: new naver.maps.Point(16, 40),
      },
    });
  };
  
  return (
    <>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="장소 검색"
        />
        <SearchButton onClick={handleSearch}>검 색</SearchButton>
      </SearchContainer>

      <SearchResultsContainer>
        {searchResults.length > 0 ? (
            <SearchResults>
              {searchResults.map((result, index) => (
                <SearchResultItem key={index} onClick={() => addMarker(result.lat, result.lng, index + 1)}>
                  <div className="text-container">
                    <span className="title">{result.title}</span>
                    <span className="address">{result.address}</span>
                  </div>
                  <button className="add-button" onClick={() => addMarker(result.lat, result.lng, index + 1)}>
                    + 추가
                  </button>
                </SearchResultItem>
              ))}
            </SearchResults>
        ) : (
          <NoResultsMessage>
            원하는 장소를 검색해보세요.
          </NoResultsMessage>
        )}
        <MapContainer id="map" /> 
      </SearchResultsContainer>
    </>
  );
}

export default Map;