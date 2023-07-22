import { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

	const avatarRef = useRef('');

	useEffect(() => {
		avatarRef.current.value = '';
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateAvatar({
			avatar: avatarRef.current.value,
		});
	};

	return (
		<PopupWithForm
			name="edit-avatar"
			title="Обновить аватар"
			buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				className="popup__input popup__input_type_avatar"
				type="url"
				name="avatar"
				id="avatar"
				ref={avatarRef}
				placeholder="Ссылка на изображение"
				required=""
			/>
			<span className="avatar-error popup__input-error" />
		</PopupWithForm>
	);
};

export default EditAvatarPopup