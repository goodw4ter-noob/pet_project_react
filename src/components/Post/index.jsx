import classNames from 'classnames';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { CommentsModal } from '../CommentsModal';
import './style.css';

const Post = ({
    sendCommentClick,
    key,
    id,
    userImg,
    userName,
    time,
    text,
    postPhoto,
    likes,
    comments,
    userId,
    authorizedUser,
    onLikeClick,
    deletePost,
    isLikedByYou }) => {
    const user = useSelector(state => state.users.authorizedUser);
    const token = localStorage.getItem('token');
    const [isModalVisible, setIsVisible] = useState(false);

    const insertImg = function () {
        if (postPhoto) {
            return <img src={postPhoto} alt="postPhoto" className='cnPostPhoto' />;
        } else {
            return;
        }
    }

    return (
        <div className="message-row" data-id={id}>
            <div className="message-row-wrapper">
                <div className="message-raw-block">
                    <div className='cnPostUserInfo'>
                        <img src={userImg} alt="userImg" className='cnPostUserInfoImg' />
                        <span className="message-row-name">{userName}</span>
                    </div>
                    <span className="message-row-date">{time}</span>
                </div>
                <span className="message-row-text">{text}</span>
                {/* <img src={postPhoto} alt="postPhoto" className='cnPostPhoto' /> */}
                {insertImg()}
                <div className='cnPostLikeComment'>
                    <div>
                        <i onClick={() => onLikeClick(token, authorizedUser.id, id)} className={classNames(`${isLikedByYou ? 'fa' : 'far'}`, 'fa-heart', 'cnPostLikeBtn')} />
                        <span className='cnPostLikesNumber'>{likes.length}</span>
                    </div>
                    <div>
                        <i className='far fa-comment cnPostComments' onClick={() => setIsVisible(true)} />
                        <span className='cnPostCommentNumber'>{comments.length}</span>
                    </div>
                </div>
            </div>
            {userId === user.id && <div className="message-row-delete-post-btn" onClick={(e) => deletePost(e.target.closest('.message-row').dataset.id)}>
                <img src="../../../public/icons/deletepost.svg" alt="deletePost" className="delete-post-btn" />
            </div>}
            <CommentsModal
                sendCommentClick={sendCommentClick}
                onLikeClick={onLikeClick}
                token={token}
                isLikedByYou={isLikedByYou}
                likes={likes}
                authorizedUser={authorizedUser}

                key={key}
                id={id}
                userId={userId}
                userImg={userImg}
                userName={userName}
                text={text}
                onClose={() => setIsVisible(false)}
                isModalVisible={isModalVisible}
                comments={comments} />
        </div>
    );
}

export default Post