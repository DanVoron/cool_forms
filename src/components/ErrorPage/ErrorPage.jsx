import {useNavigate} from 'react-router-dom';

export const ErrorPage = () => {
	let navigate = useNavigate();
	return (
		<>
			<div className={'login-container'}>
				<div className="default-container login-page">

					<h1>Ошибка 404</h1>
					<p>Страница не найдена</p>
					<button style={{width: '100%'}} onClick={() => {
						navigate('/MainPage');
					}}>Перейти на главную
					</button>
				</div>
			</div>
		</>
	);
};