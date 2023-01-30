import classNames from 'classnames'
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'

const Message = ({ messages }) => {
    const authedUser = useSelector(state => state.users.authorizedUser);
    const cnMessengerTopAreaScroll = useRef();

    useEffect(() => {
        cnMessengerTopAreaScroll.current?.scrollIntoView(false);
    });

    const renderMessages = function () {
        
        return messages.data.map(message => {
            return (
                <div className={classNames('cnMessageUnitRoot', `${message.from === authedUser.id ? 'myMessage' : 'notMyMessage'}`)}>
                    {message.text && <div className='cnMessageUnit'>
                        <span className='cnMessageUnitText'>{message.text}</span>
                        <span className='cnMessageUnitTime'>{message.time}</span>
                    </div>}
                    {message.imageUrl && <img src={message.imageUrl} alt="imageUrl" className='cnMessageUserImage'/>}
                </div>
            )
        })
    }

    return (
        <div ref={cnMessengerTopAreaScroll} className='cmMessengerTopAreaScroll'>
            {renderMessages()}
        </div> 
    )
}

export default Message