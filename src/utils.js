

export const findPostInState = function (posts, postId) {
    const post = posts.find(post => post.id == postId);
    return post;
};

export const getUpdatedPosts = function (posts, postId, data) {
    const newPosts = [...posts];
    const likedPostIndex = newPosts.findIndex(photo => photo.id === postId);
    newPosts[likedPostIndex] = data;
    return newPosts;
};


//     document.querySelector('.cnNavBarRoot').dataset.theme = theme;
    //     document.querySelector('.cnLayoutBody').dataset.theme = theme;
    //     document.querySelector('.cnLayoutRoot').dataset.theme = theme;
    //     document.querySelector('.cnFeedRoot').dataset.theme = theme;
    //     document.querySelector('.cnWelcomePhraseRoot').dataset.theme = theme;
    //     document.querySelector('.cnNavBarLogo').dataset.theme = theme;
    //     document.querySelector('.cnUserBadgeNickName').dataset.theme = theme;
    //     document.querySelector('.cnUserBadgeArrow').dataset.theme = theme;
    //     document.querySelectorAll('.message-row-text').forEach(el => el.dataset.theme = theme);
    //     document.querySelectorAll('.message-row').forEach(el => el.dataset.theme = theme);
    //     document.querySelectorAll('.message-row-name').forEach(el => el.dataset.theme = theme);
    //     document.querySelectorAll('.message-row-date').forEach(el => el.dataset.theme = theme);
    //     document.querySelectorAll('.cnPostLikesNumber').forEach(el => el.dataset.theme = theme);
    //     document.querySelectorAll('.cnPostCommentNumber').forEach(el => el.dataset.theme = theme);
    //     document.querySelectorAll('.cnPostComments').forEach(el => el.dataset.theme = theme);
    //     document.querySelectorAll('.cnPostLikeBtn').forEach(el => el.dataset.theme = theme);