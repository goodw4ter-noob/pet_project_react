export const GET_USER_STARTED = 'GET_USER_STARTED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const GET_AUTHORIZED_USER_STARTED = 'GET_AUTHORIZED_USER_STARTED';
export const GET_AUTHORIZED_USER_SUCCESS = 'GET_AUTHORIZED_USER_SUCCESS';
export const GET_AUTHORIZED_USER_FAILED = 'GET_AUTHORIZED_USER_FAILED';

export const MUTATE_USER_STARTED = 'MUTATE_USER_STARTED';
export const MUTATE_USER_SUCCESS = 'MUTATE_USER_SUCCESS';
export const MUTATE_USER_FAILED = 'MUTATE_USER_FAILED';

export const getUserStarted = function () {
    return {
        type: GET_USER_STARTED,
    }
};

export const getUserSuccess = function (user) {
    return {
        type: GET_USER_SUCCESS,
        payload: user,
    }
};

export const getUserFailed = function (error) {
    return {
        type: GET_USER_FAILED,
        payload: error,
    }
};

export const getAuthorizedUserStarted = function () {
    return {
        type: GET_AUTHORIZED_USER_STARTED,
    }
};

export const getAuthorizedUserSuccess = function (user) {
    return {
        type: GET_AUTHORIZED_USER_SUCCESS,
        payload: user,
    }
};

export const getAuthorizedUserFailed = function (error) {
    return {
        type: GET_AUTHORIZED_USER_FAILED,
        payload: error,
    }
};

export const mutateUserStarted = function () {
    return {
        type: MUTATE_USER_STARTED,
    };
};

export const mutateUserSuccess = function () {
    return {
        type: MUTATE_USER_SUCCESS,
    };
};

export const mutateUserFailed = function (error) {
    return {
        type: MUTATE_USER_FAILED,
        payload: error,
    };
};