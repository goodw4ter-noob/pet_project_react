import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../../redux/actions/messages';
import './style.css'

const MessengerTextArea = ({ isMessages, setIsMessages, chatId, friendId }) => {
	const [image, setImage] = useState();
	const [imageUrl, setImageUrl] = useState(); //imageUrl === src
	const [comment, setComment] = useState('');
	const authedUser = useSelector(state => state.users.authorizedUser);
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');
	
	const handleComment = function (value) {
		setComment(value);
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

	const sendMessage = async function (e) {
		e.preventDefault();
		
		const time = new Date().toLocaleTimeString('ru-RU').slice(0, 5);
		const date = new Date().getTime();

		const msgObj = {
			"id": date,
			"to": +friendId,
			"from": authedUser.id,
			"text": comment,
			"time": time,
			"date": date,
			"imageUrl": imageUrl,
		};

		console.log(msgObj, 'msgObj');
		console.log(chatId, 'chatId');
		setComment('');
		setImage('');
		setImageUrl('');
		await dispatch(sendMessageThunk(token, chatId, msgObj));
		setIsMessages(!isMessages);
	};

	return (
		<div className='cnMessengerTextAreaRoot'>
			<div className='cnMessengerTextAreaMain'>
				<textarea value={comment} onChange={(e) => handleComment(e.target.value)} name="createPost" maxLength={200} rows="1" placeholder='Write something...' className='cnPostTextAreaMainArea'></textarea>
				<span className='cnMessengerImgToInsert'>{image?.name && image.name}</span>
			</div>
			<form className='cnMessengerTextAreaButton'>
				<label htmlFor="cnMessengerTextAreaFileBtn" className='cnMessengerTextAreaFileButton'><img src="../../../public/icons/add-photo-alternate.svg" className='addFileIcon' alt="icon" /></label>
				<input onChange={(e) => handleChange(e)} type="file" className='cnPostTextAreaFile' id='cnMessengerTextAreaFileBtn' />
				<button onClick={(e) => sendMessage(e)} className='cnMessengerTextAreaSendBtn'>Send</button>
			</form>
		</div>
	)
}

export default MessengerTextArea