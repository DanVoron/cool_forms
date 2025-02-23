import './LoginPage.css';
import LoginLogoSVG from '../../assets/images/LoginLogoSVG.svg';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

export const LoginPage = () => {
	const [isReg, setIsReg] = useState(false);
	let navigate = useNavigate();

	function ToggleRegestration() {
		setIsReg(!isReg);
	}

	return (
		<>
			<div className={'login-container'}>
				<div className="default-container login-page">
					<div className={'login-logo-container'}>
						<img src={LoginLogoSVG}/>
						<hr style={{width: '70%'}}/>
					</div>
					{isReg ?
						<div className={'login-input-container'}>
							<input placeholder={'Логин'}/>
							<input type={'password'} placeholder={'Пароль'}/>
							<input type={'password'} placeholder={'Пароль ещё раз'}/>
							<div className={'login-button-container'}>
								<button style={{width: '100%'}} onClick={() => {
									navigate('/MainPage');
								}}>ЗАРЕГЕСТРИРОВАТЬСЯ
								</button>
								<a onClick={ToggleRegestration}>Вход</a>
							</div>
						</div>

				:

				<div className={'login-input-container'}>
				<input placeholder={'Логин'}/>
						<input type={'password'} placeholder={'Пароль'}/>
						<div className={'login-button-container'}>
							<button style={{width: '100%'}} onClick={() => {
								navigate('/MainPage');
							}}>ВОЙТИ
							</button>
							<a onClick={ToggleRegestration}>Регистрация</a>
						</div>
					</div>}
				</div>
			</div>
		</>
	);
};