import usePopupClose from '../hooks/usePopupClose';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, ...props }) {

	usePopupClose(isOpen, onClose);

	return (
		<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container">

				<button
					className="button popup__button-close"
					name="popupCloseButton"
					type="button"
					aria-label="Закрыть окно"
					onClick={onClose}
				/>

				<h2 className="popup__title">{title}</h2>

				<form
					className="popup__form"
					name={name}
					id={name}
					onSubmit={onSubmit}
				// todo: noValidate=""
				>

					{props.children}

					<button
						className="button popup__button-save"
						type="submit">
						{buttonText}
					</button>
				</form>

			</div>
		</div>
	);

};

export default PopupWithForm