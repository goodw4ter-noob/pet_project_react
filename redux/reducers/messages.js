import { GET_MESSAGES_FAILED, GET_MESSAGES_STARTED, GET_MESSAGES_SUCCESS } from "../actionCreators/messages"


const initialState = {
    messages: [],
    isMessagesLoading: true,
}

export const messagesReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES_STARTED: 
            return {
                ...state,
                messages: [],
                isMessagesLoading: true,
            }

        case GET_MESSAGES_SUCCESS: 
            return {
                ...state,
                isMessagesLoading: false,
                messages: action.payload
            }

        case GET_MESSAGES_FAILED: 
            return {
                ...state,
                isMessagesLoading: false,
            }

        default: 
            return {
                ...state,
            }
    }
}