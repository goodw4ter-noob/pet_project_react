export const GET_MESSAGES_STARTED = 'GET_MESSAGES_STARTED';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILED = 'GET_MESSAGES_FAILED';


export const getMessagesStarted = function () {
    return {
        type: GET_MESSAGES_STARTED,
    }
};

export const getMessagesSuccess = function (messages) {
    return {
        type: GET_MESSAGES_SUCCESS,
        payload: messages,
    }
};

export const getMessagesFailed = function (error) {
    return {
        type: GET_MESSAGES_FAILED,
        payload: error,
    }
};