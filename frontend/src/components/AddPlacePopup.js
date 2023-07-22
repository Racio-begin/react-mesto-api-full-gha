import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

	const [name, setName] = useState('');
	const [link, setLink] = useState('');

	function handleChangeName(e) {
		setName(e.target.value)
	};

	function handleChangeLink(e) {
		setLink(e.target.value)
	};

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();

		// Передаём значения управляемых компонентов во внешний обработчик
		onAddPlace({
			name,
			link
		});
	};

	useEffect(() => {
		setName('');
		setLink('');
	}, [isOpen]);

	return (
		<PopupWithForm
			name="add-card"
			title="Новое место"
			buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				className="popup__input popup__input_type_title"
				type="text"
				name="title"
				id="title"
				value={name || ''}
				onChange={handleChangeName}
				required=""
				placeholder="Название"
				minLength={2}
				maxLength={30}
			/>
			<span className="title-error popup__input-error" />
			<input
				className="popup__input popup__input_type_link"
				type="url"
				name="link"
				id="link"
				value={link || ''}
				onChange={handleChangeLink}
				required=""
				placeholder="Ссылка на картинку"
			/>
			<span className="link-error popup__input-error" />
		</PopupWithForm>
	);
};

export default AddPlacePopup