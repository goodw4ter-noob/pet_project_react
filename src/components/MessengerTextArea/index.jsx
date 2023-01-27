import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import './style.css'

const MessengerTextArea = () => {
    const dispatch = useDispatch();
	const [image, setImage] = useState();
	const [imageUrl, setImageUrl] = useState(); //imageUrl === src
	const [comment, setComment] = useState('');

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

    return (
        <div className='cnMessengerTextAreaRoot'>
            <div className='cnMessengerTextAreaMain'>
                <textarea value={comment} onChange={(e) => handleComment(e.target.value)} name="createPost" maxLength={200} rows="1" placeholder='Write something...' className='cnPostTextAreaMainArea'></textarea>
                <span className='cnMessengerImgToInsert'>{image?.name && image.name}</span>
            </div>
            <form className='cnMessengerTextAreaButton'>
                <label htmlFor="cnMessengerTextAreaFileBtn" className='cnMessengerTextAreaFileButton'><img src="../../../public/icons/add-photo-alternate.svg" className='addFileIcon' alt="icon" /></label>
                <input onChange={(e) => handleChange(e)} type="file" className='cnPostTextAreaFile' id='cnMessengerTextAreaFileBtn' />
                <button onClick={(e) => renderPost(e)} className='cnMessengerTextAreaSendBtn'>Send</button>
            </form>
        </div>
    )
}

export default MessengerTextArea