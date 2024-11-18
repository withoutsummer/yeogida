export const loginUser = async (userId, password) => {
    const apiURL = 'https://www.yeogida.net/users/login';

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

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            if (response.ok) {
                localStorage.setItem('token', responseData.token); // 로그인 후 토큰 저장
                return {
                    response: true,
                    status: response.status,
                    responseData,
                };
            }
            return {
                response: false,
                status: response.status,
                error: responseData.message,
            };
        }
        throw new Error('서버의 응답 형식이 올바르지 않습니다.');
    } catch (error) {
        console.error('로그인 요청 실패:', error);
        throw new Error('서버와의 연결에 문제가 발생했습니다.');
    }
};
