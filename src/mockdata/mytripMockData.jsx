let posts = [];
let shareTripPosts = []; // ShareTrip 포스트를 위한 배열 추가

// 기존 포스트 가져오기
export const getPosts = () => {
    return posts;
};

// ShareTrip 포스트 가져오기
export const getShareTripPosts = () => {
    return shareTripPosts;
};

// 포스트 추가하기
export const addPost = async (newPost) => {
    const response = await fetch('https://yeogida.net/api/itineraries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    });

    if (response.ok) {
        const addedPost = await response.json();
        posts.push(addedPost); // 새로운 MyTrip 포스트 추가
    } else {
        throw new Error('포스트 추가 실패');
    }
};

// ShareTrip 포스트 추가하기
export const addShareTripPost = (newPost) => {
    shareTripPosts.push(newPost); // 새로운 ShareTrip 포스트 추가
};

// 초기 mockdata에서 포스트 추가하는 함수
export const initializePosts = async () => {
    try {
        const response = await fetch('https://yeogida.net/api/itineraries');
        if (!response.ok) {
            throw new Error('네트워크 응답이 실패했습니다.');
        }
        const existingPosts = await response.json();
        existingPosts.forEach(post => {
            posts.push(post);
        });
    } catch (error) {
        console.error('포스트 초기화 오류:', error);
    }
};