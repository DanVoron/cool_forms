import {NavBar} from '../NavBar/NavBar.jsx';
import './MainPage.css';
import {useNavigate} from 'react-router-dom';
import ShareSVG from '../../assets/images/ShareSVG.svg';
import ProfileIconSVG from '../../assets/images/ProfileIconSVG.svg';
import GoInArrowButtonSVG from '../../assets/images/GoInArrowButton.svg';
import {config} from '../../../config.js';
import axios from 'axios';
import {useEffect, useState} from 'react';

const API_URL = config.API_URL;
const ERR_JSON = config.JSON_PLACEHOLDER;


export const MainPage = () => {
	const USER_DATA = JSON.parse(localStorage.getItem('userData'));
	const JWT_TOKEN = localStorage.getItem('token');
	let navigate = useNavigate();

	const [forms, setForms] = useState([]);
	const [imageSrc, setImageSrc] = useState();

	const [menuVisible, setMenuVisible] = useState(false);
	const [selectedForm, setSelectedForm] = useState(null);

	const toggleMenu = (form) => {
		setSelectedForm(form);
		setMenuVisible(!menuVisible);
	};

	const handleEdit = () => {
		if (selectedForm) {
			navigate(`/NewFormsPage/${selectedForm.id}`);
		}
		setMenuVisible(false);
	};

	const createForm = async ()=>{
		const FormData = {
			name: "Ваша форма",
			description: "Описание формы",
			userId: USER_DATA.Id
		}
		console.log(USER_DATA.Id)
		try {
			const response = await axios.post(`${API_URL}/api/Form`, FormData,{
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			navigate(`/NewFormsPage/${response.data.id}`);
			return response.data;
		} catch (error) {
			console.error('Ошибка подключения и данные не найдены ', error.message);
			return [];
		}
	}

	const handleDelete = (id) => {
		if (selectedForm) {
			DeleteForm(id);
			console.log(`Удалить форму с ID: ${id}`);
		}
		setMenuVisible(false);
		FetchData();
	};

	const DeleteForm = async (id) => {
		try {
			const response = await axios.delete(`${API_URL}/api/Form/${id}`, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			FetchData();
			return response.data;
		} catch (error) {
			console.error('Ошибка подключения и данные не найдены ', error.message);
			return [];
		}
	};

	const FetchForms = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/Form/${USER_DATA.Id}`, {
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

	const FetchProfile = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/User/${USER_DATA.Id}`, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			return response.data.photo;
		} catch (error) {
			console.error('Ошибка подключения и данные не найдены ', error.message);
			return [];
		}
	};


	const FetchData = async () => {
		const FormData = await FetchForms();
		setForms(FormData);

		const ImageSrcData = await FetchProfile();
		setImageSrc(ImageSrcData);
	};

	useEffect(() => {
		FetchData();
	}, []);



	return (
		<>
			<NavBar isMain={true}></NavBar>
			<div className="mainpage-container">

				<div className={'default-container main-page profile-container'}>
					<div>
						<span className={'mainpage-welcome-text'}>Добро пожаловать!</span>
						<br/>
						<span className={'mainpage-name-text'}>{USER_DATA.Login}</span>
					</div>
					<a style={{'margin-left': 'auto', 'position': 'relative'}} onClick={() => {
						navigate('/profile');
					}}><img className={'profile-image-style'} src={imageSrc ? imageSrc : ProfileIconSVG}/> <img
						className={'arrow-button-position'} src={GoInArrowButtonSVG}/>
					</a>
				</div>

				<div className={'default-container main-page'}>
					<div className={'big-text-container'}>
						<span>Мои формы</span>
						<span></span>
					</div>
					<hr style={{width: '100%'}}/>

					<div className={'forms-container'}>
						{forms.map(form => (
							<div key={form.id} className={'default-container main-form-button'}>
								<div onClick={() => navigate(`/FormsPage/${form.id}`)}>
									{form.name}
								</div>
								<button onClick={() => toggleMenu(form)} className="menu-button">☰</button>
								{menuVisible && selectedForm === form && (
									<div className="dropdown-menu">
										<button onClick={()=>{handleEdit(form.id)}}>Изменить</button>
										<button onClick={()=>{handleDelete(form.id)}}>Удалить</button>
									</div>
								)}
							</div>
						))}

						<div onClick={() => createForm()} className={'default-container main-form-button'}>
							+Создать форму
						</div>
					</div>
				</div>


			</div>
		</>
	);
};