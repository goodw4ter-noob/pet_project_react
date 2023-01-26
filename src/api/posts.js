import { makeRequest } from "./makeRequest"

const URL = 'posts';

export const getPostsAJAX = function (config) {
    return makeRequest({
        method: 'GET',
        url: URL,
        ...config
    });
};

export const deletePostAJAX = function (config) {
    config.url = `${URL}/${config.url}`;
    return makeRequest({
        method: 'DELETE',
        ...config,
    });
};

export const mutatePostAJAX = function (config) {
    config.url = `${URL}/${config.url}`;
    
    console.log(config.url);
    return makeRequest({
        method: 'PUT',
        ...config,
    });
};

export const createNewPostAJAX = function (config) {
    return makeRequest({
        method: 'POST',
        url: URL,
        ...config,
    })
}