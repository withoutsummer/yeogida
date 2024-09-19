import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    max-width: 1400px;
    justify-content: right;
    flex-shrink: 0;
    margin: 100px auto 0px; /* 좌우 가운데 정렬을 위해 margin을 사용 */
`;

const NavButton = styled.button`
    display: flex;
    width: 80px;
    height: 36px;
    margin: 5px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: #F6F6F6;
    color: #000;
    font-family: NanumGothic;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    border: none;
    &:hover {
        background-color: #000;
        color: #FFF;
    }
`;

// 상단의 썸네일, 제목, 날짜를 포함하는 컨테이너
const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  height: 400px;
  background-image: ${({ thumbnail }) => `url(${thumbnail})`};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: 0 auto; /* 좌우 가운데 정렬을 위해 margin을 사용 */

  overflow: hidden; /* 오버레이가 컨테이너를 벗어나지 않도록 */

  /* 오버레이를 추가하여 투명도 조절 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); /* 원하는 투명도 값으로 설정 */
    z-index: 1; /* 텍스트와 같은 컨텐츠보다 아래에 위치 */
  }

  /* 오버레이 위에 텍스트가 위치하도록 */
  > * {
    position: relative;
    z-index: 2;
  }
`;

const Title = styled.h1`
  font-family: NanumGothic;
  font-size: 60px;
  font-weight: bold;
  color: #fff;
  margin: 80px 0 60px 0;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const EditButton = styled.button`
    display: flex;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    height: 35px;
    background-color: transparent;
    border: none;
    justify-content: right;
    align-items: center;
    flex-shrink: 0;
`;

const UserId = styled.h3`
  font-family: NanumGothic;
  font-size: 18px;
  color: #fff;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const DateRange = styled.h3`
  font-family: NanumGothic;
  font-size: 20px;
  color: #fff;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const DayTabs = styled.div`
  display: flex;
  border-bottom: 2px solid #E0E0E0;
  width: 1400px;
  height: 60px; 
  margin: 0 auto;
  margin-bottom: 20px;
`;

const DayTab = styled.button`
  padding: 10px 20px;
  background-color: ${({ isSelected }) => (isSelected ? '#E0E0E0' : '#FFF')};
  color: ${({ isSelected }) => (isSelected ? '#000' : '#707070')};
  border: none;
  cursor: pointer;
  flex-grow: 1;
  color: #000;
  text-align: center;
  font-family: NanumGothic;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
`;

const SearchContainer = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 1400px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #F4A192;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

// 지도 컨테이너
const MapContainer = styled.div`
  position: relative;
  width: 1400px;
  height: 500px;
  margin: 20px auto;
`;

// 검색 결과 리스트를 위한 스타일
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
  z-index: 1000; /* 지도 위에 오도록 높은 z-index 설정 */
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

// Quill 에디터를 포함하는 컨테이너
const EditorContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 0 20px;
`;

