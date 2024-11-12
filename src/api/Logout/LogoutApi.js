export const logoutUser = async () => {
    const apiURL = 'https://www.yeogida.net/users/logout';

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include',
        });

        if (response.status === 200) {
            // 로그아웃 성공
            return { status: 200 };
        } else if (response.status === 401) {
            // 유효하지 않은 토큰 또는 만료된 세션
            return { status: 401, error: 'Invalid or expired token.' };
        } else {
            // 서버에서 로그아웃 처리 중 문제 발생
            return { status: 500, error: 'An error occurred during logout.' };
        }
    } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
        throw new Error('서버 오류');
    }
};
