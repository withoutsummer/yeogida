let posts = [];

// 초기 mockdata에서 포스트 추가하는 함수
export const initializePosts = () => {
    const existingPosts = getPosts();
    existingPosts.forEach(post => {
        addPost(post);
    });
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
