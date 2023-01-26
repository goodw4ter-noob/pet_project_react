import React from 'react'
import NavBar from '../NavBar'
import './style.css'

const Layout = ({ setChangeTheme, setToken, updatePage, setUpdatePage, handleValues, isAuthenticated, children, user }) => {
  return (
    <div className='cnLayoutRoot'>
        <NavBar setChangeTheme={setChangeTheme} setToken={setToken} handleValues={handleValues} isAuthenticated={isAuthenticated} user={user} updatePage={updatePage} setUpdatePage={setUpdatePage}/>
        <div className='cnLayoutBody'>
            {children}
        </div>
    </div>  
  )
}

export default Layout