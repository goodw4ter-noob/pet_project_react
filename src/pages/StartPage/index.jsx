import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizedUserThunk, getUserThunk } from '../../../redux/actions/users';
import './style.css'


const StartPage = ({ setToken }) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.users.user)
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [values, setValues] = useState({});

	const handleValues = function (values) {
		setValues(values);
	};

	useEffect(() => {
		const fetchData = async function () {
			
			if (!values.email) return;
			
			await dispatch(getUserThunk(values));
			const token = localStorage.getItem("token");

			if (token) {
				await dispatch(getAuthorizedUserThunk(token));
				setIsAuthenticated(true);
				setToken(token);
				console.log('there is a token');
			} else {
				console.log('Неправильный адрес электронной почты или пароль!');
			}
		}

		fetchData();
	}, [values])

	return (
		<div className='cnStartPageRoot'>
			<Layout user={user} handleValues={handleValues} isAuthenticated={isAuthenticated}>
				
			</Layout>
		</div>
	)
}

export default StartPage