import {NavBar} from '../NavBar/NavBar.jsx';
import ProfileIconSVG from '../../assets/images/ProfileIconSVG.svg';
import "./ProfilePage.css"

export const ProfilePage = () => {
	return (
		<>
			<NavBar></NavBar>
			<div className="mainpage-container">
				<div className={'default-container main-page'}>
					<span>Профиль</span>
					<hr style={{width: '100%'}}/>
					<div className={'profile-add-container'}>
						<img style={{"min-width":"50px","min-height":"50px"}} src={ProfileIconSVG}/>
						<button style={{width:"50%",height:"10%"}}>Загрузить картинку</button>
					</div>
					<div className={'profile-input-container'}>
						<input placeholder={"Логин"}/>
						<input placeholder={"Пароль"}/>
						<a>Изменить пароль</a>
						<button>СОХРАНИТЬ</button>
					</div>
				</div>
			</div>
		</>
	);
};