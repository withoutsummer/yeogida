export const loginUser = async (userId, password) => {
    const apiURL = 'https://yeogida.net/users/login';

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId, password: password }),
            credentials: 'include',
        });

        // API 응답 정보 로그
        console.log('API 요청 URL:', apiURL);
        console.log('응답 상태 코드:', response.status);
        console.log('응답 헤더:', response.headers);

        // 응답이 JSON인지 확인하고 처리
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            return {
                response: response.ok,
                status: response.status,
                responseData,
            };
        } else {
            console.error('응답이 JSON 형식이 아닙니다:', contentType);
            throw new Error('서버의 응답 형식이 올바르지 않습니다.');
        }
    } catch (error) {
        console.error('로그인 요청 실패:', error);
        throw new Error('서버와의 연결에 문제가 발생했습니다.');
    }
};
