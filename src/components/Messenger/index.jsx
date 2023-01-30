import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MessengerTextArea from '../../components/MessengerTextArea'
import Message from '../Message'
import './style.css'

const Messenger = ({ setIsMessages, chatId, friendId, isMessages, getMessages, friends }) => {
    const navigate = useNavigate();
    const messages = useSelector(state => state.messages.messages);
    const [msgsToRender, setMsgsToRender] = useState();
    

    const renderFriends = function () {
        return friends.map(el => {
            return (
                <div data-id={el.id} className="user-row" onClick={(e) => {
                    getMessages(e.currentTarget.dataset.id);
                }}>
                    <img src={el.img} alt="user-row-img" className="user-row-photo" />
                    <span className="user-row-name">{`${el.firstName} ${el.lastName}`}</span>
                </div>
            )
        });
    };

    useEffect(() => {
        if (!messages.data) return;
        setMsgsToRender(messages);
    }, [isMessages]);

    return (
        <div className="cnMessengerRoot">
            <div className="cnMessengerUsersList">
                <form action="" className="cnMessengerTopBar">
                    <button className="search-button"> <img src="../../../public/icons/search.svg" alt="find" /> </button>
                    <input type="text" className="search-field" placeholder="search" />
                </form>
                <div className="user-inner-part" key={1}>
                    <div className="users-list">
                        {renderFriends()}
                    </div>
                </div>
            </div>
            <div className="cnMessengerRightPart">
                <div className="cnMessengerTopBar">
                    <img onClick={() => navigate('/user')} className="cnMessengerExitBtn" src='../../../public/icons/close.svg'></img>
                </div>
                <div className="cnMessengerMainPart">
                    <div className='cnMessengerTopArea'>
                        <div className='cnMessengerTopAreaWrapper'>
                                {msgsToRender && <Message messages={msgsToRender}/>}
                        </div>
                    </div>
                    <div className='cnMessengerBottomArea'>
                        <MessengerTextArea isMessages={isMessages} setIsMessages={setIsMessages} chatId={chatId} friendId={friendId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger