import classNames from 'classnames'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMessagesThunk } from '../../../redux/actions/messages'
import { getFriendThunk } from '../../../redux/actions/users'
import Layout from '../../components/Layout'
import Messenger from '../../components/Messenger'
import './style.css'

const MessengerPage = ({ isAuthenticated }) => {
    const authedUser = useSelector(state => state.users.authorizedUser);
    const friends = useSelector(state => state.users.friends);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const [isMessages, setIsMessages] = useState(false);
    

    useEffect(() => {
        authedUser.friends.forEach(id => {
            dispatch(getFriendThunk(id, token));
        });
    }, []);

    const getChatId = function (friendId) {
        const id = [authedUser.id, friendId].sort((a, b) => a - b).join('');
        return id;
    };

    const getMessages = async function (friendId) {
        const id = getChatId(friendId);
        console.log(id);
        await dispatch(getMessagesThunk(id, token));
        setIsMessages(!isMessages);
    };

    return (
        <Layout className={'cnLayoutCenter'} user={authedUser} isAuthenticated={isAuthenticated}>
            <Messenger authedUser={authedUser} isMessages={isMessages} getMessages={getMessages} friends={friends} />
        </Layout>
    );
}

export default MessengerPage