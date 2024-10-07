let posts = []

// 기존 포스트 가져오기
export const getPosts = () => {
    return posts;
};

// 포스트 추가하기
export const addPost = (newPost) => {
    posts.push(newPost); // 새로운 포스트 추가
};

// 초기 mockdata에서 포스트 추가하는 함수
export const initializePosts = () => {
    const existingPosts = getPosts();
    existingPosts.forEach(post => {
        addPost(post);
    });
};