let posts = [];

// 초기에 기본 포스트를 설정하는 함수
export const initializePosts = (initialPosts = []) => {
    posts = initialPosts;
};

// 기존 포스트 가져오기
export const getPosts = () => {
    return posts;
};

// 포스트 추가하기
export const addPost = (newPost) => {
    // newPost.thumbnail이 파일 객체인 경우, URL로 변환하여 저장
    if (newPost.thumbnail instanceof File) {
        newPost.thumbnail = URL.createObjectURL(newPost.thumbnail);
    }
    posts.push(newPost);
};

// 포스트 삭제하기 (ID로 찾아서 삭제)
export const deletePost = (postId) => {
    posts = posts.filter(post => post.id !== postId);
};

// 포스트 수정하기 (ID로 찾아서 수정)
export const updatePost = (updatedPost) => {
    const index = posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
        // newPost.thumbnail이 파일 객체인 경우, URL로 변환하여 저장
        if (updatedPost.thumbnail instanceof File) {
            updatedPost.thumbnail = URL.createObjectURL(updatedPost.thumbnail);
        }
        posts[index] = { ...posts[index], ...updatedPost };
    }
};
