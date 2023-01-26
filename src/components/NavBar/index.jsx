import classNames from 'classnames'
import React, { useState } from 'react'
import { useRef } from 'react'
import UserBadge from '../UserBadge'
import WelcomePhrase from '../WelcomePhrase'
import './style.css'

const NavBar = ({ setChangeTheme, setToken, updatePage, setUpdatePage, handleValues, isAuthenticated, user }) => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navBarRoot = useRef();

    return (
        <nav className='cnNavBarRoot' ref={navBarRoot}>
            <WelcomePhrase user={user}/>
            <a href={`${isAuthenticated ? '/user' : '/'}`} className='cnNavBarLink'>
                <img src='../../../public/chat.svg' alt="logo" className="cnNavBarLogo" />
            </a>
            <form className={classNames("cnNavBarLoginForm", `${isAuthenticated ? 'hidden' : ''}`)} onSubmit={(e) => {
                e.preventDefault();

                handleValues({
                    'email': emailValue,
                    'password': passwordValue,
                });
            }}>
                <input value={emailValue} onChange={(e) => setEmailValue(e.target.value)} type="text" placeholder="email" className="cnNavBarInput login__input--nickname" />
                <input value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} type="password" placeholder="password" className="cnNavBarInput login__input--password" />
                <button className="cnNavBarButton" >&rarr;</button>
            </form>
            <UserBadge setChangeTheme={setChangeTheme} navBarRoot={navBarRoot} setToken={setToken} updatePage={updatePage} setUpdatePage={setUpdatePage} user={user} className={classNames(`${isAuthenticated ? '' : 'hidden'}`)} />
        </nav>
    )
}

export default NavBar