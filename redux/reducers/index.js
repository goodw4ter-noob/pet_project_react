
import { combineReducers } from 'redux';
import { postsReducer } from './posts';
import { getUserReducer } from './users';

export const rootReducer = combineReducers({
    users: getUserReducer,
    posts: postsReducer,
})