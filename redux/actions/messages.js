import { api } from "../../src/api";
import { getMessagesFailed, getMessagesStarted, getMessagesSuccess, sendMessageFailed, sendMessageStarted, sendMessageSuccess } from "../actionCreators/messages"


export const getMessagesThunk = function (id, token) {
    return async function (dispatch) {
        try {
            dispatch(getMessagesStarted());

            const response = await api.messages.getMessagesAJAX({ 
                url: id,
                headers: { Authorization: `Bearer ${token}` },
             });
             console.log(response.data);
             dispatch(getMessagesSuccess(response.data));
        } catch (error) {
            dispatch(getMessagesFailed(error));
        }
    }
}

export const sendMessageThunk = function (token, chatId, message) {
    return async function (dispatch, getState) {
        if (!chatId || (!message.text && !message.imageUrl)) return;
        try {
            dispatch(sendMessageStarted());

            const state = getState();
            console.log(state.messages.messages);
            const msgs = [...state.messages.messages.data, message];
            const newMessages = {
                id: +chatId,
                data: msgs
            };

            console.log(newMessages);
            const response = await api.messages.sendMessageAJAX({
                url: +chatId,
                data: newMessages,
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(response.data);
            dispatch(getMessagesSuccess(response.data));
            dispatch(sendMessageSuccess());
        } catch (error) {
            dispatch(sendMessageFailed());
        }
    }
}

export const resetMessagesThunk = function () {
    return async function (dispatch) {
        dispatch(getMessagesStarted());
    }
}