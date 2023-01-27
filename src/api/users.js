import { makeRequest } from "./makeRequest"

const URL = 'login';

export const getUsersAJAX = function (data) {
    return makeRequest({
        method: 'POST',
        data: {
            ...data
        },
        url: URL,
    })
};

export const getUserDataAJAX = function (token, userId) {
    return makeRequest({
        method: 'GET',
        url: `usersData/${userId}`,
        headers: { Authorization: `Bearer ${token}` },
    });
}

export const getAuthorizedUserAJAX = function (userId) {
    return makeRequest({
        method: 'GET',
        url: `usersData/${userId}`,
    })
}

export const mutateUserAJAX = function (config) {
    config.url = `usersData/${config.url}`;
    
    console.log(config.url);
    return makeRequest({
        method: 'PUT',
        ...config,
    });
};

export const getFriendAJAX = function (config) {
    config.url = `usersData/${config.url}`;

    return makeRequest({
        method: 'GET',
        ...config
    });
};