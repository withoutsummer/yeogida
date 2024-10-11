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
export const addPost = (newPost) => {
    posts.push(newPost); // 새로운 MyTrip 포스트 추가
};

// ShareTrip 포스트 추가하기
export const addShareTripPost = (newPost) => {
    shareTripPosts.push(newPost); // 새로운 ShareTrip 포스트 추가
};

// 초기 mockdata에서 포스트 추가하는 함수
export const initializePosts = () => {
    const existingPosts = getPosts();
    existingPosts.forEach(post => {
        addPost(post);
    });
};
