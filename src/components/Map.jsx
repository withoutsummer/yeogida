import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  font-size: 16px;
`;

const SearchResultsContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 300px;
  max-height: 400px;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const SearchResultItem = styled.li`
  list-style: none;
  margin-bottom: 10px;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
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
        tileDuration: 300,
        baseTileOpacity: 1,
        background: 'white',
        tileSpare: 7,
      };

      mapRef.current = new naver.maps.Map('map', mapOptions);

      const samples = [
        { lat: currentMyLocation.lat, lng: currentMyLocation.lng },
        { lat: 37.5666103, lng: 126.9783882 },
        { lat: 37.5796103, lng: 126.9772882 },
      ];

      samples.forEach((sample, i) => {
        addMarker(sample.lat, sample.lng, i + 1);
      });
    }
  }, [currentMyLocation]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/places/search?query=${searchQuery}`);
      setSearchResults(response.data.items.map((item) => ({
        title: item.title,
        address: item.roadAddress,
        lat: item.mapx,
        lng: item.mapy,
      })));
    } catch (error) {
      console.error('Error fetching place data:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="장소 검색"
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>

      {searchResults.length > 0 && (
        <SearchResultsContainer>
          <ul>
            {searchResults.map((result, index) => (
              <SearchResultItem key={index} onClick={() => addMarker(result.lat, result.lng, index + 1)}>
                {result.title} - {result.address}
              </SearchResultItem>
            ))}
          </ul>
        </SearchResultsContainer>
      )}

      <div id="map" style={{ width: '900px', height: '500px', margin: '20px auto' }} />
    </>
  );
}

export default Map;