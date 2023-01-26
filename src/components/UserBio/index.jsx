import classNames from 'classnames';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ChangeProfileModal from '../ChangeProfileModal';
import './style.css'


const UserBio = ({ onEdit }) => {
    const [isChangeProfileModalVisible, setIsChangeProfileModalVisible] = useState(false);
    const [isDetailsShown, setIsDetailsShown] = useState(false);
    const user = useSelector(state => state.users.authorizedUser);

    const onEditBtnClick = function () {
        setIsChangeProfileModalVisible(true);
        document.body.style.overflow = 'hidden';
    };

    const toggleDetails = function () {
        if (isDetailsShown) {

            return (
                <div className='cnUserBioDetails'>
                    <div className="cnUserBioRowInside cnUserBioRowInfo">
                        <span>
                            {user.addInfo}
                        </span>
                    </div>
                    <div className="cnUserBioRowInside mpp-links">
                        <div className="link1">
                            <a href={user.linkArr[0]}>{user.linkArr[0]?.slice(0, 24)}...</a>
                        </div>
                        <div className="link2">
                            <a href={user.linkArr[1]}>{user.linkArr[1]?.slice(0, 24)}...</a>
                        </div>
                    </div>
                    <span className='cnUserBioHideInfoBtn' onClick={() => setIsDetailsShown(false)}>hide info</span>
                </div>
            );
        } else {
            return;
        };
    }

    return (
        <div className={classNames(`cnUserBioRoot ${isDetailsShown ? 'spreaded' : ''}`)}>
            <div className="main-page-profile-photo">
                <img src={user.img} alt="bird" className="profile-image" />
            </div>
            <div className="cnUserBioRow cnUserBioRowName">
                <span>{user.firstName} {user.lastName}</span>
                <img src="../../../public/icons/edit.svg" alt="edit" className="edit-button" onClick={onEditBtnClick} />
                <div className="cnUserBioRow mpp-location">
                    <span>{user.city}, {user.country}</span>
                    <img src={user.flag} alt="" className="flag" />
                </div>
            </div>
            <span className={`${isDetailsShown ? 'cnUserBioShowInfoBtn hidden' : 'cnUserBioShowInfoBtn'}`} onClick={() => setIsDetailsShown(true)}>more details...</span>
            {toggleDetails()}
            <ChangeProfileModal
                onEdit={onEdit}
                user={user}
                setIsChangeProfileModalVisible={setIsChangeProfileModalVisible}
                onChangeProfileModalClose={() => { setIsChangeProfileModalVisible(false); document.body.style.overflow = ''; }}
                isChangeProfileModalVisible={isChangeProfileModalVisible} />
        </div>
    )
}

export default UserBio