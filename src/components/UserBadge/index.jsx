import React from 'react'
import classNames from 'classnames';
import './style.css'
import { useState } from 'react';
import ReactModal from 'react-modal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { mutateUserThunk } from '../../../redux/actions/users';



const UserBadge = ({ setChangeTheme, navBarRoot, setToken, user, className }) => {
    const [isArrowRotated, setIsArrowRotated] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [colourTheme, setIsLightTheme] = useState(true);

    const dispatch = useDispatch();

    const userBadgeRoot = useRef();
    const userBadgeRootArrow = useRef();
    const cnUserBadgeNickName = useRef();

    const toggleArrow = function () {
        setIsArrowRotated(!isArrowRotated);
        setIsModalVisible(!isArrowRotated);
    };

    const getNickName = function () {
        if (!user.firstName) return;
        const fullName = [user.firstName, user.lastName];
        const initials = fullName.map(el => el[0]).join('');
        return initials;
    }

    const refreshPage = function () {
        setToken();
    }

    const changeTheme = async function () {
        setIsLightTheme(!colourTheme);

        const theme = colourTheme ? 'dark' : 'light'; //ИСПРАВИТЬ!!!
        
        console.log(theme, 'changeTheme');
        const token = localStorage.getItem('token');
        user.theme = theme;
        await dispatch(mutateUserThunk(user, token));
        setChangeTheme(!colourTheme);
    }

    useEffect(() => {
        let theme = user.theme;
        
        console.log(theme);
        document.body.dataset.theme = theme;
        userBadgeRoot.current.dataset.theme = theme;
        userBadgeRootArrow.current.dataset.theme = theme;
        cnUserBadgeNickName.current.dataset.theme = theme;
        navBarRoot.current.dataset.theme = theme;

    }, [user.theme])

    return (
        <div className={classNames('cnUserBadgeRoot', className)} ref={userBadgeRoot}>
            <div className='cnUserBadgeRow'>
                <img src={user.img} alt="photo" className="cnUserBadgeProfilePhoto" />
                <div className="cnUserBadgeInner">
                    <span ref={cnUserBadgeNickName} className="cnUserBadgeNickName">{getNickName()}</span>
                    <i ref={userBadgeRootArrow} className={classNames("fa-solid fa-arrow-down cnUserBadgeArrow", `${(isArrowRotated && isModalVisible) && "rotate"}`)} onClick={toggleArrow}></i>
                </div>
            </div>
            <ReactModal
                isOpen={isModalVisible}
                onRequestClose={() => { setIsModalVisible(false); setIsArrowRotated(false) }}
                className="cnUserBadgeModal"
                overlayClassName="cnUserBadgeModalOverlay"
                ariaHideApp={false}
            >
                <ul className={classNames("cnUserBadgeProfileMenu", `${user.theme === 'dark' && 'cnUserBadgeProfileMenuDark'}`)}>
                    {/* <li>Change theme</li> */}
                    <li>
                        <span onClick={changeTheme} className={classNames('cnUserBadgeTheme', `${user.theme === 'dark' && 'cnUserBadgeThemeDark'}`)}>Change theme</span>
                        {/* <label className='cnUserBadgeSwitchThemeLabel'>
                            <input type="checkbox" className='cnUserBadgeSwitchTheme'  />
                            <span className='cnUserBadgeSlider'></span>
                        </label> */}
                    </li>
                    <li onClick={() => { localStorage.removeItem('token'); refreshPage() }} className={classNames(`${user.theme === 'dark' && 'cnUserBadgeThemeDark'}`)} >Exit</li>
                </ul>
            </ReactModal>
        </div>
    )
}

export default UserBadge