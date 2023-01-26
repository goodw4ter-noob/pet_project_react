import classNames from 'classnames';
import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactModal from 'react-modal';
import './style.css'

export const CommentsModal = ({ sendCommentClick, onLikeClick, token, id, authorizedUser, likes, isLikedByYou, comments, onClose, userImg, userName, text, isModalVisible }) => {

    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const body = document.querySelector('body');
        if (isModalVisible) {
            body.classList.add('cnBodyOverFlow');
        } else {
            body.classList.remove('cnBodyOverFlow');
        }

    }, [isModalVisible]);

    const comment = {
        "nickname": `${authorizedUser.firstName} ${authorizedUser.lastName}`,
        "text": commentText
    };

    return (
        <ReactModal isOpen={isModalVisible} onRequestClose={onClose} className='cnPostModal' overlayClassName="cnModalOverlay" ariaHideApp={false} >
            <div className="cnPostModalRoot" >
                <div className='cnModalCloseButton'>
                    <img src="../../../public/icons/close.svg" alt="close" className="cnModalCloseFormButton" onClick={onClose} />
                </div>
                <div className='cnCommentsPostData'>
                    <div className='cnPostText'>
                        <img src={userImg} alt="userImg" className='cnCommentsPostDataImg' />
                        <span className='cnPostUserName'>@{userName}</span>
                    </div>
                    <span className='cnPostUserText'>{text}</span>
                    <div className='cnCommentsPostDataLikeBtn'>
                        <i onClick={() => onLikeClick(token, authorizedUser.id, id)} className={classNames(`${isLikedByYou ? 'fa' : 'far'}`, 'fa-heart', 'cnPostLikeBtn')} />
                        <span className='cnPostLikesNumber'>{likes.length}</span>
                    </div>
                </div>
                <div className='cnComments'>
                    <div className='cnCommentsScroll'>
                        {comments.map(comment =>
                            <div>
                                <span className='cnPostUserNameComment'>{comment.nickname}: </span>
                                <span>{comment.text}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className='cnNewPostModalTextArea'>
                    <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} rows="1" maxLength={200} placeholder="Write your comment..." className="cnPostTextArea"></textarea>
                </div>
                <div className='cnModalSendBtn'>
                    <button onClick={() => { sendCommentClick(token, id, comment); setCommentText('') }} className="cnModalSend">Send</button>
                </div>
            </div>
        </ReactModal >
    );
}

// export default CommentsModal;