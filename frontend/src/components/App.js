import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';

import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import InfoTooltip from './InfoTooltip';

import api from '../utils/Api';
import * as Auth from '../utils/Auth';
import Register from './Register';
import Login from './Login';

import '../index.css';

function App() {

	// Задаем переменные через хуки для отслеживания их состояния на странице
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
	const [isEditProfilePopupOpen, setEditProfileOpened] = useState(false);

	const [deletePlace, setDeletePlace] = useState(null)
	const [isDeletePlacePopupOpen, setDeletePlacePopupOpened] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);

	const [currentUser, setCurrentUser] = useState({});

	const [isLoading, setIsLoading] = useState(false);

	const [loggedIn, setLoggedIn] = useState(false);

	const [userData, setUserData] = useState({ email: '', password: '' });

	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
	const [successInfoTooltip, setSuccessInfoTooltip] = useState({ image: "", text: "" });

	const navigate = useNavigate();

	useEffect(() => {
		api.getUserData()
			.then((userData) => setCurrentUser(userData))
			.catch(() => console.error(`Получение данных пользователя, App`))
	}, []);

	useEffect(() => {
		api.getInitialCards()
			.then((cards) => setCards(cards))
			.catch(() => console.error(`Получение карточек, App`))
	}, []);

	useEffect(() => {
		handleCheckToken();
	}, []);

	function handleEditAvatarClick() {
		setEditAvatarPopupOpened(true)
	};

	function handleAddPlaceClick() {
		setAddPlacePopupOpened(true)
	};

	function handleEditProfileClick() {
		setEditProfileOpened(true)
	};

	function handleCardClick(card) {
		setSelectedCard(card)
	};

	function handleDeletePlaceClick(card) {
		setDeletePlace(card)
		setDeletePlacePopupOpened(true)
	};

	function handleUpdateUser(userData) {
		setIsLoading(true)
		api.updateUserData(userData)
			.then(setCurrentUser)
			.then(closeAllPopups)
			.catch(() => console.error(`Обновление данных профиля, App`))
			.finally(() => setIsLoading(false))
	};

	function handleUpdateAvatar(userData) {
		setIsLoading(true)
		api.updateUserAvatar(userData)
			.then(setCurrentUser)
			.then(closeAllPopups)
			.catch(() => console.error(`Обновление аватара профиля, App`))
			.finally(() => setIsLoading(false))
	};

	function closeAllPopups() {
		setEditAvatarPopupOpened(false);
		setAddPlacePopupOpened(false);
		setDeletePlacePopupOpened(false)
		setEditProfileOpened(false);
		setSelectedCard(null);
		setIsInfoTooltipOpen(false);
	};

	function handleCardLike(card) {
		// Проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
			})
			.catch(() => console.error(`Получение данных по лайкам, App`))
	};

	function handleDeletePlaceSubmit(card) {
		api.deleteCard(card._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.then(closeAllPopups)
			.catch(() => console.error(`Удаление карточки, App`))
			.finally(() => setIsLoading(false));
	};

	function handleAddPlaceSubmit(userData) {
		setIsLoading(true)
		api.sendingCard(userData)
			.then((newCard) => setCards([newCard, ...cards]))
			.then(closeAllPopups)
			.catch(() => console.error(`Добавление новой карточки, App`))
			.finally(() => setIsLoading(false));
	};

	const handleLogin = (userData) => {
		const { email, password } = userData;
		Auth.login({ email, password })
			.then((data) => {
				localStorage.setItem('jwt', data.token)
				setUserData({ email, password });
				setLoggedIn(true)
				navigate('/mesto')
			})
			.catch(() => {
				setIsInfoTooltipOpen(true);
				setSuccessInfoTooltip({
					image: false,
					text: "Что-то пошло не так! Попробуйте ещё раз."
				});
				console.error(`Войти в аккаунт, App`)
			})
	};

	const handleRegister = (userData) => {
		const { email, password } = userData;
		Auth.register({ email, password })
			.then(res => {
				setIsInfoTooltipOpen(true);
				setSuccessInfoTooltip({
					image: true,
					text: "Вы успешно зарегистрировались!"
				});
				navigate('/sign-in')
			})
			.catch(() => {
				setIsInfoTooltipOpen(true);
				setSuccessInfoTooltip({
					image: false,
					text: "Что-то пошло не так! Попробуйте ещё раз."
				});
				console.error(`Зарегистрировать аккаунт, App`);
			})
	};

	const handleCheckToken = () => {
		const jwt = localStorage.getItem('jwt');

		if (jwt) {
			Auth.checkToken(jwt)
				.then((res) => {
					if (!res.data) {
						return
					};

					setUserData({ email: res.data.email })
					setLoggedIn(true)
					navigate('/mesto');
					// setIsLoading(true);
					// todo: не отображается во время проверки токена
				})
				.catch(() => {
					setLoggedIn(false)
					console.error(`Проверить jwt-токен на валидность, App`);
				})
				// .finally(() => setIsLoading(false));
		};

	};

	function handleSignOut() {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		navigate('/sign-in');
	};

	return (
		// todo: <AppContext.Provider value={{ isLoading, closeAllPopups }}>
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">

				<div className="page__content">

					<Header
						loggedIn={loggedIn}
						userData={userData}
						handleSignOut={handleSignOut}
					/>

					<Routes>

						<Route
							path="/"
							element={loggedIn ? <Navigate to="mesto" /> : <Navigate to="/sign-in" replace />}
						/>

						<Route
							path="sign-up"
							element={<Register
								handleRegister={handleRegister}
							/>}
						/>

						<Route
							path="sign-in"
							element={<Login
								handleLogin={handleLogin}
							/>}
						/>

						<Route path="mesto" element={
							<ProtectedRoute element={Main}
								loggedIn={loggedIn}
								cards={cards}
								onEditAvatar={handleEditAvatarClick}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onCardDelete={handleDeletePlaceClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
								isLoading={isLoading}
							/>}
						/>

						<Route path="*" element={<PageNotFound />} />

					</Routes>

				</div>

				{/* <----     POPUP редактирования аватара    ----> */}
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
				/>

				{/* <----     POPUP редактирования профиля    ----> */}
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
				/>

				{/* <----     POPUP добавления карточки    ----> */}
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
					isLoading={isLoading}
				/>

				{/* <----     POPUP подтвержения удаления карточки    ----> */}
				<DeletePlacePopup
					card={deletePlace}
					isOpen={isDeletePlacePopupOpen}
					onClose={closeAllPopups}
					onCardDelete={handleDeletePlaceSubmit}
					isLoading={isLoading}
				/>

				{/* <----     POPUP открытия карточки    ----> */}
				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
				/>

				{/* <----     POPUP с информацией о регистрации и авторизации    ----> */}
				<InfoTooltip
					isOpen={isInfoTooltipOpen}
					onClose={closeAllPopups}
					tooltip={successInfoTooltip}
				/>

			</div>
		</CurrentUserContext.Provider>
		// </AppContext.Provider>
	);

};

export default App;
