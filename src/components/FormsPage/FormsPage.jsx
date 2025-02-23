import {NavBar} from '../NavBar/NavBar.jsx';
import ShareSVG from '../../assets/images/ShareSVG.svg';
import './FormsPage.css';

export const FormsPage = () => {
	return (
		<>
			<NavBar></NavBar>
			<div className="mainpage-container">
				<div className={'default-container main-page'}>
					<div className={'big-text-container'}>
						<span>Мои формы</span>
						<img src={ShareSVG} alt="ShareSVG"/>
					</div>
					<hr style={{width: '100%'}}/>
					<span>Описание формы</span>
				</div>

				<div className={'default-container main-page'}>
					<span className={'big-text-container'}>Вопрос чекбокс</span>
					<hr style={{width: '100%'}}/>
					<div style={{'display': 'flex'}}>
						<input type={'checkbox'} checked={true}/>
						<label>Чекбокс</label>
					</div>
					<div style={{'display': 'flex'}}>
						<input type={'checkbox'}/>
						<label>Чекбокс</label>
					</div>
					<div style={{'display': 'flex'}}>
						<input type={'checkbox'}/>
						<label>Чекбокс</label>
					</div>
					<div style={{'display': 'flex'}}>
						<input type={'checkbox'}/>
						<label>Чекбокс</label>
					</div>
					<hr style={{width: '100%'}}/>
					<div className={'small-text-container'}>
						<span>Баллов 5</span>
						<span>Обязательный</span>
					</div>
				</div>

				<div className={'default-container main-page'}>
					<span className={'big-text-container'}>Вопрос радио</span>
					<hr style={{width: '100%'}}/>
					<div style={{'display': 'flex'}}>
						<input type={'radio'} checked={true}/>
						<label>Чекбокс</label>
					</div>
					<div style={{'display': 'flex'}}>
						<input type={'radio'}/>
						<label>Чекбокс</label>
					</div>
					<div style={{'display': 'flex'}}>
						<input type={'radio'}/>
						<label>Чекбокс</label>
					</div>
					<div style={{'display': 'flex'}}>
						<input type={'radio'}/>
						<label>Чекбокс</label>
					</div>
					<hr style={{width: '100%'}}/>
					<div className={'small-text-container'}>
						<span>Баллов 2</span>
						<span>Обязательный</span>
					</div>
				</div>

				<div className={'default-container main-page'}>
					<span className={'big-text-container'}>Вопрос текст</span>
					<hr style={{width: '100%'}}/>

					<textarea  className={'text-area-input'} placeholder={"Напишите ваш ответ"}/>


					<hr style={{width: '100%'}}/>
					<div className={'small-text-container'}>
						<span>Баллов 3</span>
					</div>
				</div>

				<button className={'formspage-button'}>ОТПРАВИТЬ</button>

			</div>
		</>
	);
};