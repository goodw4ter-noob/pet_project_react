import { makeRequest } from "./makeRequest";


const URL = 'messages';

export const getMessagesAJAX = function (config) {

    config.url = `${URL}/${config.url}`;
    console.log(config.url, 'config.url');
    return makeRequest({
        method: "GET",
        ...config,
    })
}