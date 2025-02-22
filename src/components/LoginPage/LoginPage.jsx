import './LoginPage.css';
import LoginLogoSVG from '../../assets/images/LoginLogoSVG.svg';
import {useNavigate} from 'react-router-dom';

export const LoginPage = () => {
	let navigate = useNavigate();
	return (
		<>
			<div className={"login-container"}>
				<div className="default-container main-page">
					<div>
						<img src={LoginLogoSVG}/>
						<hr style={{width: '100%'}}/>
					</div>
					<label style={{'font-weight': '700'}}>АВТОРИЗАЦИЯ</label>
					<div className={'login-input-container'}>
						<input placeholder={'Логин'}/>
						<input type={'password'} placeholder={'Пароль'}/>
						<div className={'login-button-container'}>
							<button onClick={() => {
								navigate('/MainPage');
							}}>ВОЙТИ
							</button>
							<a href={'/'}>Регистрация</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};