// 여행 상세 API
// const fetchItineraryDetails = async (itinerary_id) => {
//     try {
//         const response = await fetch(`https://yeogida.net/api/itineraries/${itinerary_id}`);
        
//         // 응답이 성공적인 경우
//         if (!response.ok) {
//             throw new Error('일정 정보를 불러오는 데 실패했습니다.');
//         }

//         const data = await response.json(); // JSON 형태로 변환
//         console.log(data); // 데이터 확인
//         return data; // 필요한 경우 반환
//     } catch (error) {
//         console.error('오류:', error);
//     }
// }; 