export default function Editor({ onChange = () => {} }) {
  const location = useLocation();
  const { 제목: title = '', 기간: dateRange = '', 썸네일: thumbnail = '', value = [] } = location.state || {};

  const [currentDay, setCurrentDay] = useState(1);
  const [days, setDays] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장할 상태

  useEffect(() => {
    if (dateRange) {
      const [startDate, endDate] = dateRange.split(' ~ ').map(date => new Date(date.replace(/\//g, '-')));
      const dayCount = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
      const dayTabs = Array.from({ length: dayCount }, (_, i) => `DAY ${i + 1}`);
      setDays(dayTabs);
    }
  }, [dateRange]);

  const [map, setMap] = useState(null);

  useEffect(() => {
      if (window.naver && !map) { 
        navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const mapOptions = {
          center: new window.naver.maps.LatLng(37.52133, 126.9522),
          logoControl: false,
          mapDataControl: false,
          scaleControl: true,
          zoom: 17,
          minZoom: 15,
          zoomControl: true,
          zoomControlOptions: { position: 9 },
          tileDuration: 300,
          baseTileOpacity: 1,
          background: 'white',
          tileSpare: 7,
        };

        const mapInstance = new window.naver.maps.Map('map', mapOptions);
        setMap(mapInstance);

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latitude, longitude),
          map: mapInstance,
        });
      }, (error) => {
        console.error('Error fetching location', error);
      });
    }
  }, [map]); 

  const handleSearch = () => {
    if (searchKeyword.trim() && map && window.naver && window.naver.maps && window.naver.maps.Service) {
      window.naver.maps.Service.geocode({ query: searchKeyword }, (status, response) => {
        if (status === window.naver.maps.Service.Status.ERROR) {
          alert('검색결과가 없습니다. 다른 주소를 시도해 보세요.');
        } else if (status === window.naver.maps.Service.Status.OK) {
          const results = response.v2.addresses;
          setSearchResults(results); 

          if (results.length > 0) {
            const firstResult = results[0];
            const x = parseFloat(firstResult.x);
            const y = parseFloat(firstResult.y);
            const newLocation = new window.naver.maps.LatLng(y, x);

            map.setCenter(newLocation);
            new window.naver.maps.Marker({ position: newLocation, map });
          } else {
            alert('검색결과가 없습니다. 다른 주소를 시도해 보세요.');
          }
        }
      });
    }
  };

  const handleSearchItemClick = (x, y) => {
    const newLocation = new window.naver.maps.LatLng(parseFloat(y), parseFloat(x));
    map.setCenter(newLocation);
    new window.naver.maps.Marker({ position: newLocation, map });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',
  ];

  const handleContentChange = (content, delta, source, editor) => {
    const newContent = [...value];
    newContent[currentDay - 1] = content;
    onChange(newContent);
  };

  return (
    <div>
      <ButtonContainer>
        <NavButton>취소하기</NavButton>
        <NavButton>저장하기</NavButton>
      </ButtonContainer>

      {/* 썸네일, 제목, 날짜를 표시하는 상단 영역 */}
      <HeaderContainer thumbnail={thumbnail}>
        <EditButton>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
            <path d="M28.2916 10.7046L24.2958 6.70874C23.7743 6.21888 23.0909 5.9378 22.3756 5.91898C21.6604 5.90016 20.9632 6.1449 20.4166 6.60665L7.29161 19.7317C6.82023 20.207 6.52672 20.8301 6.46036 21.4962L5.83328 27.5775C5.81363 27.7911 5.84135 28.0064 5.91445 28.2081C5.98755 28.4097 6.10424 28.5928 6.25619 28.7442C6.39246 28.8793 6.55407 28.9862 6.73175 29.0588C6.90943 29.1314 7.09968 29.1682 7.29161 29.1671H7.42286L13.5041 28.6129C14.1703 28.5465 14.7933 28.253 15.2687 27.7817L28.3937 14.6567C28.9031 14.1185 29.1784 13.4003 29.1593 12.6595C29.1402 11.9187 28.8281 11.2157 28.2916 10.7046V10.7046ZM23.3333 15.5754L19.4249 11.6671L22.2687 8.7504L26.2499 12.7317L23.3333 15.5754Z" fill="white"/>
          </svg>
        </EditButton>
        <Title>{title}</Title>
        <UserId>사용자</UserId>
        <DateRange>{dateRange}</DateRange>
      </HeaderContainer>

      {/* Day 탭을 선택할 수 있는 영역 */}
      <EditorContainer>
        <DayTabs>
          {days.map((day, index) => (
            <DayTab
              key={index}
              isSelected={currentDay === index + 1}
              onClick={() => setCurrentDay(index + 1)}
            >
              {day}
            </DayTab>
          ))}
        </DayTabs>

        {/* Search Input */}
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="장소, 주소 검색" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} 
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchContainer>

        {/* 네이버 지도 삽입 */}
        <MapContainer id="map">
          <SearchResultsContainer>
            {searchResults.map((result, index) => (
              <SearchResultItem
                key={index}
                onClick={() => handleSearchItemClick(result.x, result.y)}
              >
                {result.roadAddress || result.jibunAddress}
              </SearchResultItem>
            ))}
          </SearchResultsContainer>
        </MapContainer>        

        {/* Quill 에디터 */}
        <ReactQuill
          style={{ height: "600px" }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={value[currentDay - 1] || ''}
          onChange={handleContentChange}
        />
      </EditorContainer>
    </div>
  );
}
