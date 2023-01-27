import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getAuthorizedUserThunk } from '../../../redux/actions/users';
import MessengerPage from '../../pages/MessengerPage';
import StartPage from '../../pages/StartPage';
import UserPage from '../../pages/UserPage';

const PageRoutes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [Token, setToken] = useState('');

    const authRoutes = [
        { path: '/', element: <StartPage setIsAuthed={setIsAuthenticated} setToken={setToken} />, exact: true },
    ];

    const mainRoutes = [
        { path: '/user', element: <UserPage setToken={setToken} isAuthenticated={isAuthenticated} />, exact: true },
        { path: '/messenger', element: <MessengerPage setToken={setToken} isAuthenticated={isAuthenticated} />, exact: true },
    ];

    useEffect(() => {
        const getData = async function () {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    await dispatch(getAuthorizedUserThunk(token));
                    setIsAuthenticated(true);
                    navigate('/user');
                    console.log('to user page');
                } else {
                    console.log('to start page');
                    setIsAuthenticated(false);
                    navigate('/');
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        getData();
    }, [Token]);

    const routes = isAuthenticated ? mainRoutes : authRoutes;
    return (
        <Routes>
            {routes.map(route => <Route path={route.path} key={route.path} element={route.element} exact={route.exact} />)}
        </Routes>
    )
}

export default PageRoutes