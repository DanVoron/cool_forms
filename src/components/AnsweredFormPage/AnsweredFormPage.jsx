import {NavBar} from '../NavBar/NavBar.jsx';
import './AnsweredFormPage.css';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';

const AnsweredQuestionForm = () => {
	const { formId } = useParams();


	return (
		<>

			<div className={'default-container main-page'}>
				<div className={'big-text-container'}>
					<span>Название формы</span>
				</div>
				<hr style={{width: '100%'}}/>
				<span>Имя пользователя: DanVoron</span>
				<span>Итоговый балл: 1/100</span>
			</div>

			<div className={'default-container main-page formspage-question-container'}>
				<span className={'big-text-container'}>Вопрос чекбокс</span>
				<hr style={{width: '100%'}}/>


				<div style={{display: 'flex', alignItems: 'center'}}>
					<input type="checkbox" id="custom-checkbox" className="custom-checkbox"/>
					<label htmlFor="custom-checkbox">Чекбокс</label>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<input type="checkbox" checked id="custom-checkbox" className="custom-checkbox"/>
					<label htmlFor="custom-checkbox">Чекбокс</label>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<input type="checkbox" id="custom-checkbox" className="custom-checkbox"/>
					<label htmlFor="custom-checkbox">Чекбокс</label>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<input type="checkbox" id="custom-checkbox" className="custom-checkbox"/>
					<label htmlFor="custom-checkbox">Чекбокс</label>
				</div>

				<hr style={{width: '100%'}}/>
				<div className={'small-text-container'}>
					<span>Баллов 5/10</span>
				</div>
			</div>

			<div className={'default-container main-page formspage-question-container'}>
				<span className={'big-text-container'}>Вопрос радио</span>
				<hr style={{width: '100%'}}/>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<input type="radio" id="custom-radio" name="radio-group" className="custom-radio"/>
					<label htmlFor="custom-radio">Радио</label>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<input type="radio" checked id="custom-radio" name="radio-group" className="custom-radio"/>
					<label htmlFor="custom-radio">Радио</label>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<input type="radio" id="custom-radio" name="radio-group" className="custom-radio"/>
					<label htmlFor="custom-radio">Радио</label>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<input type="radio" id="custom-radio" name="radio-group" className="custom-radio"/>
					<label htmlFor="custom-radio">Радио</label>
				</div>
				<hr style={{width: '100%'}}/>
				<div className={'small-text-container'}>
					<span>Баллов 5/10</span>
				</div>
			</div>

			<div className={'default-container main-page'}>
				<span className={'big-text-container'}>Вопрос текст</span>
				<hr style={{width: '100%'}}/>

				<textarea disabled className={'text-area-input'} placeholder={'Тут должен быть ответ'}/>
				<hr style={{width: '100%'}}/>
				<div className={'small-text-container'}>
					<span>Баллов 3/10</span>
				</div>
			</div>
		</>
	);
};


export const AnsweredFormPage = () => {

	return (
		<>
			<NavBar></NavBar>
			<div className="mainpage-container">
				<AnsweredQuestionForm/>
			</div>
		</>
	);
};