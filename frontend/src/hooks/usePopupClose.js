// Кастомный хук для навешивания и удаления обработчиков "Escape" и оверлея

import { useEffect } from "react";

function usePopupClose(isOpen, closePopup) {

	useEffect(() => {

		// останавливаем действие эффекта, если попап закрыт
		if (!isOpen) return;

		const handleOverlay = (e) => {
			// если есть `popup_opened` в классах блока, значит, кликнули на оверлей
			if (e.target.classList.contains("popup_opened")) {
				closePopup();
			}
		};

		const handleEscape = (e) => {
			if (e.key === "Escape") {
				closePopup();
			}
		};

		document.addEventListener("keydown", handleEscape);
		document.addEventListener("mousedown", handleOverlay);

		//  обязательно удаляем обработчики в `clean-up`- функции
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("mousedown", handleOverlay);
		};
		// обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не при любой перерисовке компонента
	}, [isOpen, closePopup]);
};

export default usePopupClose