import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ userData, handleSignOut }) {
	return (
		<header className="header page__header">
			<img
				className="header__logo"
				src={logo}
				alt="Логотип сайта Mesto Russia"
			/>

			<Routes>

				<Route path="/mesto" element={
					<div className="header__routes">
						<p className="header__email">{userData.email}</p>
						<button
							className="header__signout button"
							type="button"
							onClick={handleSignOut}
						>Выйти</button>
					</div>
				} />

				<Route
					path="/sign-up"
					element={
						<Link className="header__link button" to="/sign-in">Войти</Link>
					} />

				<Route
					path="/sign-in"
					element={
						<Link className="header__link button" to="/sign-up">Регистрация</Link>
					} />

			</Routes>

		</header>
	);
};

export default Header