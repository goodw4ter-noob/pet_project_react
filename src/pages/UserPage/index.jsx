import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostThunk, getPostsThunk, sendCommentThunk, toggleLikeThunk } from '../../../redux/actions/posts'
import { mutateUserThunk } from '../../../redux/actions/users'
import Feed from '../../components/Feed'
import Layout from '../../components/Layout'
import PostTextArea from '../../components/PostTextArea'
import UserBio from '../../components/UserBio'
import './style.css'

const UserPage = ({ setToken, isAuthenticated }) => {
	const authroziedUser = useSelector(state => state.users.authorizedUser);
	const posts = useSelector(state => state.posts.posts);
	const dispatch = useDispatch();

	const [updatePage, setUpdatePage] = useState(false);
	const [changeTheme, setChangeTheme] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) return;
		dispatch(getPostsThunk(token));
	}, [updatePage]);

	const deletePost = function (postId) {
		console.log(postId);
		const token = localStorage.getItem('token');
		dispatch(deletePostThunk(token, postId));
		setUpdatePage(!updatePage);
	};

	const onLikeClick = function (token, authorizedUserId, postId) {
		dispatch(toggleLikeThunk(token, authorizedUserId, postId));
	};

	const sendCommentClick = function (token, postId, comment) {
		dispatch(sendCommentThunk(token, postId, comment));
	};

	const onEdit = function (user, token) {
		dispatch(mutateUserThunk(user, token));
	};

	return (
		<Layout setChangeTheme={setChangeTheme} isAuthenticated={isAuthenticated} setToken={setToken} user={authroziedUser} updatePage={updatePage} setUpdatePage={setUpdatePage}>
			<UserBio user={authroziedUser} onEdit={onEdit} />
			<div>
				<PostTextArea changeTheme={changeTheme} authorizedUser={authroziedUser} setUpdatePage={setUpdatePage} updatePage={updatePage}/>
				<Feed changeTheme={changeTheme} sendCommentClick={sendCommentClick} onLikeClick={onLikeClick} authorizedUser={authroziedUser} posts={posts} deletePost={deletePost} />
			</div>
		</Layout>
	);
};

export default UserPage