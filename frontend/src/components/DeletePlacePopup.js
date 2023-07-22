import PopupWithForm from "./PopupWithForm.js";

function DeletePlacePopup({ card, isOpen, onClose, onCardDelete, isLoading }) {

	function handleSubmit(e) {
		e.preventDefault();
		onCardDelete(card);
	};

	return (
		<PopupWithForm
			name='delete-card'
			title='Вы уверены?'
			buttonText={isLoading ? 'Удаление...' : 'Да'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		/>
	);

};

export default DeletePlacePopup;