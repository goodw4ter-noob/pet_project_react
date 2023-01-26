import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Post from '../Post'
import './style.css'

const Feed = ({ changeTheme, sendCommentClick, onLikeClick, deletePost, posts, authorizedUser }) => {
    const user = useSelector(state => state.users.authorizedUser);

    const cnFeedMessages = useRef();
    
    useEffect(() => {
        let theme = user.theme;

        cnFeedMessages.current.dataset.theme = theme;

    }, [changeTheme])

    return (
        <div className="cnFeedRoot">
            <div className="top-panel">
                <div className="sort-btn">
                    <img src="../../../public/icons/sort-by-alpha.svg" alt="sortBtn" className="panel-btn sort-icon" />
                </div>
            </div>
            <div className="container-msg">
                <div ref={cnFeedMessages} className="main-page-messages">
                    {posts.map(post =>
                        <Post
                            sendCommentClick={sendCommentClick}
                            key={post.id}
                            id={post.id}
                            userImg={post.userImg}
                            userName={post.userName}
                            time={post.time}
                            text={post.text}
                            postPhoto={post.postPhoto}
                            likes={post.likes}
                            comments={post.comments}
                            userId={post.userId}
                            authorizedUser={authorizedUser}
                            onLikeClick={onLikeClick}
                            isLikedByYou={post.likes.includes(authorizedUser.id)}
                            deletePost={deletePost}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Feed