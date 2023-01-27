import { api } from "../../src/api";
import { getMessagesFailed, getMessagesStarted, getMessagesSuccess } from "../actionCreators/messages"


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