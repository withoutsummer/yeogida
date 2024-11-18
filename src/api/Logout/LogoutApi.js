export const logoutUser = async () => {
    const apiURL = 'https://www.yeogida.net/users/logout';

    try {
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn(
                '토큰이 존재하지 않습니다. 이미 로그아웃 상태일 수 있습니다.'
            );
            return { status: 200 }; // 토큰이 없어도 로그아웃 성공으로 간주
        }

        // 서버로 로그아웃 요청
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
            },
            credentials: 'include', // 쿠키 포함
        });

        // 클라이언트에서 토큰 삭제
        localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거

        if (response.status === 200) {
            // 로그아웃 성공
            console.log('로그아웃 성공: 토큰 삭제 완료');
            return { status: 200 };
        } else if (response.status === 401) {
            // 유효하지 않은 토큰 또는 만료된 세션
            console.warn('로그아웃 실패: 유효하지 않거나 만료된 토큰입니다.');
            return { status: 401, error: 'Invalid or expired token.' };
        } else {
            // 서버에서 로그아웃 처리 중 문제 발생
            console.error('로그아웃 실패: 서버 오류 발생');
            return { status: 500, error: 'An error occurred during logout.' };
        }
    } catch (error) {
        // 서버 요청 자체가 실패했을 경우
        console.error('로그아웃 중 오류 발생:', error);
        localStorage.removeItem('token'); // 네트워크 오류 시에도 토큰 삭제
        throw new Error('서버 오류: 로그아웃 요청 실패');
    }
};
