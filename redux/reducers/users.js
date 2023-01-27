import { GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILED, GET_AUTHORIZED_USER_SUCCESS, GET_AUTHORIZED_USER_STARTED, GET_AUTHORIZED_USER_FAILED, MUTATE_USER_STARTED, MUTATE_USER_SUCCESS, GET_FRIEND_STARTED, GET_FRIEND_SUCCESS, GET_FRIEND_FAILED } from '../actionCreators/users'


const initialState = {
    user: {},
    isUserLoading: true,
    authorizedUser: {},
    isAuthorizedUserLoading: true,
    isAuthorizedUserError: false,
    isMutateLoading: false,
    friends: [],
    isFriendLoading: true,
};


export const getUserReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_STARTED:
            return {
                ...state,
                isUserLoading: true,
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isUserLoading: false,
                user: action.payload
            };

        case GET_USER_FAILED:
            return {
                ...state,
                isUserLoading: false,
            };

        case GET_AUTHORIZED_USER_SUCCESS:
            return {
                ...state,
                authorizedUser: action.payload,
                isAuthorizedUserLoading: false,
                isAuthorizedUserError: false,
            }

        case GET_AUTHORIZED_USER_STARTED:
            return {
                ...state,
                isAuthorizedUserLoading: true,
            }

        case GET_AUTHORIZED_USER_FAILED:
            return {
                ...state,
                isAuthorizedUserLoading: false,
                isAuthorizedUserError: true,
            }

        case MUTATE_USER_STARTED:
            return {
                ...state,
                isMutateLoading: true,
            }

        case MUTATE_USER_SUCCESS:
            return {
                ...state,
                isMutateLoading: false,
            }

        case GET_FRIEND_STARTED:
            return {
                ...state,
                friends: [],
                isFriendLoading: true,
            }

        case GET_FRIEND_SUCCESS:
            return {
                ...state,
                friends: [...state.friends, action.payload],
                isFriendLoading: false,
            }

        case GET_FRIEND_FAILED:
            return {
                ...state,
                isFriendLoading: false,
            }

        default:
            return {
                ...state,
            };
    };
};