import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewPostThunk } from '../../../redux/actions/posts';
import './style.css'


const PostTextArea = ({ changeTheme, updatePage, setUpdatePage, authorizedUser }) => {
	const dispatch = useDispatch();
	const [image, setImage] = useState();
	const [imageUrl, setImageUrl] = useState(); //imageUrl === src
	const [comment, setComment] = useState('');
	const user = useSelector(state => state.users.authorizedUser);

	const handleComment = function (value) {
		setComment(value);
	};

	const renderPost = function (e) {
		e.preventDefault();
		if (!comment && !imageUrl) return;

		const token = localStorage.getItem('token');
		const time = new Date().toLocaleTimeString('ru-RU').slice(0, 5);
		const date = new Date().getTime();

		const post = {
			"id": date,
			"text": comment,
			"time": time,
			"userId": authorizedUser.id,
			"userImg": authorizedUser.img,
			"userName": `${authorizedUser.firstName} ${authorizedUser.lastName}`,
			"postPhoto": imageUrl,
			"likes": [],
			"comments": [],
			"date": date
		};

		console.log(post);
		dispatch(createNewPostThunk(token, post));
		setComment('');
		setImage();
		setUpdatePage(!updatePage);
	};

	const fileReader = new FileReader();

	fileReader.onloadend = () => {
		setImageUrl(fileReader.result);
	};

	const handleChange = function (e) {
		e.preventDefault();
		const file = e.target.files[0];
		setImage(file);
		fileReader.readAsDataURL(file);
	};

    const cnPostTextAreaRoot = useRef();
    const cnPostTextAreaMainArea = useRef();
    const cnPostTextAreaFileButton = useRef();
    
    useEffect(() => {
        let theme = user.theme;

        cnPostTextAreaRoot.current.dataset.theme = theme;
        cnPostTextAreaMainArea.current.dataset.theme = theme;
        cnPostTextAreaFileButton.current.dataset.theme = theme;

    }, [changeTheme])

	return (
		<div ref={cnPostTextAreaRoot} className='cnPostTextAreaRoot'>
			<div className='cnPostTextAreaMain'>	
				<textarea ref={cnPostTextAreaMainArea} value={comment} onChange={(e) => handleComment(e.target.value)} name="createPost" maxLength={200} rows="1" placeholder='Got any news to share?' className='cnPostTextAreaMainArea'></textarea>
				<span className='cnPostImgToInsert'>{image?.name && image.name}</span>
			</div>
			<form className='cnPostTextAreaButton'>
				<label ref={cnPostTextAreaFileButton} htmlFor="cnPostTextAreaFileBtn" className='cnPostTextAreaFileButton'><img src="../../../public/icons/add-photo-alternate.svg" className='addFileIcon' alt="icon" /></label>
				<input onChange={(e) => handleChange(e)} type="file" className='cnPostTextAreaFile' id='cnPostTextAreaFileBtn' />
				<button onClick={(e) => renderPost(e)} className='cnPostTextAreaSendBtn'>Send</button>
			</form>
		</div>
	);
};

export default PostTextArea