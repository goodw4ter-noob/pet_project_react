import { api } from '../../src/api';
import { findPostInState, getUpdatedPosts } from '../../src/utils';
import { getPostsFailed, getPostsStarted, getPostsSuccess, mutatePostFailed } from '../actionCreators/posts';

export const getPostsThunk = function (token) {
    return async function (dispatch) {
        try {
            dispatch(getPostsStarted());

            const response = await api.posts.getPostsAJAX({ headers: { Authorization: `Bearer ${token}` } });

            const filteredArr = response.data
                .map(el => {
                    el.valueOf = function () { return this.date };
                    return el;
                })
                .sort((a, b) => b - a);

            dispatch(getPostsSuccess(filteredArr));
        } catch (error) {
            dispatch(getPostsFailed(error));
        }
    };
};

export const deletePostThunk = function (token, postId) {
    return async function (dispatch, getState) {
        try {
            const state = getState();

            const newPosts = state.posts.posts.filter(post => post.id !== postId);

            await api.posts.deletePostAJAX({ headers: { Authorization: `Bearer ${token}` }, url: postId });

            dispatch(getPostsSuccess(newPosts));
        } catch (error) {
            dispatch(getPostsFailed(error));
        }
    }
}

export const toggleLikeThunk = function (token, authorizedUserId, postId) {
    return async function (dispatch, getState) {
        try {
            const state = getState();
            const newPost = findPostInState(state.posts.posts, postId);
            if (newPost.likes.includes(authorizedUserId)) {
                newPost.likes = newPost.likes.filter(like => like !== authorizedUserId);
            } else {
                newPost.likes.push(authorizedUserId);
            };

            const response = await api.posts.mutatePostAJAX({
                data: newPost,
                url: newPost.id,
                headers: { Authorization: `Bearer ${token}` },
            });

            const newPosts = getUpdatedPosts(state.posts.posts, postId, response.data);
            dispatch(getPostsSuccess(newPosts));
        } catch (error) {
            dispatch(mutatePostFailed(error));
        }
    }
}

export const createNewPostThunk = function (token, post) {
    return async function (dispatch, getState) {
        try {
            const state = getState();
            const newPost = [...state.posts.posts, post];
            
            console.log(post);
            await api.posts.createNewPostAJAX({ headers: { Authorization: `Bearer ${token}` }, data: post});

            dispatch(getPostsSuccess(newPost));
        } catch (error) {
            dispatch(getPostsFailed(error))
        }
    }
}

export const sendCommentThunk = function (token, postId, comment) {
    return async function (dispatch, getState) {
        try {
            const state = getState();
            const newPost = findPostInState(state.posts.posts, postId);
            
            newPost.comments.push(comment);

            const response = await api.posts.mutatePostAJAX({
                data: newPost,
                url: newPost.id,
                headers: { Authorization: `Bearer ${token}` },
            });

            const newPosts = getUpdatedPosts(state.posts.posts, postId, response.data);
            dispatch(getPostsSuccess(newPosts));
        } catch (error) {
            dispatch(mutatePostFailed(error));
        }
    }
}