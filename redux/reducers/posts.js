import { GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS, MUTATE_POST_FAILED, MUTATE_POST_STARTED, MUTATE_POST_SUCCESS } from "../actionCreators/posts";


const initialState = {
    posts: [],
    isPostsLoading: true,
    totalPosts: 0,
    isMutateLoading: false,
};

export const postsReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return {
                ...state,
                isPostsLoading: true,
            };

        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isPostsLoading: false,
            };

        case GET_POSTS_FAILED:
            return {
                ...state,
                isPostsLoading: false,
            };

        case MUTATE_POST_STARTED:
            return {
                ...state,
                isMutateLoading: true,
            };

        case MUTATE_POST_SUCCESS:
            return {
                ...state,
                isMutateLoading: false,
            };

        case MUTATE_POST_FAILED:
            //TODO add errors
            return {
                ...state,
                isMutateLoading: false,
            }

        default:
            return {
                ...state,
            }
    };
};