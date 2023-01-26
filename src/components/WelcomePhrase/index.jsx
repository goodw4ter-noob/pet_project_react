import React from 'react'
import './style.css'

const WelcomePhrase = ({ user }) => {
  const token = localStorage.getItem('token');


  return (
    <p className="cnWelcomePhraseRoot">{token && user.firstName ? `Welcome back, ${user.firstName}!` : 'Log in to get started'}</p>
  )
}

export default WelcomePhrase