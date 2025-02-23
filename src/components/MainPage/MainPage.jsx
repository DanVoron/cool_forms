import {NavBar} from '../NavBar/NavBar.jsx';
import './MainPage.css';
import {useNavigate} from 'react-router-dom';
import ShareSVG from '../../assets/images/ShareSVG.svg';

export const MainPage = () => {
	let navigate = useNavigate();
	return (
		<>
			<NavBar></NavBar>
			<div className="mainpage-container">
				<div className={'default-container main-page'}>
					<div className={'big-text-container'}>
						<span>Мои формы</span>
						<span>3/5</span>
					</div>
					<hr style={{width: '100%'}}/>
					<div className={'forms-container'}>
						<div onClick={() => {
							navigate('/FormsPage');
						}} className={'default-container main-form-button'}>1 форма
							<img className={'sharesvg-style'} src={ShareSVG} alt={'ShareSVG'}/>
						</div>
						<div onClick={() => {
							navigate('/FormsPage');
						}} className={'default-container main-form-button'}>1 форма
							<img className={'sharesvg-style'} src={ShareSVG} alt={'ShareSVG'}/>
						</div>
						<div onClick={() => {
							navigate('/FormsPage');
						}} className={'default-container main-form-button'}>1 форма
							<img className={'sharesvg-style'} src={ShareSVG} alt={'ShareSVG'}/>
						</div>

						<div onClick={() => {
							navigate('/NewFormsPage');
						}} className={'default-container main-form-button'}>+
						</div>
					</div>
				</div>

				<div className={'default-container main-page mainpage-myanswers-container'}>
					<span className={'big-text-container'}>Мои ответы</span>
					<hr style={{width: '100%'}}/>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>Форма</span>
						<span style={{'width': '33%'}}>Дата ответа</span>
						<span style={{'width': '33%'}}>Балл</span>
					</div>

					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
					<div className={'mainpage-myanswers'}>
						<span style={{'width': '33%'}}>TestForm</span>
						<span style={{'width': '33%'}}>23.05.2004</span>
						<span style={{'width': '33%'}}>45/100</span>
					</div>
				</div>
			</div>
		</>
	);
};