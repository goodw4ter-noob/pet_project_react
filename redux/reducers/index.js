
import { combineReducers } from 'redux';
import { messagesReducer } from './messages';
import { postsReducer } from './posts';
import { getUserReducer } from './users';

export const rootReducer = combineReducers({
    users: getUserReducer,
    posts: postsReducer,
    messages: messagesReducer,
})