import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import {config} from '/config.js';
import './LoginPage.css';
import LoginLogoSVG from '../../assets/images/LoginLogoSVG.svg';

const API_URL = config.API_URL;

export const LoginPage = () => {
	const [localUserName, setLocalUserName] = useState('');
	const [localPassword, setLocalPassword] = useState('');
	const [localPasswordRepeat, setLocalPasswordRepeat] = useState('');
	const [localUserNameError, setLocalUserNameError] = useState(null);
	const [localPasswordError, setLocalPasswordError] = useState(null);
	const [isReg, setIsReg] = useState(false);
	const navigate = useNavigate();

	const toggleRegistration = () => {
		setIsReg(!isReg);
		setLocalUserNameError(null);
		setLocalPasswordError(null);
	};

	const handleLogin = async () => {
		setLocalUserNameError(null);
		setLocalPasswordError(null);

		if (!localUserName && !localPassword) {
			setLocalUserNameError('Введите логин');
			setLocalPasswordError('Пароль введи, крутой парень');
			return;
		}
		if (!localUserName) {
			setLocalUserNameError('Введите логин');
			return;
		}
		if (!localPassword) {
			setLocalPasswordError('Пароль введи, крутой парень');
			return;
		}

		try {
			const response = await axios.post(`${API_URL}/api/login`, {
				'login': localUserName,
				'password': localPassword
			});
			const jwtToken = response.data.token;
			const user = jwtDecode(jwtToken);

			localStorage.setItem('token', jwtToken);
			localStorage.setItem('userData', JSON.stringify(user));

			navigate('/MainPage');

		} catch (error) {
			console.error('Ошибка при входе:', error);
			setLocalUserNameError(' ');
			setLocalPasswordError('Неправильный логин или пароль');
		}
	};

	const handleRegistration = async () => {
		if (!localUserName || !localPassword || localPassword !== localPasswordRepeat) {
			if (!localUserName) setLocalUserNameError('Введите логин');
			if (!localPassword) setLocalPasswordError('Введите пароль');
			if (localPassword !== localPasswordRepeat) setLocalPasswordError('Пароли не совпадают');
			return;
		}

		try {
			const response = await axios.post(`${API_URL}/api/register`, {
				'login': localUserName,
				'password': localPassword
			});

			const jwtToken = response.data.token;
			const user = jwtDecode(jwtToken);

			localStorage.setItem('token', jwtToken);
			localStorage.setItem('userData', JSON.stringify(user));

			navigate('/MainPage');

		} catch (error) {
			console.error('Ошибка при входе:', error);
			setLocalUserNameError(' ');
			setLocalPasswordError('Неправильный логин или пароль');
		}

		navigate('/MainPage');
	};

	return (
		<div className="login-container">
			<div className="default-container login-page">
				<div className="login-logo-container">
					<img src={LoginLogoSVG} alt="Логотип"/>
					<hr style={{width: '70%'}}/>
				</div>
				{isReg ? (
					<div className="login-input-container">
						<div>
							<input
								placeholder="Логин"
								value={localUserName}
								onChange={(e) => setLocalUserName(e.target.value)}
								className={localUserNameError ? 'is-invalid' : ''}
							/>
							{localUserNameError && <div className="invalid-feedback">{localUserNameError}</div>}
						</div>
						<div>
							<input
								type="password"
								placeholder="Пароль"
								value={localPassword}
								onChange={(e) => setLocalPassword(e.target.value)}
								className={localPasswordError ? 'is-invalid' : ''}
							/>
						</div>
						<div>
							<input
								type="password"
								placeholder="Повторите пароль"
								value={localPasswordRepeat}
								onChange={(e) => setLocalPasswordRepeat(e.target.value)}
								className={localPasswordError ? 'is-invalid' : ''}
							/>
							{localPasswordError && <div className="invalid-feedback">{localPasswordError}</div>}
						</div>
						<div className="login-button-container">
							<button style={{width: '100%'}} onClick={handleRegistration}>
								ЗАРЕГЕСТРИРОВАТЬСЯ
							</button>
							<a onClick={toggleRegistration}>Вход</a>
						</div>
					</div>
				) : (
					<div className="login-input-container">
						<div>
							<input
								placeholder="Логин"
								value={localUserName}
								onChange={(e) => setLocalUserName(e.target.value)}
								className={localUserNameError ? 'is-invalid' : ''}
							/>
							{localUserNameError && <div className="invalid-feedback">{localUserNameError}</div>
							}
						</div>
						<div>
							<input
								type="password"
								placeholder="Пароль"
								value={localPassword}
								onChange={(e) => setLocalPassword(e.target.value)}
								className={localPasswordError ? 'is-invalid' : ''}
							/>
							{localPasswordError && <div className="invalid-feedback">{localPasswordError}</div>}
						</div>
						<div className="login-button-container">
							<button style={{width: '100%'}} onClick={handleLogin}>
								ВОЙТИ
							</button>
							<a onClick={toggleRegistration}>Регистрация</a>
						</div>
					</div>
				)
				}
			</div>
		</div>
	)
		;
};