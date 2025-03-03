import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {NavBar} from '../NavBar/NavBar.jsx';
import './NewFormsPage.css';
import {config} from '../../../config.js';

const API_URL = config.API_URL;

const QuestionForm = ({formData, onFormUpdate}) => {
	const [questions, setQuestions] = useState(formData.questions || []);
	const [formName, setFormName] = useState(formData.formName || '');
	const [formDescription, setFormDescription] = useState(formData.formDescription || '');
	const [newQuestion, setNewQuestion] = useState({
		questionText: '',
		questionType: 'text',
		correctAnswer: '',
		points: 0,
		options: ['', ''],
	});
	const {formId} = useParams();
	const JWT_TOKEN = localStorage.getItem('token');
	const USER_DATA = JSON.parse(localStorage.getItem('userData'));
	const navigate = useNavigate();

	const allOptions = [
		{value: 'checkbox', label: 'Несколько из списка'},
		{value: 'radio', label: 'Один из списка'},
		{value: 'text', label: 'Текст'},
	];

	useEffect(() => {
		if (formData && formData.questions) {
			setQuestions(formData.questions);
			setFormName(formData.name);
			setFormDescription(formData.description);
		}
	}, [formData]);

	const updateForm = async (name, description) => {
		try {
			await axios.put(`${API_URL}/api/Form/${formId}`, {
				name: name,
				description: description,
				userId: USER_DATA.Id,
			}, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
		} catch (error) {
			console.error('Ошибка при обновлении формы:', error);
		}
	};

	const handleFormNameChange = async (e) => {
		const newName = e.target.value;
		setFormName(newName);
		await updateForm(newName, formDescription);
		onFormUpdate({...formData, name: newName, description: formDescription});
	};

	const handleFormDescriptionChange = async (e) => {
		const newDescription = e.target.value;
		setFormDescription(newDescription);
		await updateForm(formName, newDescription);
		onFormUpdate({...formData, name: formName, description: newDescription});
	};

	const handleInputChange = (e, questionId) => {
		const {name, value} = e.target;
		setQuestions((prev) =>
			prev.map(q =>
				q.id === questionId ? {...q, [name]: value} : q
			)
		);
		updateQuestion(questionId, {...questions.find(q => q.id === questionId), [name]: value});
	};

	const handleOptionChange = (questionId, index, value) => {
		setQuestions((prev) =>
			prev.map(q => {
				if (q.id === questionId) {
					const updatedOptions = [...q.options];
					updatedOptions[index] = value;
					return {...q, options: updatedOptions};
				}
				return q;
			})
		);
		updateQuestion(questionId, {
			...questions.find(q => q.id === questionId),
			options: [...questions.find(q => q.id === questionId).options]
		});
	};

	const addOption = (questionId) => {
		setQuestions((prev) =>
			prev.map(q => {
				if (q.id === questionId) {
					const updatedOptions = [...q.options, ''];
					return {...q, options: updatedOptions};
				}
				return q;
			})
		);
	};

	const removeOption = (questionId, index) => {
		setQuestions((prev) =>
			prev.map(q => {
				if (q.id === questionId) {
					const updatedOptions = q.options.filter((_, i) => i !== index);
					return {...q, options: updatedOptions};
				}
				return q;
			})
		);
	};

	const addQuestion = async () => {
		try {
			const response = await axios.post(`${API_URL}/api/Question`, {
				formId: parseInt(formId),
				questionText: newQuestion.questionText,
				questionType: newQuestion.questionType,
				correctAnswer: newQuestion.correctAnswer,
				points: newQuestion.points,
				options: newQuestion.options,
			}, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			setQuestions((prev) => [...prev, response.data]);
			setNewQuestion({questionText: '', questionType: 'text', correctAnswer: '', points: 0, options: ['', '']});
		} catch (error) {
			console.error('Ошибка при добавлении вопроса:', error);
		}
	};

	const updateQuestion = async (questionId, updatedQuestion) => {
		try {
			await axios.put(`${API_URL}/api/Question/${questionId}`, {
				formId: parseInt(formId),
				questionText: updatedQuestion.questionText,
				questionType: updatedQuestion.questionType,
				correctAnswer: updatedQuestion.correctAnswer,
				points: updatedQuestion.points,
				options: updatedQuestion.options,
			}, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
		} catch (error) {
			console.error('Ошибка при редактировании вопроса:', error);
		}
	};

	const deleteQuestion = async (questionId) => {
		try {
			await axios.delete(`${API_URL}/api/Question/${questionId}?formId=${formId}`, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			setQuestions((prev) => prev.filter(q => q.id !== questionId));
		} catch (error) {
			console.error('Ошибка при удалении вопроса:', error);
		}
	};

	return (
		<>
			<div className={'default-container main-page'}>
				<div className={'big-text-container'}>
					<input
						placeholder={'Название формы'}
						value={formName}
						onChange={handleFormNameChange}
					/>
				</div>
				<hr style={{width: '100%'}}/>
				<textarea
					className={'text-area-input'}
					placeholder={'Описание формы'}
					value={formDescription}
					onChange={handleFormDescriptionChange}
				/>
			</div>

			{questions.length > 0 ? (
				questions.map((question) => (
					<div key={question.id} className={'default-container main-page'}>
						<input
							name="questionText"
							placeholder={'Вопрос'}
							value={question.questionText}
							onChange={(e) => handleInputChange(e, question.id)}
						/>
						<hr style={{width: '100%'}}/>
						<select
							name="questionType"
							value={question.questionType}
							onChange={(e) => handleInputChange(e, question.id)}
						>
							{allOptions.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>

						<input
							name="correctAnswer"
							placeholder={'Правильный ответ'}
							value={question.correctAnswer}
							onChange={(e) => handleInputChange(e, question.id)}
						/>
						<input
							name="points"
							type="number"
							placeholder={'Баллы'}
							value={question.points}
							onChange={(e) => handleInputChange(e, question.id)}
						/>

						<button onClick={() => deleteQuestion(question.id)}>удалить</button>

						{Array.isArray(question.options) && question.options.map((option, index) => (
							<div key={index} style={{display: 'flex', alignItems: 'center'}}>
								<input
									type="text"
									value={option}
									onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
								/>
								<button onClick={() => removeOption(question.id, index)}>Удалить вариант</button>
							</div>
						))}
						<button onClick={() => addOption(question.id)}>Добавить вариант</button>
					</div>
				))
			) : (
				<p>Нет вопросов для отображения.</p>
			)}

			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
				<button onClick={addQuestion}>Добавить вопрос</button>
			</div>
		</>
	);
};


const AnswersForm = ({formId}) => {
	let navigate = useNavigate();
	const [answers, setAnswers] = useState([]);
	const JWT_TOKEN = localStorage.getItem('token');

	const FetchFormAnswers = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/Responses/FormResponses/${formId}`, {
				headers: {
					'Authorization': `Bearer ${JWT_TOKEN}`,
				},
			});
			setAnswers(response.data);
		} catch (e) {
			console.error(e);
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		};
		return date.toLocaleString('ru-RU', options);
	};

	useEffect(() => {
		FetchFormAnswers();
	}, []);

	return (
		<>
			<div className={'default-container main-page'}>
				<div className={'big-text-container'}>
					<span>Пользователь</span>
					<span>Баллы</span>
				</div>
				<hr style={{width: '100%'}}/>
				{
					answers.map((answer, index) => (
						<div key={index} className={'form-answers-list-container'}>
							<div className={'big-text-container form-answers-container'}>
								<span>{answer.user} <br/> <span
									style={{'color': 'grey', 'font-size': '12px'}}>{formatDate(answer.createdAt)}</span></span>
								<span style={{'text-align': 'center'}}>{answer.score}/{answer.formScore}</span>
							</div>
						</div>
					))
				}
			</div>
		</>
	);
};

export const NewFormsPage = () => {
	const [formData, setFormData] = useState(null);
	const [isAnswer, setIsAnswer] = useState(true);
	const {formId} = useParams();
	const location = useLocation();

	const JWT_TOKEN = localStorage.getItem('token');

	useEffect(() => {
		const fetchFormData = async () => {
			if (formId) {
				try {
					const response = await axios.get(`${API_URL}/api/Question/${formId}`, {
						headers: {
							'Authorization': `Bearer ${JWT_TOKEN}`,
						},
					});
					setFormData(response.data);
				} catch (error) {
					console.error('Ошибка при получении данных формы:', error);
				}
			}
		};

		fetchFormData();
	}, [formId]);

	const handleFormUpdate = (updatedFormData) => {
		setFormData(updatedFormData);
	};

	return (
		<>
			<NavBar isForm={true} isAnswer={isAnswer} setIsAnswer={setIsAnswer}></NavBar>
			<div className="mainpage-container">
				{formData ? isAnswer && <QuestionForm formData={formData} onFormUpdate={handleFormUpdate}/> :
					<p>Загрузка...</p>}
				{!isAnswer && <AnswersForm formId={formId}/>}
			</div>
		</>
	);
};