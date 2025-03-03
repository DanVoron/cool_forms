import LogoHorziontalSVG from '../../assets/images/LogoHorizontalSVG.svg';
import BackButtonSVG from '../../assets/images/BackButtonSVG.svg';
import ExitButtonSVG from '../../assets/images/ExitButtonSVG.svg';
import './NavBar.css';
import {useNavigate} from 'react-router-dom';

export const NavBar = ({isForm, isAnswer, setIsAnswer, isMain}) => {
	let navigate = useNavigate();
	return (<>
		<div className={'navbar-body'}>

			<div className={'navbar-container'}>
				{!isMain ? <a className={'navbar-back-button'} onClick={() => {
						navigate(-1);
					}}><img src={BackButtonSVG}/></a>
					:
					<a className={'navbar-back-button'} onClick={() => {
						navigate('/');
					}}><img className={'navbar-logout-image'} src={ExitButtonSVG}/></a>
				}


				<a onClick={() => {
					navigate('/MainPage');
				}}><img src={LogoHorziontalSVG}/></a>
			</div>


			{isForm && <div className={'navbar-question-container'}>
				<div className={'navbar-buttons-container'}>
					<button onClick={() => {
						setIsAnswer(true);
					}}
							className={`navbar-question-button ${isAnswer ? 'navbar-selected-button' : 'navbar-unselected-button'} `}>Вопросы
					</button>
					<button onClick={() => {
						setIsAnswer(false);
					}}
							className={`navbar-question-button ${isAnswer ? 'navbar-unselected-button' : 'navbar-selected-button'} `}>Ответы
					</button>
				</div>
			</div>

			}
		</div>
	</>);
};