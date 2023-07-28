import { useState, useEffect, useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	function handleChangeName(e) {
		setName(e.target.value)
	};

	function handleChangeDescription(e) {
		setDescription(e.target.value)
	};

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();

		// Передаём значения управляемых компонентов во внешний обработчик
		onUpdateUser({
			name,
			about: description,
		});
	};

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	return (
		<PopupWithForm
			name="edit-profile"
			title="Редактировать профиль"
			buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				className="popup__input popup__input_type_username"
				type="text"
				name="username"
				id="username"
				value={name || ''}
				onChange={handleChangeName}
				placeholder="Введите ваше имя"
				minLength={2}
				maxLength={40}
				required=""
			/>
			<span className="username-error popup__input-error" />
			<input
				className="popup__input popup__input_type_description"
				type="text"
				name="description"
				id="description"
				value={description || ''}
				onChange={handleChangeDescription}
				placeholder="Введите информацию о себе"
				minLength={2}
				maxLength={200}
				required=""
			/>
			<span className="description-error popup__input-error" />
		</PopupWithForm>
	);
};

export default EditProfilePopup;