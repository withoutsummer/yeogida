// 전체, 조건별 여행일정 조회 API
const getTrip = async () => {
    try {
        const response = await fetch(`https://yeogida.net/api/itineraries?sort=${sortOrder}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Error fetching trips');
        const data = await response.json();
        setPosts(data);
    } catch (error) {
        console.error('Error fetching trips:', error);
    }
};

// 새로운 여행일정 생성 API
const createItineraries = async () => {
    try {
        const response = await fetch(`https://yeogida.net/api/itineraries?sort=${sortOrder}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Error fetching trips');
        const data = await response.json();
        setPosts(data);
    } catch (error) {
        console.error('Error fetching trips:', error);
    }
};

// 특정 여행일정 조회 API
const getItineraries = async (itinerary_id) => {
    try {
        const response = await fetch(`https://yeogida.net/api/itineraries/${itinerary_id}`);
        
        if (!response.ok) {
            throw new Error('일정 정보를 불러오는 데 실패했습니다.');
        }

        const data = await response.json(); // JSON 형태로 변환
        console.log(data); // 데이터 확인
        return data; // 필요한 경우 반환
    } catch (error) {
        console.error('API 호출 오류:', error);
    }
}; 

// 특정 여행일정 수정 API
const updateItinerary = async (itineraryId, updatedData) => {
    try {
    const response = await fetch(`https://yeogida.net/api/itineraries/${itineraryId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // 수정할 데이터
    });

    if (!response.ok) {
        throw new Error('여행 일정 수정에 실패했습니다.');
    }

    const result = await response.json(); // 성공 시 반환된 데이터를 JSON 형식으로 변환
    console.log('수정된 여행 일정:', result);
    } catch (error) {
    console.error('오류 발생:', error.message);
    }
};

// 특정 여행일정 삭제 API
const deleteItinerary = async (itinerary_id) => {
    try {
        const response = await fetch(`https://yeogida.net/api/itineraries/${itinerary_id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('일정 삭제에 실패했습니다.');
        }

        alert('일정이 성공적으로 삭제되었습니다.');
        navigate('/mytrip'); // 삭제 후 이동할 페이지
    } catch (error) {
        console.error('오류:', error);
        alert('일정 삭제 중 오류가 발생했습니다.');
    }
};

// 지도의 장소 검색 API
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