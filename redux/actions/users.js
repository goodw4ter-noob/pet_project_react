import { api } from '../../src/api';
import { getUserStarted, getUserSuccess, getUserFailed, getAuthorizedUserStarted, getAuthorizedUserSuccess, getAuthorizedUserFailed, mutateUserStarted, mutateUserSuccess, getFriendStarted, getFriendSuccess, getFriendFailed } from '../actionCreators/users';

export const getUserThunk = function (data) {
    return async function (dispatch) {
        try {
            if (!data.email) return;
            
            dispatch(getUserStarted());

            const res = await api.users.getUsersAJAX(data);
            const decryptedToken = await JSON.parse(atob(res.data.accessToken.split('.')[1]));
            const userId = decryptedToken.sub;

            const response = await api.users.getUserDataAJAX(res.data.accessToken, userId);
            dispatch(getUserSuccess(response.data));
            localStorage.setItem('token', res.data.accessToken);
        } catch (error) {
            dispatch(getUserFailed(error));
        }
    };
};

export const getAuthorizedUserThunk = function (token) {
    return async function (dispatch) {
        try {
            dispatch(getAuthorizedUserStarted());

            const decryptedToken = await JSON.parse(atob(token.split('.')[1]))
            const userId = decryptedToken.sub;

            const response = await api.users.getAuthorizedUserAJAX(userId);
            
            dispatch(getAuthorizedUserSuccess(response.data));
        } catch (error) {
            dispatch(getAuthorizedUserFailed(error))
        }
    }
}

export const mutateUserThunk = function (user, token) {
    return async function (dispatch, getState) {
        try {
            dispatch(mutateUserStarted());
            const state = getState();
            console.log(user, 'user');
            const newUser = { ...state.users.user, ...user };

            const response = await api.users.mutateUserAJAX({
                data: newUser,
                url: user.id,
                headers: { Authorization: `Bearer ${token}` },
            });
            
            dispatch(getAuthorizedUserSuccess(response.data));
        } finally {
            dispatch(getAuthorizedUserFailed());
        }
    }
};

export const getFriendThunk = function (id, token) {
    return async function (dispatch) {
        try {
            dispatch(getFriendStarted());

            const response = await api.users.getFriendAJAX({
                url: id,
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data, 'response.data');

            dispatch(getFriendSuccess(response.data));
        } catch (error) {
            dispatch(getFriendFailed(error));
        }
    }
}