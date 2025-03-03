import {NavBar} from '../NavBar/NavBar.jsx';
import ProfileIconSVG from '../../assets/images/ProfileIconSVG.svg';
import './ProfilePage.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {config} from '../../../config.js';
import {useNavigate} from 'react-router-dom';
import ShareSVG from '../../assets/images/ShareSVG.svg';

const API_URL = config.API_URL;

export const ProfilePage = () => {
	const [isProfileEdit, setIsprofileEdit] = useState(false);
	const [profileData, setProfileData] = useState({});
	const [answersData, setAnswersData] = useState([]);
	let navigate =useNavigate();
	const USER_DATA = JSON.parse(localStorage.getItem('userData'));
	const JWT_TOKEN = localStorage.getItem('token');

	const [login, setLogin] = useState(USER_DATA.Login || '');
	const [password, setPassword] = useState('');
	const [photo, setPhoto] = useState(null);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
		return date.toLocaleString('ru-RU', options);
	};

	const handleFileChange = (event) => {
		setPhoto(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('Login', login);
		formData.append('Password', password);
		if (photo) {
			formData.append('File', photo);
		}

		try {
			const response = await axios.put(`${API_URL}/api/User/${USER_DATA.Id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			console.log('Profile updated successfully:', response.data);
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	const FetchProfile = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/User/${USER_DATA.Id}`, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			return response.data;
		} catch (error) {
			console.error('Ошибка подключения и данные не найдены ', error.message);
			return [];
		}
	};

	const FetchProfileAnswers = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/Responses/MyResponses/${USER_DATA.Id}`, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			return response.data;
		} catch (error) {
			console.error('Ошибка подключения и данные не найдены ', error.message);
			return [];
		}
	};

	const FetchData = async () => {
		const ProfileData = await FetchProfile();
		setProfileData(ProfileData);

		const AnswersData = await FetchProfileAnswers();
		setAnswersData(AnswersData);
	};

	useEffect(() => {
		FetchData();
	},);

	return (
		<>
			<NavBar></NavBar>
			<div className="mainpage-container">

				{isProfileEdit ?
					<div className={'default-container main-page profile-image-continaer'}>
						<div style={{
							width: '50%',
							height: '1%',
							aspectRatio: 1,
							overflow: 'hidden',
							borderRadius: '50%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							<img
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									borderRadius: '50%',
								}}
								src={profileData.photo ? profileData.photo : ProfileIconSVG}
								alt="Profile"
							/>
						</div>
						<input type="file" onChange={handleFileChange} />
						<input
							placeholder={'Логин'}
							value={login}
							onChange={(e) => setLogin(e.target.value)}
						/>
						<input
							type="password"
							placeholder={'Пароль'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button onClick={handleSubmit}>СОХРАНИТЬ</button>
						<button onClick={() => setIsprofileEdit(!isProfileEdit)}>НАЗАД</button>
					</div>

					:
					<div className={'default-container main-page profile-image-continaer'}>
						<div style={{
							width: '50%',
							height: '1%',
							aspectRatio: 1,
							overflow: 'hidden',
							borderRadius: '50%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							<img
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									borderRadius: '50%',
								}}
								src={profileData.photo ? profileData.photo : ProfileIconSVG}
								alt="Profile"
							/>
						</div>
						<span style={{'font-weight': 'bold', 'font-size': '24px'}}>{profileData.login}</span>
						<hr style={{width: '100%'}}/>
						<button onClick={() => {
							setIsprofileEdit(!isProfileEdit);
						}}>ИЗМЕНИТЬ ПРОФИЛЬ
						</button>
					</div>}


				<div className={'default-container main-page mainpage-myanswers-container'}>
					<span className={'big-text-container'}>Мои ответы</span>
					<hr style={{width: '100%'}}/>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>Форма</span>
						<span style={{'width': '33%'}}>Дата ответа</span>
						<span style={{'width': '33%'}}>Балл</span>
					</div>

					{answersData.map((answer, index) => (
						<div key={index} className={'mainpage-myanswers'}>
							<span style={{'width': '33%'}}>{answer.form}</span>
							<span style={{'width': '33%'}}>{formatDate(answer.createdAt)}</span>
							<span style={{'width': '33%'}}>{answer.score}/{answer.formScore}</span>
						</div>
					))}


				</div>


			</div>
		</>
	)
		;
};