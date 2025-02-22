import LogoHorziontalSVG from '../../assets/images/LogoHorizontalSVG.svg';
import ProfileIconSVG from '../../assets/images/ProfileIconSVG.svg';
import './NavBar.css';

export const NavBar = () => {
	return (
		<>
			<div className={'navbar-container'}>
				<a href={'/'}><img src={LogoHorziontalSVG}/></a>
				<a style={{'margin-left': "auto"}} href={'/Profile'}><img src={ProfileIconSVG}/></a>
			</div>
		</>
	);
};