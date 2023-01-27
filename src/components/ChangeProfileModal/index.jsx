import React from 'react'
import { useState } from 'react';
import ReactModal from 'react-modal'
import { countries } from '../../../public/countriesPng/countries';
import CountryList from '../CountryList';
import './style.css'


const ChangeProfileModal = ({ onEdit, setIsChangeProfileModalVisible, user, isChangeProfileModalVisible, onChangeProfileModalClose }) => {
    const [firstNameValue, setFirstNameValue] = useState(user.firstName);
    const [lastNameValue, setLastNameValue] = useState(user.lastName);
    const [cityValue, setCityValue] = useState(user.city);
    const [country, setCountry] = useState(user.country);
    const [link1Value, setLink1Value] = useState(user.linkArr[0]);
    const [link2Value, setLink2Value] = useState(user.linkArr[1]);
    const [addInfo, setAddInfo] = useState(user.addInfo);

    const onCloseBtnClick = function () {
        setIsChangeProfileModalVisible(false);
        document.body.style.overflow = '';
    };

    const onSubmitClick = function (e) {
        e.preventDefault();
        if (!firstNameValue || !lastNameValue) return;

        const countryCode = Object.keys(countries).find(key => countries[key] === country);
        const flag = `../../../public/countriesPng/${countryCode}.png`;

        const userInfo = {
            "theme": user.theme,
            "firstName": firstNameValue,
            "lastName": lastNameValue,
            "img": user.img,
            "city": cityValue,
            "country": country,
            "flag": flag,
            "linkArr": [
                link1Value,
                link2Value
            ],
            "addInfo": addInfo,
            "id": user.id,
            "friends": user.friends,
        };
        const token = localStorage.getItem('token');
        onEdit(userInfo, token);
        setIsChangeProfileModalVisible(false);
    };

    return (
        <ReactModal
            isOpen={isChangeProfileModalVisible}
            onRequestClose={onChangeProfileModalClose}
            className='cnChangeProfileModal'
            overlayClassName="cnChangeProfileModalOverlay"
            ariaHideApp={false}
        >
            <form onSubmit={(e) => onSubmitClick(e)} className="cnChangeProfileModalRoot">
                <span>First name</span>
                <textarea onChange={(e) => setFirstNameValue(e.target.value)} defaultValue={`${user.firstName}`} rows="1" maxLength="40" placeholder="Write something..."
                    className="change-profile-textarea name-textarea" />
                <span>Last name</span>
                <textarea onChange={(e) => setLastNameValue(e.target.value)} defaultValue={`${user.lastName}`} rows="1" maxLength="40" placeholder="Write something..."
                    className="change-profile-textarea name-textarea" />
                <span>City</span>
                <textarea onChange={(e) => setCityValue(e.target.value)} defaultValue={`${user.city}`} rows="1" maxLength="25" placeholder="Write something..."
                    className="change-profile-textarea city-textarea" />
                <span>Country</span>
                <CountryList setCountry={setCountry} country={country} />
                <span className='cnLink1' >Link 1</span>
                <textarea onChange={(e) => setLink1Value(e.target.value)} defaultValue={user.linkArr[0]} rows="1" placeholder="Write something..."
                    className="change-profile-textarea link1-textarea" />
                <span  >Link 2</span>
                <textarea onChange={(e) => setLink2Value(e.target.value)} defaultValue={user.linkArr[1]} rows="1" placeholder="Write something..."
                    className="change-profile-textarea link2-textarea" />
                <span>Additional info</span>
                <textarea onChange={(e) => setAddInfo(e.target.value)} defaultValue={user.addInfo} rows="1" maxLength="290" placeholder="Write something..."
                    className="change-profile-textarea add-info-textarea" />
                <button onClick={onSubmitClick} className="cnChangeProfileConfirm">Confirm</button>
                <img onClick={onCloseBtnClick} src="../../../public/icons/close.svg" alt="close" className="close-change-profile-button" />
            </form>
        </ReactModal>
    );
};

export default ChangeProfileModal