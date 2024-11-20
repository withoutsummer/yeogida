// 공통 API 요청 함수
const makeApiRequest = async (url, method = 'GET', body = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        const options = {
            method,
            headers,
            credentials: 'include',
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        // 응답이 JSON 형식인지 확인 후 처리
        const contentType = response.headers.get('Content-Type');
        let responseData;

        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            console.warn(
                `Warning: 응답이 JSON 형식이 아닙니다. Content-Type: ${contentType}`
            );
            throw new Error('서버에서 유효하지 않은 응답이 반환되었습니다.');
        }

        if (!response.ok) {
            console.error(
                `Error: ${response.status} - ${
                    responseData.message || '서버 응답 실패'
                }`
            );
            throw new Error(
                responseData.message || '서버 응답이 실패했습니다.'
            );
        }

        return {
            response: response.ok,
            status: response.status,
            responseData,
        };
    } catch (error) {
        console.error(`Error [${error.message}]: API 요청 중 오류 발생`);
        throw error;
    }
};

// ID 중복 체크 API
export const checkIdDuplicate = async (userId) => {
    const url = 'https://www.yeogida.net/users/verify-id';
    const body = { id: userId };
    return await makeApiRequest(url, 'POST', body);
};

// 전화번호 중복 체크 API
export const checkPhoneDuplicate = async (phone) => {
    const url = 'https://www.yeogida.net/users/verify-phone';
    const body = { phonenumber: phone };
    return await makeApiRequest(url, 'POST', body);
};

//이메일 중복 체크 및 인증번호 전송
export const checkEmailDuplicate = async (email, userName) => {
    const url = 'https://www.yeogida.net/users/signup-sendnum';
    const body = { email: email, name: userName };
    return await makeApiRequest(url, 'POST', body);
};

// 인증번호 확인 API
export const verifyCertificationCode = async (email, code) => {
    const url = 'https://www.yeogida.net/users/verify-number';
    const body = {
        email: String(email).trim(),
        code: String(code).trim(),
    };

    console.log('API 요청 데이터:', body); // 로그로 확인
    return await makeApiRequest(url, 'POST', body);
};

// 회원가입 요청 API
export const signUp = async (userData) => {
    const url = 'https://www.yeogida.net/users/signup';
    return await makeApiRequest(url, 'POST', userData);
};
