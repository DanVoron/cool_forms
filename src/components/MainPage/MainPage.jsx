import {NavBar} from '../NavBar/NavBar.jsx';
import './MainPage.css';
import {Scripts, useNavigate} from 'react-router-dom';

export const MainPage = () => {
	let navigate = useNavigate();
	return (
		<>
			<NavBar></NavBar>
			<div className="mainpage-container">
				<div className={'default-container main-page'}>
					<span>Мои формы</span>
					<hr style={{width: '100%'}}/>
					<div className={'forms-container'}>
						<div onClick={()=>{navigate('/FormsPage');}} className={"default-container main-form-button"}>1 форма</div>
						<div onClick={()=>{navigate('/FormsPage');}} className={"default-container main-form-button"}>1 форма</div>
						<div onClick={()=>{navigate('/FormsPage');}} className={"default-container main-form-button"}>1 форма</div>
					</div>
				</div>

				<div className={'default-container main-page'}>
					Мои ответы
					<hr style={{width: '100%'}}/>
					Все мои ответы
				</div>
			</div>
		</>
	);
};