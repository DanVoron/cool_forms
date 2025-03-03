import React, { useEffect, useState } from 'react';
import { NavBar } from '../NavBar/NavBar.jsx';
import ShareSVG from '../../assets/images/ShareSVG.svg';
import './FormsPage.css';
import { config } from '../../../config.js';
import axios from 'axios';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const API_URL = config.API_URL;

export const FormsPage = () => {
	const { formId } = useParams();
	const [formData, setFormData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [answers, setAnswers] = useState([]);
	let naviage = useNavigate()

	const JWT_TOKEN = localStorage.getItem('token');
	const USER_DATA = JSON.parse(localStorage.getItem('userData'));
	const userId = USER_DATA.Id;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/api/Question/${formId}`, {
					headers: {
						'Authorization': `Bearer ${JWT_TOKEN}`,
					},
				});
				setFormData(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [formId]);

	const handleTextAnswerChange = (questionId, text) => {
		setAnswers(prevAnswers => {
			const existingAnswer = prevAnswers.find(answer => answer.questionId === questionId);
			if (existingAnswer) {
				return prevAnswers.map(answer =>
					answer.questionId === questionId ? { ...answer, textAnswer: text } : answer
				);
			} else {
				return [...prevAnswers, { questionId, textAnswer: text, selectedOptionIds: [] }];
			}
		});
	};

	const handleOptionSelect = (questionId, optionId) => {
		setAnswers(prevAnswers => {
			const existingAnswer = prevAnswers.find(answer => answer.questionId === questionId);
			if (existingAnswer) {
				const selectedOptionIds = existingAnswer.selectedOptionIds.includes(optionId)
					? existingAnswer.selectedOptionIds.filter(id => id !== optionId)
					: [...existingAnswer.selectedOptionIds, optionId];
				return prevAnswers.map(answer =>
					answer.questionId === questionId ? { ...answer, selectedOptionIds } : answer
				);
			} else {
				return [...prevAnswers, { questionId, textAnswer: '', selectedOptionIds: [optionId] }];
			}
		});
	};

	const handleSubmit = async () => {
		const data = {
			formId: parseInt(formId),
			userId: userId,
			answers: answers
		};

		try {
			const response = await axios.post(`${API_URL}/api/Responses/Submit`, data,{
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			console.log('Ответы успешно отправлены:', response.data);
			naviage('/Profile')
		} catch (error) {
			console.error('Ошибка при отправке ответов:', error);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const copyToClipboard = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url)
			.catch(err => {
				console.error('Не удалось скопировать ссылку: ', err);
			});
	};

	return (
		<>
			<NavBar />
			<div className="mainpage-container">
				<div className={'default-container main-page'}>
					<div className={'big-text-container'}>
						<span>{formData.formName}</span>
						<img onClick={()=>{copyToClipboard()}} style={{cursor : 'pointer'}}  src={ShareSVG} alt="ShareSVG" />
					</div>
					<hr style={{ width: '100%' }} />
					<span>{formData.formDescription}</span>
				</div>

				{formData.questions.map((question) => (
					<div key={question.id} className={'default-container main-page formspage-question-container'}>
						<span className={'big-text-container'}>{question.questionText}</span>
						<hr style={{ width: '100%' }} />

						{question.questionType === 'checkbox' && question.questionOptions.map(option => (
							<div key={option.id} style={{ display: 'flex', alignItems: 'center' }}>
								<input
									type="checkbox"
									id={`checkbox-${option.id}`}
									className="custom-checkbox"
									onChange={() => handleOptionSelect(question.id, option.id)}
								/>
								<label htmlFor={`checkbox-${option.id}`}>{option.optionText}</label>
							</div>
						))}

						{question.questionType === 'radio' && question.questionOptions.map(option => (
							<div key={option.id} style={{ display: 'flex', alignItems: 'center' }}>
								<input
									type="radio"
									id={`radio-${option.id}`}
									name={`radio-group-${question.id}`}
									className="custom-radio"
									onChange={() => handleOptionSelect(question.id, option.id)}
								/>
								<label htmlFor={`radio-${option.id}`}>{option.optionText}</label>
							</div>
						))}

						{question.questionType === 'text' && (
							<textarea
								className={'text-area-input'}
								placeholder={"Напишите ваш ответ"}
								onChange={(e) => handleTextAnswerChange(question.id, e.target.value)}
							/>
						)}

						<hr style={{ width: '100%' }} />
						<div className={'small-text-container'}>
							<span>Баллов {question.points || 0}</span>
						</div>
					</div>
				))}

				<button className={'formspage-button'} onClick={handleSubmit}>ОТПРАВИТЬ</button>
			</div>
		</>
	);
};